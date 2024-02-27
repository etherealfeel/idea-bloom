import { Button } from '@components/ui/Button';
import Logo from './Logo';
import { Poppins } from 'next/font/google';

import { cn } from '@lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const Footer = () => {
    return (
        <div className="flex items-center w-full p-10 bg-background z-50">
            <Logo />
            <p
                className={cn(
                    'font-semibold hidden md:flex whitespace-nowrap',
                    font.className
                )}
            >
                &copy; 2024 | Idea Bloom
            </p>
            <div className="flex md:ml-auto w-full justify-between md:justify-end items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    About Us
                </Button>
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Terms of Service
                </Button>
            </div>
        </div>
    );
};

export default Footer;
