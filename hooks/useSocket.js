// import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
    process.env.NODE_ENV === 'production'
        ? 'wss://api.soff.uz/'
        : 'wss://api.soff.uz/';

// const socket = io(URL);
const socket = new WebSocket(URL);

export const useSocket = () => socket;
