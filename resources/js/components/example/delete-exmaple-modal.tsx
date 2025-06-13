import { FormEventHandler, useState } from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import ButtonSubmit from '@/components/shared/button-submit';
import {toast} from "sonner";

/**
 * InertiaJS Form helper
 * @see https://inertiajs.com/forms#form-helper
 * @method useForm() - A hook that provides a form state and methods to handle form submission.
 */
export default function DeleteExampleDialog({exampleId}: { exampleId: string }) {

    const [open, setOpen] = useState(false);
    const { delete: destroy, processing} = useForm({
        id: exampleId,
    });
    const deleteExample: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('examples.destroy', exampleId), {
            onSuccess: () => {
                setOpen(false);
                toast.success(`Example deleted successfully`);
            },
            onError: () => {
                toast.error(`Failed to delete example`);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>

                <form onSubmit={deleteExample}>
                    <input type="hidden" name="id" value={exampleId}/>
                    <p className="text-sm text-muted-foreground mb-4">
                        This action cannot be undone. This will permanently delete the data.
                    </p>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <ButtonSubmit variant="destructive" submit="Delete" submitting="Deleting" pending={processing} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
