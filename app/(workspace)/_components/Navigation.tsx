'use client';

import {
    ChevronsLeftIcon,
    MenuIcon,
    PlusIcon,
    Search,
    Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, ElementRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@lib/utils';
import UserItem from './UserItem';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import Item from './Item';
import { toast } from 'sonner';
import DocumentList from './DocumentList';

const Navigation = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<'aside'>>(null);
    const navbarRef = useRef<ElementRef<'div'>>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const pathname = usePathname();

    const create = useMutation(api.documents.create);

    useEffect(() => {
        if (isMobile) {
            collapseSidebar();
        } else {
            minimizeWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) collapseSidebar();
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;

        let newWidth = event.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = newWidth + 'px';
            navbarRef.current.style.left = newWidth + 'px';
            navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const minimizeWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sidebarRef.current.style.width = isMobile ? '100%' : '240px';
            navbarRef.current.style.width = isMobile
                ? '0'
                : 'calc(100% - 240px)';
            navbarRef.current.style.left = isMobile ? '100%' : '240px';
        }

        setTimeout(() => setIsResetting(false), 300);
    };

    const collapseSidebar = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = '0';
            navbarRef.current.style.width = '100%';
            navbarRef.current.style.left = '0';

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleCreate = () => {
        const promise = create({ title: 'Untitled' });

        toast.promise(promise, {
            loading: 'Creating document...',
            success: 'Document created',
            error: 'Failed to create document',
        });
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-50',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'w-0'
                )}
            >
                <div
                    role="button"
                    onClick={collapseSidebar}
                    className={cn(
                        'w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
                        isMobile && 'opacity-100'
                    )}
                >
                    <ChevronsLeftIcon className="w-6 h-6" />
                </div>
                <div>
                    <UserItem />
                    <Item
                        onClick={() => {}}
                        label="Search"
                        icon={Search}
                        isSearch
                    />
                    <Item onClick={() => {}} label="Settings" icon={Settings} />
                    <Item
                        onClick={handleCreate}
                        label="New Document"
                        icon={PlusIcon}
                    />
                </div>
                <div className="mt-4">
                    <DocumentList />
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={minimizeWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    'absolute top-0 z-50 left-60 w-[calc(100%-240px)]',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'left-0 w-full'
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && (
                        <MenuIcon
                            role="button"
                            onClick={minimizeWidth}
                            className="w-6 h-6 text-muted-foreground"
                        />
                    )}
                </nav>
            </div>
        </>
    );
};

export default Navigation;
