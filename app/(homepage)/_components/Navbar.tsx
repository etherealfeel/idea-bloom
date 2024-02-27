'use client';
import { useScrollTop } from '@hooks/useScrollTop';
import { cn } from '@lib/utils';
import Logo from './Logo';

const Navbar = () => {
    const scrolled = useScrollTop();
    return (
        <div
            className={cn(
                'bg-background fixed flex items-center top-0 w-full p-8 z-50',
                scrolled && 'border-b shadow-sm'
            )}
        >
            <Logo />
            <div className="md:ml-auto md:justify-between w-full flex items-center gap-x-2">
                Login
            </div>
        </div>
    );
};

export default Navbar;
