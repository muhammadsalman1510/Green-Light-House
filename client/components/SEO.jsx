import Head from 'next/head';

const SITE_NAME = 'Green Light House';
const SITE_URL = 'https://greenlighthouse.pk';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Premium Lighting Store in Lahore, Pakistan`;

  const metaDesc = description ||
    'Shop premium indoor and outdoor lighting at Green Light House, Lahore. Chandeliers, pendants, wall lights, LED panels and more. Order via WhatsApp.';

  const metaImage = image || DEFAULT_IMAGE;
  const metaCanonical = canonical ? `${SITE_URL}${canonical}` : null;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {metaCanonical && <link rel="canonical" href={metaCanonical} />}

      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image"       content={metaImage} />
      <meta property="og:site_name"   content={SITE_NAME} />
      {metaCanonical && <meta property="og:url" content={metaCanonical} />}

      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image"       content={metaImage} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1A4731" />
    </Head>
  );
}
