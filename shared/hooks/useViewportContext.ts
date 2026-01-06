import { useContext } from 'react';
import { ViewportContext } from '../contexts/ViewportContext';

export function useViewportContext() {
    const context = useContext(ViewportContext);

    if (!context)
        throw new Error(
            'useViewportContext must be used within ViewportContext'
        );
    return context;
}
