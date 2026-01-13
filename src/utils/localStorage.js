const STORAGE_KEY = 'music_library';

export const loadLibrary = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : []; 
    } catch {
        return [];
    }
};

export const saveLibrary = (library) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}
