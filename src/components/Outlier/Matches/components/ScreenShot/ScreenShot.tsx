import html2canvas from "html2canvas";
import { BarInfo } from "../BarInfo";
import { BarData } from "../../../Matches";
import { Hero } from "../../../Hero/Hero";
import { Team } from "../../../../../Context/Types/PlayerTypes";
import { MatchUp } from "../../../../../Context/Types/Match";

interface Props {
    mainBarData: BarData[],
    matchUp: MatchUp | undefined
    teams: Team[]
}
export const ScreenShot: React.FC<Props> = ({
    mainBarData, matchUp, teams
}) => {
    return (
        <div style={{width:'100%'}}>
            <Hero 
                matchUp={matchUp}
                teams={teams}
                screenShotMode={true}
            />
            <BarInfo
                mainBarData={mainBarData}
                screenShotMode={true}
            />
            {/* <Bars
                refLineOn={true}
                seasonAvg={0}
                barData={mainBarData}
                player={player} 
                chartType="main"
            /> */}
        </div>
    );
};