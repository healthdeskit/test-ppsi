const BASE_URL = (process.env.PUBLIC_BASE_URL || 'https://njnopain.com').replace(/\/$/, '');
const SITE_NAME = 'Precision Pain & Spine Institute';
const DEFAULT_OG_IMAGE = `${BASE_URL}/_next/ppsi-dr-team.jpg`;

const PAGE_META = {
  '/': {
    title: 'Pain Management & Spine Specialists in New Jersey | Precision Pain & Spine Institute',
    description:
      'Precision Pain & Spine Institute provides pain management, spine surgery, chiropractic care, orthopedics, podiatry, and physical therapy across New Jersey. Book an appointment with board-certified specialists.',
    index: true,
    type: 'website',
    schemaType: 'MedicalOrganization',
  },
  '/about-us': {
    title: 'About Precision Pain & Spine Institute | Physician-Led Care in New Jersey',
    description:
      'Learn about Precision Pain & Spine Institute, our physician-led model, coordinated specialty care, and our long-term commitment to patients across New Jersey.',
    index: true,
    type: 'article',
    schemaType: 'AboutPage',
  },
  '/contact-us': {
    title: 'Contact Precision Pain & Spine Institute | Appointments, Insurance & Scheduling',
    description:
      'Contact Precision Pain & Spine Institute for scheduling, insurance questions, referrals, and medical records support. Call (732) 444-8888 or send a message online.',
    index: true,
    type: 'website',
    schemaType: 'ContactPage',
  },
  '/practice-areas': {
    title: 'Pain Management, Spine Surgery & Rehabilitation Services in New Jersey | PPSI',
    description:
      'Explore pain management, spine surgery, chiropractic care, orthopedics, podiatry, physical therapy, and interventional procedures available across PPSI locations in New Jersey.',
    index: true,
    type: 'website',
    schemaType: 'CollectionPage',
  },
  '/pain-management': {
    title: 'Pain Management in New Jersey | Injections, Nerve Blocks & Chronic Pain Care | PPSI',
    description:
      'Get expert pain management in New Jersey with image-guided injections, nerve blocks, chronic pain evaluation, EMG support, and coordinated treatment planning from board-certified specialists.',
    index: true,
    type: 'article',
    schemaType: 'MedicalWebPage',
  },
  '/doctors': {
    title: 'Pain Management & Spine Doctors in New Jersey | Meet the PPSI Specialists',
    description:
      'Meet the board-certified pain management, spine, orthopedic, and chiropractic specialists at Precision Pain & Spine Institute serving patients across New Jersey.',
    index: true,
    type: 'website',
    schemaType: 'CollectionPage',
  },
  '/dr-wael-elkholy-m-d': {
    title: 'Dr. Wael T. Elkholy, M.D. | Pain Management Specialist in New Jersey | PPSI',
    description:
      'Learn about Dr. Wael T. Elkholy, M.D., interventional pain management specialist, fellowship-trained physician, and founder of Precision Pain & Spine Institute in New Jersey.',
    index: true,
    type: 'profile',
    schemaType: 'Physician',
  },
  '/edison': {
    title: 'Edison NJ Pain Management & Spine Center | Precision Pain & Spine Institute',
    description:
      'Visit Precision Pain & Spine Institute in Edison, NJ for pain management, spine care, chiropractic services, physical therapy, and specialist-led treatment planning.',
    index: true,
    type: 'website',
    schemaType: 'MedicalClinic',
  },
  '/insurance': {
    title: 'Insurance Verification & Coverage Information | Precision Pain & Spine Institute',
    description:
      'Verify insurance coverage, copays, referrals, and authorizations with Precision Pain & Spine Institute before your visit. Major plans accepted across New Jersey.',
    index: true,
    type: 'website',
    schemaType: 'WebPage',
  },
  '/blogs': {
    title: 'Pain Management & Spine Health Articles | PPSI Blog & Insights',
    description:
      'Read educational articles from Precision Pain & Spine Institute on pain management, spine conditions, treatment options, recovery, and musculoskeletal health.',
    index: true,
    type: 'website',
    schemaType: 'Blog',
  },
  '/patient-portal': {
    title: 'Patient Portal | Precision Pain & Spine Institute',
    description: 'Access the PPSI patient portal.',
    index: false,
    type: 'website',
    schemaType: 'WebPage',
  },
  '/medical-records': {
    title: 'Medical Records | Precision Pain & Spine Institute',
    description: 'Medical records and records support at Precision Pain & Spine Institute.',
    index: false,
    type: 'website',
    schemaType: 'WebPage',
  },
  '/medical-record-request': {
    title: 'Medical Record Request | Precision Pain & Spine Institute',
    description: 'Request medical records from Precision Pain & Spine Institute.',
    index: false,
    type: 'website',
    schemaType: 'WebPage',
  },
  '/dr-wael-elkholy-resume': {
    title: 'Dr. Wael Elkholy Resume | Precision Pain & Spine Institute',
    description: 'Professional resume for Dr. Wael Elkholy.',
    index: false,
    type: 'profile',
    schemaType: 'ProfilePage',
  },
  '/covid-19': {
    title: 'COVID-19 Information | Precision Pain & Spine Institute',
    description: 'COVID-19 information and updates.',
    index: false,
    type: 'website',
    schemaType: 'WebPage',
  }
};

