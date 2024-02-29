'use client';

import { Id } from '@convex/_generated/dataModel';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from '@components/ui/DropdownMenu';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { toast } from 'sonner';
import { MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Skeleton } from '@components/ui/Skeleton';

interface MenuProps {
    documentId: Id<'documents'>;
}

const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const handleArchive = () => {
        const promise = archive({ id: documentId });

        toast.promise(promise, {
            loading: 'Archiving document...',
            success: 'Document archived!',
            error: 'Failed to archive document.',
        });

        router.push('/documents');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={handleArchive}>
                    <Trash className="w-4 h-4 mr-2" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div>Last edited by: {user?.fullName}</div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton className="w-10 h-10" />;
};

export default Menu;
