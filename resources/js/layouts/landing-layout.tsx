import Footer from '@/components/landing/footer';
import { Navbar } from '@/components/landing/navbar';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function LandingLayout({ children }: { children: ReactNode }) {
    return (
        <section>
            <Navbar />
            <main className="mx-auto min-h-svh max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
            <Toaster richColors={true} closeButton={true} />
            <Footer />
        </section>
    );
}
