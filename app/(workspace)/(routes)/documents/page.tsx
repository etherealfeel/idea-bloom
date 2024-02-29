'use client';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@components/ui/Button';
import { useMutation } from 'convex/react';
import { PlusCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { api } from '@convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);
    const router = useRouter();

    const handleCreate = () => {
        const promise = create({ title: 'Untitled' }).then((documentId) =>
            router.push(`/documents/${documentId}`)
        );

        toast.promise(promise, {
            loading: 'Creating document...',
            success: 'Document created',
            error: 'Failed to create document.',
        });
    };

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
            <Button size="lg" onClick={handleCreate}>
                <span className="text-lg">Create an Idea</span>
                <PlusCircleIcon className="w-6 h-6 ml-2" />
            </Button>
        </div>
    );
};

export default DocumentsPage;
