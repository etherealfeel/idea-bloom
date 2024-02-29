import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { ThemeProvider } from '@components/providers/themeProvider';
import { ConvexClientProvider } from '@components/providers/convexProvider';
import { ModalProvider } from '@components/providers/modalProvider';
import { EdgeStoreProvider } from '@lib/edgestore';

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
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ConvexClientProvider>
                    <EdgeStoreProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                            storageKey="idea-bloom-theme-2"
                        >
                            <Toaster position="bottom-center" />
                            <ModalProvider />
                            {children}
                        </ThemeProvider>
                    </EdgeStoreProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
