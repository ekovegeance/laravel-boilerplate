import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Example, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import EditExampleDialog from "@/components/example/edit-example-modal";
import DeleteExampleDialog from "@/components/example/delete-exmaple-modal";

export default function ExampleCard({ example }: { example: Example }) {
    // Get the shared data from the page.
    const { auth } = usePage<SharedData>().props;
    // @see https://inertiajs.com/shared-data#accessing-shared-data

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Name: {example.name}</CardTitle>
                    <CardTitle>Age: {example.age}</CardTitle>
                    <CardDescription>ID: {example.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="line-clamp-1">{example.address}</p>
                </CardContent>
                <CardFooter>
                    {auth?.user?.id === example.user.id && (
                        <div className="flex flex-row gap-4">
                            <Link href={route('examples.show', example.id)}>
                                <Button>Show</Button>
                            </Link>
                            <EditExampleDialog example={example} />
                            <DeleteExampleDialog exampleId={example.id.toString()} />
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
