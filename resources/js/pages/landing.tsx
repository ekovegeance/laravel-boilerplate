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
            <main >
                <Hero />
                <Features />
                <CTA />
            </main>
        </LandingLayout>
    );
}
