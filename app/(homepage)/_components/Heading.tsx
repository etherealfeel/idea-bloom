'use client';

import { Button } from '@components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useConvexAuth } from 'convex/react';
import { Spinner } from '@components/Spinner';
import Link from 'next/link';
import { SignInButton } from '@clerk/clerk-react';

const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-right">
                Transform your ideas into actions.&nbsp;
                <span className="underline italic">Idea Bloom</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Idea Bloom is a platform that enables you to organize and
                nurture your ideas with ease. Explore digital workspace where
                ideas can grow and flourish effectively
            </h3>
            {isLoading && (
                <div className="flex items-center justify-center w-full">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button size="lg">
                        Sign In
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    );
};

export default Heading;
