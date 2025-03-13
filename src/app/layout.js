import ClientRootLayout from "./components/clientrootlayout";


export const metadata = {
  title: "IQTISADIYYAT",
  description: "By the economics society of Shiv Nadar University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
