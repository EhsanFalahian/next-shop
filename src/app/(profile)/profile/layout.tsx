import "../../globals.css";
import vazirFont from "@/constants/localFonts";
import Header from "@/app/Header";
import { Toaster } from "react-hot-toast";
import Providers from "@/app/providers";
import SideBar from "@/app/(profile)/profile/SideBar";

export const metadata = {
  title: "صفحه پروفایل",
  description: "صفحه پروفایل",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir={"rtl"} className={`${vazirFont.variable} font-sans`}>
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <div className="grid grid-cols-4 bg-white h-screen">
            <div className="col-span-1 px-4 bg-gray-100 overflow-y-auto">
              <SideBar />
            </div>
            <div className="col-span-3 px-4 overflow-y-auto">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
