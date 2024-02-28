'use client';

import { Id } from '@convex/_generated/dataModel';
import { LucideIcon, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@lib/utils';
import { Skeleton } from '@components/ui/Skeleton';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ItemProps {
    id?: Id<'documents'>;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;

    label: string;
    onClick: () => void;
    icon: LucideIcon;
}

const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
}: ItemProps) => {
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };

    const handleCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title: 'Untitled', parentDocument: id }).then(
            (documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                // router.push(`/documents/${documentId}`);
            }
        );
        toast.promise(promise, {
            loading: 'Creating document...',
            success: 'Document created!',
            error: 'Failed to create document',
        });
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
            className={cn(
                'group min-h-[28px] text-sm py-1 pr-3 w-full hover:bf-primary/5 flex items-center text-muted-foreground',
                active && 'bg-primary/5 text-primary'
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="w-4 h4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
            ) : (
                <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            )}
            <span className="truncate">{label}</span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded gap-1 bg-muted border px-1.5 font-mono text-[10px] opacity-100 font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>+ K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <div
                        role="button"
                        onClick={handleCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    >
                        <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 24}px` : '12px' }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-[30%] h-4" />
        </div>
    );
};

export default Item;
