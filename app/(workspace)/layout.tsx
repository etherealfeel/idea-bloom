'use client';

import { Spinner } from '@components/Spinner';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import Navigation from './_components/Navigation';

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-full">
                <Spinner size="xl" />
            </div>
        );

    if (!isAuthenticated) return redirect('/');

    return (
        <div className="flex h-full dark:bg-[#1f1f1f]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">{children}</main>
        </div>
    );
};

export default WorkspaceLayout;
