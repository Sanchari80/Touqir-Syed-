import './globals.css';

export const metadata = {
  title: 'Tauqeer Syed — Meta / Facebook Ads Specialist',
  description:
    'I set up, run and manage Facebook Pages and Meta ad campaigns end to end — Business Manager, creative, targeting.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
