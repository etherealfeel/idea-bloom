'use client';

import { useState, useEffect } from 'react';
import { File } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import {
    CommandDialog,
    CommandEmpty,
    CommandList,
    CommandItem,
    CommandInput,
    CommandGroup,
} from '@components/ui/Command';
import { useSearchStore } from '@hooks/useSearchStore';
import { api } from '@convex/_generated/api';

const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);

    const toggle = useSearchStore((store) => store.toggle);
    const isOpen = useSearchStore((store) => store.isOpen);
    const onClose = useSearchStore((store) => store.onClose);

    const [isMounted, setIsMounted] = useState(false);

    //avoid hydration error
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [toggle]);

    const handleSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    };

    if (!isMounted) return null;

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search for ${user?.fullName}'s ideas...`}
            />
            <CommandList>
                <CommandEmpty>No ideas found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((doc) => (
                        <CommandItem
                            key={doc._id}
                            value={`${doc._id} - ${doc.title}`}
                            title={doc.title}
                            onSelect={handleSelect}
                        >
                            {doc.icon ? (
                                <p className="mr-2 text-[18px]">{doc.icon}</p>
                            ) : (
                                <File className="w-4 h-4 mr-2" />
                            )}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default SearchCommand;
