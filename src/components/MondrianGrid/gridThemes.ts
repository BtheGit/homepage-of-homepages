export type Theme = {
  colors: string[];
  baseColor: string;
  blankPercentage: number;
};

export const themes = new Map<string, Theme>();

themes.set("synthwave", {
  colors: ["#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0"],
  baseColor: "#FFF",
  blankPercentage: 0.05,
  // TODO: animation type? Or have a separate blinker settings?
});

themes.set("pastel_rainbow", {
  colors: [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
  ],
  baseColor: "#FFF",
  blankPercentage: 0.25,
});

themes.set("pastel_pink_gradient", {
  colors: [
    "#ecc2ff",
    "#e4c6ff",
    "#d5c4ff",
    "#c6c6fe",
    "#c6cbff",
    "#c4d6ff",
    "#c0dafd",
    "#bde4fe",
    "#bce9fe",
    "#b8fbff",
  ],
  baseColor: "#FFF",
  blankPercentage: 0.3,
});
