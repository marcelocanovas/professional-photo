import { Inter } from "next/font/google";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vendah | Sua foto profissional",
  description: "Transforme sua foto comum em uma foto vendedora",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{
        minHeight: "100vh",
      }}
    >
      <body
        className={inter.className}
        style={{
          height: "100%",
        }}
      >
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
