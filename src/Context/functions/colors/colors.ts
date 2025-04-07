export const teamColors = (name: string) => {
    name = name.toLowerCase();

    /* Atlantic */
    if (name === "boston") return "#3E7A58";
    if (name === "brooklyn") return "#FFFFFF";
    if (name === "new york") return "#F48328";
    if (name === "philadelphia") return "#0369B4";
    if (name === "toronto") return "#F00A3F";

    /* Central */
    if (name === "chicago") return "#F00A3F";
    if (name === "cleveland") return "#CC9659";
    if (name === "detroit") return "#00408D";
    if (name === "indiana") return "#FFBC0E";
    if (name === "milwaukee") return "#004C26";

    /* Northwest */
    if (name === "denver") return "#FFC600";
    if (name === "minnesota") return "#266092";
    if (name === "oklahoma city") return "#FF381C";
    if (name === "portland") return "#FF373C";
    if (name === "utah") return "#FBE123";

    /* Pacific */
    if (name === "golden state") return "#E4AE12";
    if (name === "los angeles") return "#512683";
    if (name === "la") return "#3F0F6C";
    if (name === "phoenix") return "#FF6011";
    if (name === "sacramento") return "#6D348A";

    /* Southeast */
    if (name === "atlanta") return "#E9082A";
    if (name === "charlotte") return "#01798D";
    if (name === "miami") return "#B3012B";
    if (name === "washington") return "#01275D";
    if (name === "orlando") return "#0078C4";

    /* Southwest */
    if (name === "dallas") return "#0063B5";
    if (name === "memphis") return "#4F77AC";
    if (name === "houston") return "#000000";
    if (name === "new orleans") return "#B18A54";
    if (name === "san antonio") return "#C1CFD5";
}