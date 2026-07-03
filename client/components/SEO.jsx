import Head from 'next/head';

const SITE_NAME = 'Green Light House';
const SITE_URL  = 'https://greenlighthouse.pk';
const DEFAULT_DESCRIPTION =
  'Shop premium indoor and outdoor lighting in Lahore, Pakistan. ' +
  'Chandeliers, pendants, wall lights, LED panels and more at ' +
  'Green Light House, Township Lahore. Order via WhatsApp.';

export default function SEO({
  title,
  description,
  canonical,
  image,
  type    = 'website',
  noindex = false,
  jsonLd  = null,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Premium Lighting Store in Lahore, Pakistan`;
  const metaDesc = description || DEFAULT_DESCRIPTION;
  const metaImg  = image || `${SITE_URL}/og-image.jpg`;
  const metaUrl  = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description"         content={metaDesc} />
      <meta name="robots"              content={noindex ? 'noindex,nofollow' : 'index,follow'} />

      <link rel="canonical" href={metaUrl} />

      <meta property="og:type"         content={type} />
      <meta property="og:title"        content={fullTitle} />
      <meta property="og:description"  content={metaDesc} />
      <meta property="og:url"          content={metaUrl} />
      <meta property="og:image"        content={metaImg} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:locale"       content="en_PK" />

      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image"       content={metaImg} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
