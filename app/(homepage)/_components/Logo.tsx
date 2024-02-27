import Image from 'next/image';

const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-4 w-full">
            <Image
                src="/assets/icons/logo-dark.svg"
                height={40}
                width={40}
                alt="logo"
            />
        </div>
    );
};

export default Logo;
