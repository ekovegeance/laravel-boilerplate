import CTA from '@/components/landing/cta';
import Features from '@/components/landing/features';
import Hero from '@/components/landing/hero';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <LandingLayout>
            <Head title="Welcome"/>
            <main className='md:pt-24'>
                <Hero />
                <Features />
                <CTA />
            </main>
        </LandingLayout>
    );
}
