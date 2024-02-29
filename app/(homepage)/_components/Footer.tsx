import { Button } from '@components/ui/Button';
import Logo from './Logo';

const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <p className="font-semibold hidden md:flex whitespace-nowrap">
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
