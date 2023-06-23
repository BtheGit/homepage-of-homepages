export const colorTexture = (hexColor: string) => ({
  textureType: "color",
  textureConfig: { colorType: "hex", color: hexColor },
});

export const imageTexture = (textureName = "default") => ({
  textureType: "image",
  textureConfig: { name: textureName },
});

// TODO: Temp hack to get textures dynamically. Things it doesn't do:
// - doesnt verify texture exists
// - assumes pathname
// - does not know how to find keys arbitrarily, hardcoded and brute force search
export const getTexturePaths = (grid: any[]) => {
  const textureValues = new Set();

  const findTextureNames = (cell: any) => {
    if (typeof cell === "object" && cell !== null) {
      if (
        "textureConfig" in cell &&
        typeof cell.textureConfig === "object" &&
        cell.textureConfig !== null
      ) {
        if ("name" in cell.textureConfig) {
          textureValues.add(cell.textureConfig.name);
        }
      }

      for (const key in cell) {
        findTextureNames(cell[key]);
      }
    }
  };

  for (const row of grid) {
    for (const cell of row) {
      findTextureNames(cell);
    }
  }

  // Remove default:
  textureValues.delete("default");
  // This gets us our textures, but not our sprites.
  // Since all of this is a hack until (or never) I fix the underlying library
  // I'm going to just add the path manually
  // This also doesn't support .pngs!
  const uniqueTextureValues = Array.from(textureValues);
  const texturePaths = uniqueTextureValues.map(
    (name) => `/raymarcher/default/tiles/${name}.jpg`
  );
  return texturePaths;
};

export const getSpritePaths = (sprites: any[]) => {
  const spriteValues = new Set();
  for (const sprite of sprites) {
    spriteValues.add(sprite.spritesheet);
  }
  const uniqueSpriteValues = Array.from(spriteValues);
  const spritePaths = uniqueSpriteValues.map(
    (name) => `/raymarcher/default/sprites/${name}.png`
  );
  return spritePaths;
};

const FLOOR_DEFAULT = {
  type: "floor",
  ...imageTexture("floor__grass2"),
};

const FLOOR_WATER = {
  type: "floor",
  ...imageTexture("floor__water1"),
};
const FLOOR_PATH = {
  type: "floor",
  ...imageTexture("floor__stone1"),
};

const WALL_DEFAULT = {
  type: "wall",
  ...imageTexture("default"),
};

const FLOOR_NW = {
  type: "floor",
  ...imageTexture("default"),
  ceilingConfig: imageTexture("default"),
};

const WALL_LIGHT_BRICK1_ALL = {
  type: "wall",
  ...imageTexture("light_brick1"),
};

// Separating grid so I can parse for used textures instaed of managing file system.
const grid = [
  [
    WALL_DEFAULT,
    WALL_DEFAULT,
    WALL_DEFAULT,
    WALL_DEFAULT,
    WALL_DEFAULT,
    WALL_DEFAULT,
    WALL_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_DEFAULT,
    // {
    //   type: "wall",
    //   textureType: "image",
    //   textureConfig: { name: "light_brick1" },
    //   faces: {
    //     north: {
    //       textureType: "image",
    //       textureConfig: { name: "marble1" },
    //     },
    //     south: 3,
    //     east: 4,
    //     west: 5,
    //   },
    // },
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_DEFAULT,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        north: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
        west: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        north: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_DEFAULT,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        west: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_DEFAULT,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    FLOOR_NW,
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        west: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_DEFAULT,
    FLOOR_NW,
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        north: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
        west: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        north: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        north: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_DEFAULT,
    FLOOR_NW,
    {
      type: "wall",
      textureType: "image",
      textureConfig: { name: "light_brick1" },
      faces: {
        west: {
          textureType: "image",
          textureConfig: { name: "default" },
        },
      },
    },
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_WATER,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_WATER,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_WATER,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_PATH,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_PATH,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    FLOOR_DEFAULT,
    WALL_LIGHT_BRICK1_ALL,
  ],
  [
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
    WALL_LIGHT_BRICK1_ALL,
  ],
];

// TODO: I'm just going to run a few processes to alter tiles quickly instead of messing around in the grid. It will get unwieldy soon, sure, but I'm lazy like all good programmers.

