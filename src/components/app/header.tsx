import Link from 'next/link';
import { ShieldCheck, Share2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <Link href="/" className="flex items-center justify-center">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold font-headline">Covenant Council</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/#principles"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Principles
        </Link>
        <Link
          href="/covenant-explorer"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Explorer
        </Link>
        <Link
          href="/council"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Council
        </Link>
      </nav>
    </header>
  );
}
