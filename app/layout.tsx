import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Idea Bloom',
    description:
        'Organized platform for planning and transforming ideas into action',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: 'assets/icons/logo.svg',
                href: 'assets/icons/logo.svg',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: 'assets/icons/logo-dark.svg',
                href: 'assets/icons/logo-dark.svg',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