function normalizePath(input) {
  const p = (input || '/').replace(/\/$/, '') || '/';
  return p;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCanonical(pathname) {
  const p = normalizePath(pathname);
  return p === '/' ? `${BASE_URL}/` : `${BASE_URL}${p}`;
}

function getMeta(pathname) {
  const p = normalizePath(pathname);
  return PAGE_META[p] || null;
}

function buildSchema(pathname, meta) {
  const canonical = getCanonical(pathname);

  if (!meta) return null;

  if (meta.schemaType === 'MedicalOrganization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalOrganization',
      name: SITE_NAME,
      url: canonical,
      telephone: '(732) 444-8888',
      areaServed: 'New Jersey',
    };
  }

  if (meta.schemaType === 'MedicalClinic') {
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: `${SITE_NAME} - Edison`,
      url: canonical,
      telephone: '(732) 444-8888',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1921 Oak Tree Rd #104',
        addressLocality: 'Edison',
        addressRegion: 'NJ',
        postalCode: '08820',
        addressCountry: 'US'
      }
    };
  }

  if (meta.schemaType === 'Physician') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: 'Dr. Wael T. Elkholy, M.D.',
      medicalSpecialty: 'PainManagement',
      url: canonical,
      worksFor: {
        '@type': 'MedicalOrganization',
        name: SITE_NAME,
        url: BASE_URL
      }
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': meta.schemaType || 'WebPage',
    name: meta.title,
    url: canonical
  };
}

function buildSeoBlock(pathname) {
  const meta = getMeta(pathname);
  if (!meta) return '';

  const canonical = getCanonical(pathname);
  const robots = meta.index === false ? 'noindex,follow' : 'index,follow';
  const schema = buildSchema(pathname, meta);
  const jsonLd = schema
    ? `\n  <script type="application/ld+json">${JSON.stringify(schema)}</script>`
    : '';

  return `
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta name="robots" content="${robots}" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:type" content="${escapeHtml(meta.type || 'website')}" />
  <meta property="og:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}" />${jsonLd}
`;
}

function injectSeo(html, pathname) {
  const meta = getMeta(pathname);
  if (!meta || !html || !html.includes('</head>')) return html;

  let out = String(html);
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);

  if (/<meta\s+name=["']description["'][^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`
    );
  } else {
    out = out.replace('</head>', `  <meta name="description" content="${escapeHtml(meta.description)}" />\n</head>`);
  }

  out = out.replace('</head>', `${buildSeoBlock(pathname)}</head>`);
  return out;
}

module.exports = {
  injectSeo,
  getMeta,
  getCanonical,
};
