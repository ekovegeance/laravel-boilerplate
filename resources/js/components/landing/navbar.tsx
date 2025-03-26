import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { Command, Menu, X } from 'lucide-react';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { UserMenuContent } from '../user-menu-content';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Users', href: '/users' },
    { name: 'Posts', href: '/posts' },
    { name: 'CRUD', href: '/crud' },
    { name: 'contact', href: '/contact' },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    return (
        <nav className="border-border/40 bg-background fixed top-0 right-0 left-0 z-50 border-b backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                            </Link>
                        </div>
                        {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium text-zinc-500",
                    pathname === link.href
                      ? " text-zinc-900"
                      : " text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div> */}
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="size-10 rounded-full p-1">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth?.user.name ?? '')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="ms-4 w-56" align="end" forceMount>
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2 px-4">
                                <Link href="/login">
                                    <Button variant="outline" className="mr-2 w-full justify-center">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="w-full justify-center">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                        </Button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={clsx(
                                    'block py-2 pr-4 pl-3 text-base font-medium',
                                    page.url === link.href ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900',
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                        <div className="flex items-center gap-2 px-4">
                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="size-10 rounded-full p-1">
                                            <Avatar className="size-8 overflow-hidden rounded-full">
                                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(auth.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="ms-4 w-56" align="end" forceMount>
                                        <UserMenuContent user={auth.user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        {' '}
                                        <Button variant="outline" className="mr-2 w-full justify-center">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                        {' '}
                                        <Button className="w-fÌull justify-center">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
