import CTA from '@/components/landing/cta';
import Features from '@/components/landing/features';
import Hero from '@/components/landing/hero';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <LandingLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <main>
                <img id="background" className="absolute top-16 -left-10 w-52 max-w-[877px] animate-pulse md:w-auto" src="images/bginertia.svg" />
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-red-600 selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main>
                            <Hero />
                            <Features />
                            <CTA />
                        </main>
                    </div>
                </div>
            </main>
        </LandingLayout>
    );
}
