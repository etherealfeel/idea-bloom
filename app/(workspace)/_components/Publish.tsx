'use client';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@components/ui/Popover';

import { Doc } from '@convex/_generated/dataModel';
import useOrigin from '@hooks/useOrigin';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@components/ui/Button';
import { Globe, Check, Copy } from 'lucide-react';

interface PublishProps {
    initialData: Doc<'documents'>;
}

const Publish = ({ initialData }: PublishProps) => {
    const update = useMutation(api.documents.update);
    const origin = useOrigin();
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const handlePublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublic: true,
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: 'Publishing document...',
            success: 'Document published!',
            error: 'Failed to publish document.',
        });
    };

    const handleUnpublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublic: false,
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: 'Unpublishing document...',
            success: 'Document unpublished!',
            error: 'Failed to unpublish document.',
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                    Publish
                    {initialData.isPublic && (
                        <Globe className="text-sky-500 w-4 h-4 ml-2" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {initialData.isPublic ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse w-4 h-4" />
                            <p className="text-xs text-sky-500 font-medium">
                                Idea published.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input
                                value={url}
                                disabled
                                className="flex-1 px-2 border text-xs rounded-l-md h-8 bg-muted truncate"
                            />
                            <Button
                                onClick={handleCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={handleUnpublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Globe className="w-8 h-4 text-muted-foreground mb-2" />
                        <p>Publish this document</p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your idea with others.
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={handlePublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default Publish;
