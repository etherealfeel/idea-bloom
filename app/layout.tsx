import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { ThemeProvider } from '@components/providers/themeProvider';
import { ConvexClientProvider } from '@components/providers/convexProvider';
import { ModalProvider } from '@components/providers/modalProvider';
import { EdgeStoreProvider } from '@lib/edgestore';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
    title: 'Idea Bloom',
    description:
        'Organized platform for planning and transforming ideas into action',
    icons: {
        icon: 'assets/icons/logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={roboto.className}>
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
