import { PPlayer } from "../../../../Context/Types/PlayerTypes";
import { Filter } from "../../Matches";

export const copyLink = (link: string) => {
    navigator.clipboard.writeText(link)
      .then(() => {
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
};

export const shareImg = () => {
    
}
  
export const shareLink = (player: PPlayer, filter: Filter): string => {
    const link = `${process.env.NEXT_PUBLIC_LOCAL_ROUTE_FRONT}/player/${player.sport}/${player.name.replace(' ', '_')}`;
    const stringifiedFilter = encodeURIComponent(JSON.stringify(filter));
    
    return `${link}?paramFilter=${stringifiedFilter}`;
};
