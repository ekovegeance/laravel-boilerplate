import Layout from '@/layouts/landing-layout'
import { Head } from '@inertiajs/react'
import { Example } from '@/types';

export default function edit({example}: {example: Example}) {
    return (
        <Layout>
            <Head title="edit"/>
            {example.name}

        </Layout>
    )
}
