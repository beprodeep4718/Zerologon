import { revalidateTag } from 'next/cache';
import { after } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { CONTENT_TAG } from '@/lib/content/sanity';

async function isFromSanity(body: string, signature: string | null) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || !signature) return false;

  try {
    return await isValidSignature(body, signature, secret);
  } catch {
    return false;
  }
}

// Sanity calls this when content is published, so changes go live without a redeploy.
export async function POST(request: Request) {
  const body = await request.text();

  if (!(await isFromSanity(body, request.headers.get(SIGNATURE_HEADER_NAME)))) {
    return Response.json({ message: 'Invalid signature' }, { status: 401 });
  }

  // Marks the page as stale but keeps serving it until a new one is built. Expiring it outright
  // would turn the site into an error page if Sanity couldn't be reached during the rebuild.
  revalidateTag(CONTENT_TAG, 'max');

  // The first visit to a stale page gets the old copy and starts the rebuild. Make that visit
  // here, so an editor who reloads to check their change sees the new page.
  after(() => fetch(new URL('/', request.url)).catch(() => undefined));

  return Response.json({ revalidated: true });
}
