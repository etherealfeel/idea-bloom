import { useState, useEffect } from 'react';

export const useScrollTop = (distance = 10) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < distance) {
                setScrolled(false);
                return;
            }

            setScrolled(true);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [distance]);

    return scrolled;
};
