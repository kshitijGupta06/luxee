import { SpeedInsights } from '@vercel/speed-insights/next';
export const metadata = {
  title: 'Emkay Home Admin',
  description: 'Admin Dashboard for Emkay Home',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
