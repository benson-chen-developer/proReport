import { Projection } from "../../Types/ProjectionTypes";

export const fetchPopularProjections = async (): Promise<Projection[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/projections/popular`);
    if (!response.ok) throw new Error('Failed to fetch Projections');
    const data = await response.json();

    return data;
}

export const fetchProjections = async (league:string, playerName: string): Promise<Projection[]> => {
    /* Return them */
    if(playerName) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/projections/${league}/${playerName}`);
        if (!response.ok) throw new Error('Failed to fetch Projections');
        const data = await response.json();

        return data;
    } else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/projections`);
        if (!response.ok) throw new Error('Failed to fetch Projections');
        const data = await response.json();

        return data;
    }
  }