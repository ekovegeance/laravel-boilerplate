import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="mx-auto max-w-7xl border-t px-4 sm:px-6 lg:px-8">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
                        Built by{' '}
                        <Link
                            href="https://github.com/ekovegeance"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            ekovegeance
                        </Link>
                        . The source code is available on{' '}
                        <Link
                            href="https://github.com/ekovegeance/laravel-boilerplate"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </Link>
                        .
                    </p>
                </div>
                <div className="hidden sm:flex">
                    <AppearanceToggleDropdown />
                </div>
            </div>
        </footer>
    );
}