const sprites = [
  {
    type: "prop",
    name: "tree1",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 13.2,
      y: 10.8,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree2",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 13.4,
      y: 10.2,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
    scale: 1.3,
    verticalOffset: 1.2,
  },
  {
    type: "prop",
    name: "tree3",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 13.7,
      y: 10.7,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree1",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 9.2,
      y: 10.8,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree2",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 9.4,
      y: 10.2,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
    scale: 1.3,
    verticalOffset: 1.2,
  },
  {
    type: "prop",
    name: "tree3",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 9.7,
      y: 10.7,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree1",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 9.2,
      y: 9.8,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree2",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 9.4,
      y: 9.2,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
    scale: 1.3,
    verticalOffset: 1.2,
  },
  {
    type: "prop",
    name: "tree3",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 9.7,
      y: 9.7,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree1",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 10.2,
      y: 9.8,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree2",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 10.4,
      y: 9.2,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
    scale: 1.3,
    verticalOffset: 1.2,
  },
  {
    type: "prop",
    name: "tree3",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 10.7,
      y: 9.7,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree1",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 12.2,
      y: 9.8,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree2",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 12.4,
      y: 9.2,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
    scale: 1.3,
    verticalOffset: 1.2,
  },
  {
    type: "prop",
    name: "tree3",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 12.7,
      y: 9.7,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree1",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 13.2,
      y: 9.8,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  {
    type: "prop",
    name: "tree2",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 13.4,
      y: 9.2,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
    scale: 1.3,
    verticalOffset: 1.2,
  },
  {
    type: "prop",
    name: "tree3",
    spritesheet: "sprite__tree_1",
    pos: {
      x: 13.7,
      y: 9.7,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.2,
  },
  // {
  //   type: "prop",
  //   name: "tree4",
  //   spritesheet: "sprite__tree_1",
  //   pos: {
  //     x: 12.75,
  //     y: 11.5,
  //   },
  //   isAnimated: false,
  //   isMultifaceted: false,
  //   isSolid: true,
  //   boundingBox: 0.2,
  // },
  // {
  //   type: "prop",
  //   name: "tree5",
  //   spritesheet: "sprite__tree_1",
  //   pos: {
  //     x: 11.5,
  //     y: 12,
  //   },
  //   isAnimated: false,
  //   isMultifaceted: false,
  //   isSolid: true,
  //   boundingBox: 0.2,
  // },
  // {
  //   type: "prop",
  //   name: "tree6",
  //   spritesheet: "sprite__palm_tree_1_high",
  //   pos: {
  //     x: 9.5,
  //     y: 10,
  //   },
  //   isAnimated: false,
  //   isMultifaceted: false,
  //   isSolid: true,
  //   boundingBox: 0.2,
  //   verticalOffset: 0.95,
  // },
  {
    type: "prop",
    name: "spider-man1",
    spritesheet: "sprite__spider-man_static_1",
    pos: {
      x: 11.5,
      y: 9,
    },
    isAnimated: false,
    isMultifaceted: false,
    isSolid: true,
    boundingBox: 0.35,
  },
  // {
  //   type: "prop",
  //   name: "spider-man2",
  //   spritesheet: "sprite__spider-man_static_1",
  //   pos: {
  //     x: 13,
  //     y: 16,
  //   },
  //   isAnimated: false,
  //   isMultifaceted: false,
  //   isSolid: true,
  //   boundingBox: 0.35,
  //   scale: 0.65,
  //   verticalOffset: 0.35,
  //   trigger: {
  //     type: "showText",
  //     text: "Hi!\n\nRemember to always respect the hyphen!",
  //   },
  // },
];

const texturePaths = getTexturePaths(grid);
const spritePaths = getSpritePaths(sprites);

// TODO: Be careful, missing textures (404s) break the whole thing on the client
const textures = [...texturePaths, ...spritePaths];

export default {
  map: {
    grid,
    player: {
      pos: {
        x: 13,
        y: 13,
      },
      dir: {
        x: 0,
        y: -1,
      },
      plane: {
        x: -0.66,
        Y: 0,
      },
    },
    sky: {
      textureType: "gradient",
      textureConfig: {
        stops: [
          {
            stop: 0,
            color: "#7AA1D2",
          },
          {
            stop: 0.8,
            color: "#DBD4B4",
          },
          {
            stop: 1,
            color: "#CC95C0",
          },
        ],
      },
    },
  },
  sprites,
  textures,
  tiles: [],
};
