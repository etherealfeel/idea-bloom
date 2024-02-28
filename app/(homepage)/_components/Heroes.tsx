import Image from 'next/image';

const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center gap-10">
                <div className="relative w-[250px] h-[250px] sm:w-[200px] sm:h-[200px]">
                    <Image
                        src="/assets/images/documents.png"
                        fill
                        className="object-contain dark:hidden"
                        alt="Documents"
                    />
                    <Image
                        src="/assets/images/documents.png"
                        fill
                        className="object-contain dark:block hidden dark:invert"
                        alt="Documents"
                    />
                </div>
                <div className="relative w-[120px] h-[120px] sm:block hidden">
                    <Image
                        src="/assets/images/edit.png"
                        fill
                        className="object-contain dark:hidden"
                        alt="Edit"
                    />
                    <Image
                        src="/assets/images/edit.png"
                        fill
                        className="object-contain dark:block hidden dark:invert"
                        alt="Edit"
                    />
                </div>
            </div>
        </div>
    );
};

export default Heroes;
