'use client';

import { Doc } from '@convex/_generated/dataModel';
import IconPicker from './IconPicker';
import { Button } from './ui/Button';
import { ImageIcon, SmilePlus, X } from 'lucide-react';
import React, { useRef, useState, ElementRef } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import TextAreaAutosize from 'react-textarea-autosize';

interface ToolbarProps {
    initialData: Doc<'documents'>;
    preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<'textarea'>>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const handleInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || 'Untitled',
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            disableInput();
        }
    };

    const handleIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        });
    };

    const handleIconRemove = () => {
        removeIcon({
            id: initialData._id,
        });
    };

    return (
        <div className="pl-[60px] group relative pt-10">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={handleIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        size="icon"
                        variant="outline"
                        onClick={handleIconRemove}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">{initialData.icon}</p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <IconPicker onChange={handleIconSelect} asChild>
                        <Button
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <SmilePlus className="w-4 h-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                        onClick={() => {}}
                    >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextAreaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={handleKeyDown}
                    value={value}
                    onChange={(e) => handleInput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[12px] text-5xl font-bold break-worlds outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    );
};

export default Toolbar;
