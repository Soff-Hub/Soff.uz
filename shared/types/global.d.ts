// shared/types/global.d.ts

// Environment variables (not in next-env.d.ts)
declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_BASE_URL: string;
        NEXT_PUBLIC_FREELEANCE_URL: string;
        NEXT_PUBLIC_WS_BASE_URL: string;
        NEXT_PUBLIC_WS_FREELEANCE_URL: string;
        NODE_ENV: 'development' | 'production' | 'test';
    }
}

// SCSS/CSS module declarations
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const content: { [key: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { [key: string]: string };
    export default content;
}

// Add other custom module declarations as needed
