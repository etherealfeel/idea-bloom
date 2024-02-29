'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@components/ui/Button';

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/assets/images/error.png"
                width={400}
                height={400}
                className="object-contain dark:invert w-[250px] h-[250px] sm:w-[200px] sm:h-[200px]"
                alt="Error"
            />
            <h2 className="text-xl font-medium">Something went wrong...</h2>
            <Button asChild>
                <Link href="/documents">Return to documents</Link>
            </Button>
        </div>
    );
};

export default Error;
