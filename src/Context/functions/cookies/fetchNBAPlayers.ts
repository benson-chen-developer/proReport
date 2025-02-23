import { PPlayer } from "../../Types/PlayerTypes";

const DB_NAME = 'MyDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'nbaPlayers';

// Ensure the database and object store exist before using it
const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'name' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Error opening IndexedDB');
    });
};

// Fetch players from IndexedDB cache
const getCachedNbaPlayers = async (): Promise<PPlayer[]> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => resolve(getAllRequest.result);
        getAllRequest.onerror = () => reject('Error reading IndexedDB');
    });
};

// Cache fetched players in IndexedDB
const cacheNbaPlayers = async (players: PPlayer[]): Promise<void> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        players.forEach(player => store.put(player));

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject('Error writing to IndexedDB');
    });
};

// Main function to fetch or get cached players
export const fetchCachedNBAPlayers = async (): Promise<PPlayer[]> => {
    let nbaPlayers: PPlayer[] = await getCachedNbaPlayers();

    if (nbaPlayers.length === 0) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/psport/players/nba`);
        if (!response.ok) throw new Error('Failed to fetch NBA players');
        nbaPlayers = await response.json();

        await cacheNbaPlayers(nbaPlayers); // Cache new data
    }

    return nbaPlayers;
};
