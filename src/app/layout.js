import { Inter } from "next/font/google";
import "./globals.css";
import NewsFeed from "@/components/NewsFeed";
import SessionWrapper from "@/components/SessionProvider";
import SideBarMainComp from "@/components/SideBarMainComp";



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
        <div className="flex max-w-6xl mx-auto p-2 sm:p-0 min-h-screen">
          <SideBarMainComp/>
          <div className=" flex-1 flex flex-col">{children}</div>
          <div className=" lg:flex-col p-3  h-screen border-l-2  hidden lg:flex w-[24rem] mb-2">
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
