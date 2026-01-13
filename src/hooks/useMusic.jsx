import { useContext } from 'react';
import { MusicContext } from '../context/MusicContext.jsx';

export function useMusic() {
    return useContext(MusicContext);
}