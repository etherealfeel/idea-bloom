'use client';
import { useScrollTop } from '@hooks/useScrollTop';
import { cn } from '@lib/utils';
import Logo from './Logo';
import { ModeToggle } from '@components/ModeToggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@components/ui/Button';
import { Spinner } from '@components/Spinner';
import Link from 'next/link';

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div
            className={cn(
                'bg-background dark:bg-[#1f1f1f] fixed flex items-center top-0 w-full p-8 z-50',
                scrolled && 'border-b shadow-sm'
            )}
        >
            <Logo />
            <div className="md:ml-auto md:justify-between w-full flex items-center gap-x-2">
                {isLoading && <Spinner />}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button variant="secondary" size="sm">
                                Start free trial
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">Enter Idea Bloom</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;
