import { createContext, useEffect, useRef, useState } from 'react';

type ViewPortContextType = {
    headerHeight: number;
    headerRef: React.RefObject<HTMLDivElement>;
    containerHeight: number;
};
export const ViewportContext = createContext<ViewPortContextType | null>(null);

export const ViewportContextProvider = ({
    children,
}: React.PropsWithChildren) => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            let headerHeight = entry.contentRect.height;
            const availableHeight = Math.round(
                window.innerHeight - headerHeight
            );
            setHeaderHeight(headerHeight);
            setContainerHeight(availableHeight);
        });

        if (headerRef.current) observer.observe(headerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [headerRef.current]);

    return (
        <ViewportContext.Provider
            value={{ headerHeight, headerRef, containerHeight }}>
            {children}
        </ViewportContext.Provider>
    );
};
