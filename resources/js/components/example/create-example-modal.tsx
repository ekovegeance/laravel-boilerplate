import ButtonSubmit from '@/components/stocks/button-submit';
import InputError from '@/components/stocks/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExampleFormType } from '@/types/form';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

/**
 * InertiaJS Form helper
 * @see https://inertiajs.com/forms#form-helper
 * @method useForm() - A hook that provides a form state and methods to handle form submission.
 */

export default function CreateExampleDialog() {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<ExampleFormType>({
        name: '',
        age: 0,
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('examples.store'), {
            onSuccess: () => {
                toast.success(`Example created successfully`);
                setOpen(false);
                reset('name', 'age', 'address');
            },
            onError: () => {
                toast.error(`Failed to create example`);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create With Dialog</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Data with Dialog</DialogTitle>
                    <DialogDescription>Lorem ipsum dolor sit amet, consectetur radicalising elit.</DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors?.name} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            name="age"
                            type="number"
                            value={data.age} onChange={(e) => setData('age', e.target.valueAsNumber)} />
                        <InputError message={errors?.age} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors?.address} />
                    </div>

                    <DialogFooter>
                        <ButtonSubmit submit="Create" submitting="Creating" pending={processing} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
