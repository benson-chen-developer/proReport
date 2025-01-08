import { Promo } from "../../pages/promotions";

export const fetchPromos = async (): Promise<Promo[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/promo`);
        if (!res.ok) {
            throw new Error(`Failed to fetch promos: ${res.statusText}`);
        }
        const promos = await res.json();
        return promos;
    } catch (error) {
        console.error('Error fetching promos:', error);
        return [];
    }
}