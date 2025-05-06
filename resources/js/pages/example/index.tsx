import Layout from '@/layouts/landing-layout';
import { Example } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import ExampleCard from '@/components/example/example-card';
import CreateExampleDialog from '@/components/example/create-example-modal';

export default function index({ examples }: { examples: Example[] }) {
    return (
        <Layout>
            <Head title="index" />
            <div className="pt-4 md:pt-24">
                <h2 className="text-lg font-semibold mb-4">Example Read Data</h2>
                <div className="flex flex-row gap-2 mb-4">
                    <Link href={route('examples.create')}>
                        <Button>Create With Page</Button>
                    </Link>
                    <CreateExampleDialog />
                </div>
                {examples.length === 0 && (
                    <div className="md:pt-24 flex flex-col gap-2 justify-center items-center">
                        <h2>Examples Read Data not found</h2>
                    </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
                    {examples.map((example) => (
                        <ExampleCard key={example.id} example={example} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
