import "./globals.css";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import SessionProvider from "@/contexts/sessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Posts-Router",
  description: "",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className="flex flex-col min-h-screen">
          <HeaderNav />
          <div className="flex-grow p-4">{children}</div>
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
