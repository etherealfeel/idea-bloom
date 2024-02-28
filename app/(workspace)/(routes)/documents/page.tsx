'use client';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@components/ui/Button';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';

const DocumentsPage = () => {
    const { user } = useUser();
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/assets/images/empty.png"
                width={400}
                height={400}
                alt="empty"
                className="dark:invert"
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Ideas
            </h2>
            <Button size="lg">
                <span className="text-lg">Create an Idea</span>
                <PlusCircleIcon className="w-6 h-6 ml-2" />
            </Button>
        </div>
    );
};

export default DocumentsPage;
