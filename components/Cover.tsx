'use client';

import React from 'react';
import { cn } from '@lib/utils';
import Image from 'next/image';
import { Button } from './ui/Button';
import { ImageIcon, X } from 'lucide-react';
import { useImageStore } from '@hooks/useImageStore';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@convex/_generated/dataModel';

interface CoverProps {
    url?: string;
    preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
    const removeCover = useMutation(api.documents.removeCover);
    const coverImage = useImageStore();
    const params = useParams();

    const handleRemoveCover = () => {
        removeCover({
            id: params.documentId as Id<'documents'>,
        });
    };

    return (
        <div
            className={cn(
                'relative w-full h-[35vh] group',
                !url && 'h-12vh',
                url && 'bg-muted'
            )}
        >
            {!!url && (
                <Image src={url} fill alt="Cover" className="object-cover" />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Change cover image
                    </Button>
                    <Button
                        onClick={handleRemoveCover}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Cover;
