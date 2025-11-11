import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Smart Excalidraw - AI驱动的图表生成工具",
  description: "使用AI将自然语言转换成Excalidraw格式数据，在画布上自由编辑、调整样式",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="alibaba-puhuiti">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
