import { Author } from '@/components/landing/author';
import { Button } from '@/components/ui/button';
import { FileCode2 } from 'lucide-react';

export default function Hero() {
    return (
        <section className="z-auto container flex flex-col items-center gap-4 pt-6 pb-8 md:py-10">
            <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
                <h1 className="bg-red-600 bg-clip-text text-5xl/[1.1] font-extrabold text-transparent md:text-5xl lg:text-6xl lg:leading-[1.1]">
                    Laravel Boilerplate
                </h1>
                <p className="text-primary max-w-[750px] text-lg sm:text-xl">
                    This modern Full Stack{' '}
                    <a href="https://laravel.com/docs/12.x/frontend#inertia" className="text-primary font-semibold">
                        Laravel Inertia (react typescript)
                    </a>{' '}
                    solution is open-source and reusable, enabling developers to build web applications quickly and efficiently with{' '}
                    <a href="https://laravel.com/docs/12.x/eloquent-serialization#main-content" className="font-semibold text-red-600">
                        Eloquent ORM
                    </a>
                    ,{' '}
                    <a href="https://laravel.com/docs/12.x/starter-kits#laravel-breeze" className="font-semibold text-orange-600">
                        Laravel Brezze
                    </a>
                    , and a responsive{' '}
                    <a href="https://ui.shadcn.com/" className="text-primary font-semibold">
                        Shadcn/UI{' '}
                    </a>
                    interface.
                </p>
                <p className="text-md text-muted-foreground max-w-[750px]">
                    Powered by <Author />
                </p>
            </div>

            <div>
                <Button size="lg">
                    <FileCode2 />
                    <a href="https://github.com/ekovegeance/laravel-boilerplate">Get Started</a>
                </Button>
            </div>
        </section>
    );
}
