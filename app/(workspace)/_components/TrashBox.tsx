'use client';

import { Spinner } from '@components/Spinner';
import { Input } from '@components/ui/Input';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import ConfirmModal from '@components/modals/ConfirmModal';

const TrashBox = () => {
    const params = useParams();
    const router = useRouter();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState('');
    const filteredDocuments = documents?.filter((doc) =>
        doc.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    const handleClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const handleRemove = (documentId: Id<'documents'>) => {
        const promise = remove({ id: documentId });
        toast.promise(promise, {
            loading: 'Deleting document...',
            success: 'Document deleted!',
            error: 'Failed to delete document.',
        });
    };

    const handleRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<'documents'>
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });
        toast.promise(promise, {
            loading: 'Restoring document...',
            success: 'Document restored!',
            error: 'Failed to restore document.',
        });

        if (params.documentId === documentId) {
            router.push('/documents');
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="w-4 h-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 focus-visible:ring-transparent bg-secondary"
                    placeholder="Search by document title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foregorund pb-2">
                    No documents found.
                </p>
                {filteredDocuments?.map((doc) => (
                    <div
                        key={doc._id}
                        role="button"
                        onClick={() => handleClick(doc._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between text-primary"
                    >
                        <span className="truncate pl-2">{doc.title}</span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => handleRestore(e, doc._id)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200"
                            >
                                <Undo className="w-4 h-2 text-muted-foreground" />
                            </div>
                            <ConfirmModal
                                onConfirm={() => handleRemove(doc._id)}
                            >
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200"
                                >
                                    <Trash className="w-4 h-2 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrashBox;