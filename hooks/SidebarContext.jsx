// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Defaults
const defaultProvider = {
    collapse: true,
    toggleSidebar: () => { }
}

const SidebarContext = createContext(defaultProvider)

const SidebarProvider = ({ children }) => {
    const [collapse, setCollapse] = useState(defaultProvider.collapse);

    function toggleSidebar() {
        localStorage.setItem('collapse', !collapse)
        setCollapse(c => !c)
    }

    function initSidebar() {
        if (localStorage.getItem('collapse')) {
            return setCollapse(localStorage.getItem('collapse') === 'true')
        }
    }

    const values = {
        collapse,
        toggleSidebar
    };

    useEffect(() => {
        initSidebar()
    }, []);

    return <SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>;
}

export { SidebarContext, SidebarProvider }
