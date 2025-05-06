import Layout from '@/layouts/landing-layout'
import { Head, Link } from '@inertiajs/react';
import { Example } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function show({example}: {example: Example}) {
    return (
        <Layout>
            <Head title="show"/>
            <div className="pt-4 md:pt-24">
                <div className="flex flex-col gap-2">
                    <Link href={route('examples.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeftIcon/>
                        </Button>
                    </Link>
                    <h2 className="text-lg font-semibold">Example Show Data</h2>
                    <p className="text-xl font-semibold">ID: {example.id}</p>
                    <p>Name: {example.name}</p>
                    <p>Age: {example.age}</p>
                    <p>Address: {example.address}</p>
                </div>
            </div>
        </Layout>
    )
}
