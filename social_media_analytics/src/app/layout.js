import './globals.css';

export const metadata = {
  title: 'Social Media Analytics',
  description: 'A frontend application for social media data analysis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}