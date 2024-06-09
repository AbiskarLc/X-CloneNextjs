import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import NewsFeed from "@/components/NewsFeed";
import SessionWrapper from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X Clone App",
  description: "X clone project by Abiskar Lamichhane",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between max-w-6xl mx-auto">
          <div className=" h-screen border-r-2">
            <SideBar />
          </div>
          <div>{children}</div>
          <div className=" lg:flex-col p-3 h-screen border-l  hidden lg:flex w-[24rem] mb-2">
            <div className="sticky top-0 bg-white py-2">
              <input type="text" placeholder="Search" className=" w-full border-[1px] border-transparent px-4 text-md rounded-2xl bg-gray-200 focus:outline-blue-500 text-gray-700 py-2 hidden md:inline" />
            </div>
            <NewsFeed />
          </div>
        </div>
      </body>
    </html>
    </SessionWrapper>
  );
}
