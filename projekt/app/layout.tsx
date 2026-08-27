import type { Metadata } from "next";
import "./globals.css";


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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
