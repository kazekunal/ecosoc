import ClientRootLayout from "./components/clientrootlayout";
import GlobalLoading from "./components/globalload";
import { Suspense } from 'react';
import Loading from "./components/globalload";

export const metadata = {
  title: "IQTISADIYYAT | Economics Society of Shiv Nadar University",
  description: "The official platform of IQTISADIYYAT, the economics society of Shiv Nadar University, featuring research, events, and insights on economics.",
  keywords: "iqtisadiyyat, economics society, Shiv Nadar University, economic research, student economics, SNU economics",
  openGraph: {
    title: "IQTISADIYYAT | Economics Society of Shiv Nadar University",
    description: "The official platform of IQTISADIYYAT, the economics society of Shiv Nadar University.",
    url: "https://www.iqtisadiyyat.in", // Replace with your actual URL
    siteName: "IQTISADIYYAT",
    images: [
      {
        url: "/logo.jpg", // Replace with your actual logo path
        width: 1200,
        height: 630,
        alt: "IQTISADIYYAT Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQTISADIYYAT | Economics Society of Shiv Nadar University",
    description: "The official platform of IQTISADIYYAT, the economics society of Shiv Nadar University.",
    images: ["/logo.jpg"], // Replace with your actual logo path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  canonical: "https://www.iqtisadiyyat.in", // Replace with your actual URL
  alternates: {
    canonical: "https://www.iqtisadiyyat.in", // Replace with your actual URL
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
      <Suspense fallback={<Loading/>}>
        <ClientRootLayout>{children}</ClientRootLayout>
        </Suspense>
      </body>
    </html>
  );
}