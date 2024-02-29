'use client';

import React from 'react';
import { Id } from '@convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@components/ui/Button';
import ConfirmModal from '@components/modals/ConfirmModal';
import { X } from 'lucide-react';

interface BannerProps {
    documentId: Id<'documents'>;
}

const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();

    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const handleRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: 'Restoring document...',
            success: 'Document restored!',
            error: 'Failed to restore document.',
        });
    };

    const handleRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: 'Deleting document...',
            success: 'Document deleted!',
            error: 'Failed to delete document.',
        });

        router.push('/documents');
    };

    return (
        <div className="w-full bg-rose-500 text-center text-sm p-4 text-white ">
            <div className="flex items-center gap-x-2 justify-center bg-rose-400 dark:bg-[1f1f1f] p-4 rounded-xl">
                <p>This document is currently archived.</p>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRestore}
                    className="border-white bg-transparent hover:bg:primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Restore document
                </Button>
                <ConfirmModal onConfirm={handleRemove}>
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-white bg-transparent hover:bg:primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                    >
                        Delete
                        <X className="w-4 h-4 ml-2" />
                    </Button>
                </ConfirmModal>
            </div>
        </div>
    );
};

export default Banner;
