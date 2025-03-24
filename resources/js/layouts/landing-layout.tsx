import Footer from '@/components/landing/footer';
import { Navbar } from '@/components/landing/navbar';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function LandingLayout({ children }: { children: ReactNode }) {
    return (
        <section
            className={cn(
                'bg-background min-h-screen font-sans antialiased',
                'bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800',
            )}
        >
            <div>
                <Navbar />
                <main className="mx-auto min-h-svh max-w-7xl px-4 py-6 pt-20 sm:px-6 lg:px-8">{children}</main>
                <Footer />
            </div>
        </section>
    );
}
