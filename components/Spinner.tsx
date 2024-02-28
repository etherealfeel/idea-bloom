import { Loader } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const spinnerVariants = cva('text-muted-background animate-spin', {
    variants: {
        size: {
            sm: 'w-2 h-2',
            md: 'w-4 h-4',
            lg: 'w-6 h-6',
            xl: 'w-10 h10',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => {
    return <Loader className={cn(spinnerVariants({ size }))} />;
};
