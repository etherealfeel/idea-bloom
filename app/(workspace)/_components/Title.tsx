'use client';

import { Doc } from '@convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { useRef, useState } from 'react';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Skeleton } from '@components/ui/Skeleton';

interface TitleProps {
    initialData: Doc<'documents'>;
}

const Title = ({ initialData }: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const update = useMutation(api.documents.update);

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData.title || 'Untitled');

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(
                0,
                inputRef.current.value.length
            );
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        update({
            id: initialData._id,
            title: e.target.value || 'Untitled',
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            disableInput();
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    value={title}
                    onClick={enableInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={disableInput}
                    className="h-7 px-2 focus-visible:ring-transparent"
                />
            ) : (
                <Button
                    onClick={enableInput}
                    variant="ghost"
                    size="sm"
                    className="font-normal h-auto p-1"
                >
                    <span className="truncate">{title}</span>
                </Button>
            )}
        </div>
    );
};

Title.Skeleton = function TitleSkeleton() {
    return <Skeleton className="w-20 h-8 rounded-md" />;
};

export default Title;
