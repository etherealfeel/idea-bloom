import Image from 'next/image';

const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-4 w-full">
            <Image
                src="/assets/icons/logo.svg"
                height={40}
                width={40}
                alt="logo"
                className="dark:hidden"
            />
            <Image
                src="/assets/icons/logo.svg"
                height={40}
                width={40}
                alt="logo dark"
                className="dark:block hidden invert"
            />
        </div>
    );
};

export default Logo;
