//Register the service worker if available.
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.js').then(function(reg) {
//         console.log('Successfully registered service worker', reg);
//     }).catch(function(err) {
//         console.warn('Error whilst registering service worker', err);
//     });
// }

var WIDTH = (window.screen.availWidth / window.screen.availHeight) * 720;
// var HEIGHT =  * window.devicePixelRatio;

var game = new Phaser.Game(WIDTH, 720, Phaser.WEBGL_MULTI, "");

var BasicGame = {};

BasicGame.screenWidth = game.width;
BasicGame.screenHeight = game.height;
BasicGame.marginOffset = 48;

BasicGame.activeGroup;
BasicGame.CollisionTiles;

BasicGame.TempTotalShipCost = 0;

BasicGame.TotalFunds = 100000;

BasicGame.activeShipName = "";

BasicGame.TempTotalFunds;

BasicGame.touchPosition = {
  x: 0,
  y: 0,
};

BasicGame.margins = {
  left: BasicGame.marginOffset,
  right: BasicGame.ScreenWidth - BasicGame.marginOffset,
};

console.log(game.device.iOS, game.device.android);
BasicGame.touchOn = true;

BasicGame.editTools = {};

BasicGame.editTools.eraserOn = false;
BasicGame.editTools.brushOn = false;
BasicGame.editTools.brushDown = false;
BasicGame.editTools.brushClearToggle = false;
BasicGame.editTools.spriteRotateOn = false;
BasicGame.editTools.shopOn = false;

BasicGame.CustomSignals = {};

BasicGame.CustomSignals.tile_MODAL_DISPLAY_ON = new Phaser.Signal();
BasicGame.CustomSignals.tile_MODAL_DISPLAY_OFF = new Phaser.Signal();

BasicGame.CustomSignals.myships_MODAL_ON = new Phaser.Signal();
BasicGame.CustomSignals.save_OPEN_SHIP = new Phaser.Signal();
BasicGame.CustomSignals.open_SAVED_SHIP = new Phaser.Signal();
BasicGame.CustomSignals.myships_ADD_SHIP = new Phaser.Signal();
BasicGame.CustomSignals.state_MY_SHIPS = new Phaser.Signal();
BasicGame.CustomSignals.state_CREATE_SHIP = new Phaser.Signal();

BasicGame.CustomSignals.update_INFO_PANEL = new Phaser.Signal();

BasicGame.CustomSignals.update_TOOL_TIP = new Phaser.Signal();
BasicGame.CustomSignals.close_TOOL_TIP = new Phaser.Signal();

BasicGame.CustomSignals.move_COLLISION_SPRITE = new Phaser.Signal();
BasicGame.CustomSignals.kill_COLLISION_SPRITE = new Phaser.Signal();
BasicGame.CustomSignals.kill_PAINT_SPRITES = new Phaser.Signal();

BasicGame.CustomSignals.move_POINTER = new Phaser.Signal();

BasicGame.CustomSignals.sprite_DRAW_SHIP_PART = new Phaser.Signal();
BasicGame.CustomSignals.sprite_PAINT_SHIP_PART = new Phaser.Signal();

BasicGame.CustomSignals.fx_SWIPE_PLAY = new Phaser.Signal();

BasicGame.UpdateTempShipCost = function (Amount) {
  BasicGame.TempTotalShipCost += Amount;
};

BasicGame.UpdateTempFunds = function (Amount) {
  BasicGame.TempTotalFunds = -Amount;
};

BasicGame.RoundTo32Grid = function (number) {
  var snapValue = 32;
  var snapped = Math.round(number / snapValue) * snapValue;
  return snapped;
};

BasicGame.Boot = function (game) {};

BasicGame.Boot.prototype = {
  init: function () {
    //console.log('Init has fired');
    this.game.stage.smoothed = false;
    game.config.enableDebug = false;
  },

  preload: function () {
    this.load.image("bg", "assets/bg.png");
    this.load.image("touch_area", "assets/_png/touch_area.png");
    this.load.image("bg_stars", "assets/bg_starfield_3.jpg");
    this.load.image("fg_stars", "assets/fg_starfield_2.png");
    //this.load.image('close_modal', 'assets/button_close_modal.png');
    this.load.image("bg_grid", "assets/bg_grid.png");
    this.load.image("bigBlue", "assets/planet_blue_monday.png");
    this.load.image("cam_pan_side", "assets/camera_pan_side.png");
    this.load.image("cam_pan_top", "assets/camera_pan_top.png");
    // this.load.image('modal_tile', 'assets/modal_bg_create.png');
    // this.load.image('modal_nav', 'assets/modal_bg_top.png');
    this.load.image("modal_nav", "assets/_png/modalbg_nav.png");
    this.load.image("modal_tile", "assets/_png/modalbg_tile.png");
    this.load.image("modal_bottom", "assets/_png/modal_bg_bottom.png");
    this.load.image("header", "assets/_png/header.png");
    this.load.image("pointer_part", "assets/_png/pointer_part2.png");
    this.load.image("tile32", "assets/_png/part_bridge.png");
    this.load.image("tile_red", "assets/_png/part_cargo.png");
    this.load.image("tile_black", "assets/_png/square32_black.png");
    this.load.image("line", "assets/_png/line.png");
    this.load.spritesheet("pointer", "assets/_png/pointer.png", 38, 38);
    this.load.image("highlight_not", "assets/_png/highlight_notification.png");
    this.load.spritesheet("tile_frame", "assets/bg_tile_frame.png", 62, 82);
    this.load.spritesheet("basicParts", "assets/part_sheet.png", 32, 32);
    this.load.spritesheet(
      "close_modal",
      "assets/button_close_modal.png",
      13,
      13
    );
    this.load.spritesheet("button_camera", "assets/button_camera.png", 64, 48);
    this.load.spritesheet("button1", "assets/button_1.png", 192, 40);
    this.load.spritesheet("button2", "assets/button_2.png", 192, 32);
    this.load.spritesheet("button3", "assets/button_3.png", 192, 28);
    this.load.spritesheet("button4", "assets/button_4.png", 160, 24);
    this.load.spritesheet("swipe", "assets/_png/swipe.png", 32, 16);

    this.load.atlasJSONHash(
      "dockAtlas",
      "assets/drydock_atlas.png",
      "assets/drydock_atlas.json"
    );
  },

  create: function () {
    game.clearBeforeRender = false;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.time.advancedTiming = false;
    this.physics.startSystem(Phaser.Physics.ARCADE);
    game.camera.roundPx = false; // stops the sprite from jittering.

    game.state.start("StartLevel"); // Load the first level
  },
};

window.onload = function () {
  game.state.add("Boot", BasicGame.Boot);
  game.state.add("StartLevel", BasicGame.StartLevel);
  game.state.start("Boot");
};
