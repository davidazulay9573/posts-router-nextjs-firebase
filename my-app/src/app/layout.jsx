import "./globals.css";

import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Posts-Router",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <HeaderNav />
        <div className="flex-grow p-4">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
