import Layout from '@/layouts/landing-layout'
import { Head } from '@inertiajs/react'
import { ExampleCreateForm } from '@/components/example/create-example-form';

export default function create() {
    return (
        <Layout>
            <Head title="create"/>
            <div className="pt-4 md:pt-24">
                <h2 className="text-lg font-semibold mb-8">Example Create Data</h2>

                <div className="mx-auto">
                    <ExampleCreateForm/>
                </div>
            </div>
        </Layout>
    )
}
