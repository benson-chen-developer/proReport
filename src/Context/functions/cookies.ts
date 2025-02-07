import { PGame } from "../Types/PlayerTypes";

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('MyDatabase', 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore('nbaMatches', { keyPath: 'url' });
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject('Error opening IndexedDB');
        };
    });
};
  
export const saveData = async (data: PGame[]) => {
    const db = await openDB();
    const transaction = db.transaction('nbaMatches', 'readwrite');
    const store = transaction.objectStore('nbaMatches');

    data.forEach(game => {
        if (game.url) {
            store.put(game);
        } else {
            console.error('Error: Each game must have a "url" property as the key.');
        }
    });

    return new Promise((resolve, reject) => {
        console.log('all game data saved', data)
        transaction.oncomplete = () => resolve('Data saved successfully!');
        transaction.onerror = () => reject('Error saving data.');
    });
};
  
export const getAllData = async (): Promise<PGame[]> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction('nbaMatches', 'readonly');
        const store = transaction.objectStore('nbaMatches');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject('Error fetching all data');
    });
};

export const clearData = async () => {
    const db = await openDB();
    const transaction = db.transaction('nbaMatches', 'readwrite');
    const store = transaction.objectStore('nbaMatches');

    const clearRequest = store.clear();

    return new Promise((resolve, reject) => {
        console.log('cleared cache')
        clearRequest.onsuccess = () => resolve('Cache cleared successfully!');
        clearRequest.onerror = () => reject('Error clearing cache.');
    });
};