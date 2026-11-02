import { getSite } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

export const revalidate = 3600;

// RFC 9116 requires a Contact and an Expires line, so there's no file until an email is set.
export async function GET() {
  const { email } = await getSite();
  if (!email) return new Response('Not found', { status: 404 });

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const body = [
    `Contact: mailto:${email}`,
    `Expires: ${expires.toISOString()}`,
    'Preferred-Languages: en',
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
