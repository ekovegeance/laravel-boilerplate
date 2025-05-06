import ButtonSubmit from '@/components/stocks/button-submit';
import InputError from '@/components/stocks/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ExampleFormType } from '@/types/form';


/**
 * InertiaJS Form helper
 * @see https://inertiajs.com/forms#form-helper
 * @method useForm() - A hook that provides a form state and methods to handle form submission.
 */
export function ExampleCreateForm() {
    const { data, setData, post, processing, errors } = useForm<ExampleFormType>({
        name: '',
        age: 0,
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('examples.store'));
    };
    return (
        <form onSubmit={submit} className="max-w-md space-y-4">

            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)} />
                <InputError message={errors.name} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="age" className="block font-medium">
                    Age
                </Label>
                <Input
                    id="age"
                    name="age"
                    type="number"
                    value={data.age}
                    onChange={(e) => setData('age', e.target.valueAsNumber)}
                />
                <InputError message={errors.age} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    name="address"
                    type="text"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                />
                <InputError message={errors.address} />
            </div>

            <ButtonSubmit submit="Create" submitting="Creating" pending={processing} />
        </form>
    );
}
