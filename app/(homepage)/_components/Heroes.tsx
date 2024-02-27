import Image from 'next/image';

const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center gap-10">
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                    <Image
                        src="/assets/images/documents.png"
                        fill
                        className="object-contain"
                        alt="Documents"
                    />
                </div>
                <div className="relative w-[400px] h-[400px] sm:block hidden">
                    <Image
                        src="/assets/images/reading.png"
                        fill
                        className="object-contain"
                        alt="Reading"
                    />
                </div>
            </div>
        </div>
    );
};

export default Heroes;
