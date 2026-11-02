import { revalidateTag } from 'next/cache';
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

  // Expire now: with the default 'max' profile the next visitor still gets the old page,
  // so an editor reloading to check their change would think publishing had failed.
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
