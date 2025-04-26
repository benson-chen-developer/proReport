import { useRef } from "react";
import html2canvas from "html2canvas";
import { ScreenShot } from "./ScreenShot"; // import your component
import { BarData } from "../../../Matches";
import { Hero } from "../../../Hero/Hero";
import { BarInfo } from "../BarInfo";
import { MatchUp } from "../../../../../Context/Types/Match";
import { Team } from "../../../../../Context/Types/PlayerTypes";

interface Props {
    mainBarData: BarData[],
    matchUp: MatchUp | undefined
    teams: Team[]
}

export const ScreenShotHandler: React.FC<Props> = ({ mainBarData, matchUp, teams }) => {
  const hiddenRef = useRef<HTMLDivElement>(null);

  const handleCapture = async () => {
    if (!hiddenRef.current) return;

    const canvas = await html2canvas(hiddenRef.current, {
        backgroundColor: '#1E1E1E'
    });

    canvas.toBlob(async (blob) => {
        if (blob) {
          const clipboardItem = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([clipboardItem]);
          alert("Chart image copied to clipboard!");
        }
      });
  };

  return (
    <div>
      {/* Hidden render */}
      <div
        ref={hiddenRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
        //   visibility: "hidden", // important
          width: "1000px", // you can customize size
        }}
      >
        <div style={{width:'100%'}}>
            {/* <Hero
                matchUp={matchUp}
                teams={teams}
                screenShotMode={true}
            /> */}
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
      </div>

      {/* Trigger button */}
      <button onClick={handleCapture}>Take Screenshot</button>
    </div>
  );
};
