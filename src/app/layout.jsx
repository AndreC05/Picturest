import "./globals.css";

export const metadata = {
  title: "Picturest",
  description: "A Social media all about sharing your interests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
