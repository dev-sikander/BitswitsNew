//===== Meta Data =====
export const metadata = {
  //===== Meta Tags =====
  title: "Top Mobile App Development Company in New York",
  description: "BitsWits is a top-tier app development company in NYC helping startups and entrepreneurs across 10+ industries build scalable, and feature-rich mobile apps.",
  //===== OG Tags =====
  openGraph: {
    title: 'Top Mobile App Development Company in New York',
    description: 'BitsWits is a top-tier app development company in NYC helping startups and entrepreneurs across 10+ industries build scalable, and feature-rich mobile apps.',
    url: '/app-development-company-new-york',
    siteName: 'BitsWits',
    locale: 'en_US',
    type: 'website',
  },
  //===== Canonical =====
  alternates: { canonical: '/app-development-company-new-york' },
  //===== GEO Tags =====
  other: {
    "DC.title": "Mobile App Development Company in New York -Bitswits",
    "geo.region": "US",
    "geo.position": "40.7054441, -74.01309",
    "ICBM": " 40.7054441, -74.01309",
    //==========
    "DC.title": "Mobile App Development Company in New York -Bitswits",
    "geo.region": "US-NY",
    "geo.position": "40.7054441, -74.01309",
    "ICBM": "40.7054441, -74.01309",
    //==========
    "DC.title": "Mobile App Development Company in New York -Bitswits",
    "geo.region": "US-NY",
    "geo.placename": "New York",
    "geo.position": "40.7054441, -74.01309",
    "ICBM": "40.7054441, -74.01309",
  },
  //===== No-Index =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-snippet': -1,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({ children }) {
  return (children);
}