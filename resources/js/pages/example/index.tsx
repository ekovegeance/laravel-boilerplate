import CreateExampleDialog from '@/components/example/create-example-modal';
import ExampleCard from '@/components/example/example-card';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/landing-layout';
import { Example, PaginatedData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import SimplePaginate from '@/components/shared/simple-paginate';


export default function index({ examples }: { examples: PaginatedData<Example> }) {
    return (
        <Layout>
            <Head title="index" />
            <div className="pt-4 md:pt-24">
                <h2 className="mb-4 text-lg font-semibold">Example Read Data</h2>
                <div className="mb-4 flex flex-row gap-2">
                    <Link href={route('examples.create')}>
                        <Button>Create With Page</Button>
                    </Link>
                    <CreateExampleDialog />
                </div>
                {examples.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 md:pt-24">
                        <h2>Examples Read Data not found</h2>
                    </div>
                )}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {examples.data.map((example: Example) => (
                        <ExampleCard key={example.id} example={example} />
                    ))}
                </div>
            </div>
            <div className="my-2">
                <SimplePaginate currentPage={examples.current_page} totalPages={examples.last_page}/>
            </div>
        </Layout>
    );
}
