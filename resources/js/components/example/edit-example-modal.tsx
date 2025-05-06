import { FormEventHandler, useState } from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import InputError from "@/components/stocks/input-error";
import {toast} from "sonner";
import ButtonSubmit from "@/components/stocks/button-submit";
import { Example } from '@/types';
import { useForm } from '@inertiajs/react';
import { ExampleFormType } from '@/types/form';

/**
 * InertiaJS Form helper
 * @see https://inertiajs.com/forms#form-helper
 * @method useForm() - A hook that provides a form state and methods to handle form submission.
 */
export default function EditExampleDialog({example}: { example: Example }) {
    const [open, setOpen] = useState(false);
    const { setData, put, errors, processing } = useForm<ExampleFormType>({
        id: example.id,
        name: example.name,
        age: example.age,
        address: example.address,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('examples.update', example.id), {
            onSuccess: () => {
                toast.success(`Example updated successfully`);
                setOpen(false);
            },
            onError: () => {
                toast.error(`Failed to update example`);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Edit</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Example</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <input type="hidden" name="id" value={example.id.toString()}/>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={example.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors?.name}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            name="age"
                            type="number" defaultValue={example.age}
                            onChange={(e) => setData('age', e.target.valueAsNumber)}
                        />
                        <InputError message={errors?.age}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            defaultValue={example.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors?.address}/>
                    </div>

                    {/*{state?.error && <p className=" text-destructive">{state?.error}</p>}*/}

                    <DialogFooter>
                        <ButtonSubmit submit="Update" submitting="Updating" pending={processing}/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
