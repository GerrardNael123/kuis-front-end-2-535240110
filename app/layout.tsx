import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Plant Care Tracker',
  description: 'Aplikasi pelacak perawatan tanaman hias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container">
            <a className="navbar-brand" href="/">
              🌱 Plant Care Tracker
            </a>
            <div className="navbar-nav">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/plants">My Plants</a>
              <a className="nav-link" href="/add-plant">Add Plant</a>
              <a className="nav-link" href="/explore">Explore</a>
            </div>
          </div>
        </nav>
        <main className="min-vh-100">
          {children}
        </main>
        <footer className="bg-light text-center py-3 mt-5">
          <div className="container">
            <small className="text-muted">
              Plant Care Tracker © 2024 - Take care of your green friends 🌿
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}