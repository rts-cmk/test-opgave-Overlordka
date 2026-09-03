import type { Metadata } from "next";
import "./globals.css";
import BannerController from "@/ui/cookie-constent/banner-controler";


export const metadata: Metadata = {
  title: {
    default: "Dyrevelfærd",
    template: "%s | Dyrevelfært"
  },
  description: "Forening for Dyrvevelfærd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="da"
      className={` h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <BannerController />
        <footer>
          <button command="show-modal" commandFor="cookie-settings">Cookie indstilinger</button> 
        </footer>
      </body>
    </html>
  );
}
