'use client';

import { Button } from '@components/ui/Button';
import { ArrowRight } from 'lucide-react';

const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                Transform your ideas into actions.&nbsp;
                <span className="underline">Idea Bloom</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Idea boom is a platform...
            </h3>
            <Button>
                Enter
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    );
};

export default Heading;
