BasicGame.PartGroups = {
  Kusanagi: {
    id: "Kusanagi",
    list: [
      "part0001",
      "part0002",
      "part0003",
      "part0004",
      "part0005",
      "part0006",
      "part0007",
      "part0008",
      "part0009",
    ],
  },
};

BasicGame.ButtonData = {
  button0001: {
    id: "button0001",
    sprite: "button4",
    style: "button3_style",
    buttonText: "Kusanagi",
    anchor: 0,
    overFrame: 1,
    outFrame: 0,
    downFrame: 1,
    upFrame: 0,
    buttonEvent: "tile_MODAL_DISPLAY_ON",
    buttonTitle: "Kusanagi Heavy Industries",
    buttonDetail:
      "Originally known for making cheap plastic typewriters, Kusanagi are the defacto brand for deep solar exploration.",
    eventParameter: "Kusanagi",
    enabled: true,
  },

  button0002: {
    id: "button0002",
    sprite: "button4",
    style: "button3_style",
    buttonText: "Gunters & M",
    anchor: 0,
    overFrame: 1,
    outFrame: 0,
    downFrame: 1,
    upFrame: 0,
    buttonEvent: "tile_MODAL_DISPLAY_ON",
    buttonTitle: "Gunters and Mauser",
    buttonDetail:
      "Pioneers of the Heylien-Carlite bonding, the rest as they say is history.",
    eventParameter: "Gunters",
    enabled: true,
  },

  button0003: {
    id: "button0003",
    sprite: "button3",
    style: "button2_style",
    buttonText: "Save Ship",
    anchor: 0.5,
    overFrame: 0,
    outFrame: 1,
    downFrame: 0,
    upFrame: 1,
    buttonEvent: "save_OPEN_SHIP",
    buttonTitle: "Build and Store ship",
    buttonDetail: "Press this to save your ship and store it in the dockyard.",
    eventParameter: "",
    enabled: true,
  },

  button0004: {
    id: "button0004",
    sprite: "button3",
    style: "button2_style",
    buttonText: "Dockyard",
    anchor: 0.5,
    overFrame: 0,
    outFrame: 1,
    downFrame: 0,
    upFrame: 1,
    buttonTitle: "The Dockyard",
    buttonDetail: "Here is where all your current ships are stored.",
    buttonEvent: "state_MY_SHIPS",
    eventParameter: "",
    enabled: true,
  },

  button0005: {
    id: "button0005",
    sprite: "button3",
    style: "button2_style",
    buttonText: "DryDock",
    anchor: 0.5,
    overFrame: 0,
    outFrame: 1,
    downFrame: 0,
    upFrame: 1,
    buttonTitle: "The DryDock",
    buttonDetail:
      "This is where the magic happens, select a manufacturer and drag your desired part to build your ship.",
    buttonEvent: "state_CREATE_SHIP",
    eventParameter: "",
    enabled: true,
  },

  button0006: {
    id: "button0006",
    sprite: "button3",
    style: "button2_style",
    buttonText: "Business",
    anchor: 0.5,
    overFrame: 0,
    outFrame: 1,
    downFrame: 0,
    upFrame: 1,
    buttonTitle: "Business",
    buttonDetail:
      "This is where you'll make your moolah, let's take it slow for now.",
    buttonEvent: "",
    eventParameter: "",
    enabled: true,
  },
};

BasicGame.PartData = {
  part0001: {
    id: "part0001",
    sprite: "basicParts",
    frame: 0,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 100,
    mass: 100,
    thrust: 200,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },

  part0002: {
    id: "part0002",
    sprite: "basicParts",
    frame: 1,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 20,
    mass: 100,
    thrust: 0,
    powerOut: 0,
    powerIn: 10,
    manpower: 4,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "Heavy Module",
    info: "The Kusanagi heavy module, don't let the name fool you.",
  },

  part0003: {
    id: "part0003",
    sprite: "basicParts",
    frame: 2,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 20,
    mass: 100,
    thrust: 0,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },

  part0004: {
    id: "part0004",
    sprite: "basicParts",
    frame: 3,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 100,
    mass: 100,
    thrust: 0,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },

  part0005: {
    id: "part0005",
    sprite: "basicParts",
    frame: 4,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 100,
    mass: 100,
    thrust: 0,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },

  part0006: {
    id: "part0006",
    sprite: "basicParts",
    frame: 5,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 100,
    mass: 100,
    thrust: 200,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },

  part0007: {
    id: "part0007",
    sprite: "basicParts",
    frame: 6,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 100,
    mass: 100,
    thrust: 200,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },

  part0008: {
    id: "part0008",
    sprite: "basicParts",
    frame: 7,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 100,
    mass: 100,
    thrust: 200,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },

  part0009: {
    id: "part0009",
    sprite: "basicParts",
    frame: 8,
    damageFrame: 1,
    animation: ["loopAnim", [2, 3, 4, 5], 5, true],
    cost: 100,
    mass: 100,
    thrust: 200,
    powerOut: 0,
    powerIn: 20,
    manpower: 10,
    crewQuarters: 0,
    type: "engine",
    brand: "Kusanagi Heavy Industries",
    model: "X05",
    info: "The tried and true KHI XO5, it truly lives up to it's reputation, 'To Mars and back' indeed.",
  },
};
