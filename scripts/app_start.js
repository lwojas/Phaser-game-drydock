BasicGame.StartLevel = function (game) {};

BasicGame.StartLevel.prototype = {
  create: function () {
    console.log("StartLevel has loaded");

    if (game.device.iOS || game.device.android) {
      BasicGame.touchOn = true;
    }

    game.renderer.setTexturePriority([
      "tile_red",
      "swipe",
      "basicParts",
      "tile_frame",
    ]);

    // Set up sprite backgrounds

    BasicGame.BGStars = game.add.sprite(0, 0, "bg_stars");
    BasicGame.BGStars.anchor.setTo(0.5, 0.5);
    BasicGame.BGStars.x = BasicGame.screenWidth / 2;
    BasicGame.BGStars.y = BasicGame.screenHeight / 2;
    BasicGame.BGStars.fixedToCamera = true;

    // Set up scrolling BG layer

    BasicGame.background = game.add.tileSprite(0, 200, 4000, 4000, "fg_stars");
    BasicGame.background.blendMode = PIXI.blendModes.SCREEN;

    // Other BG sprites

    var planet = game.add.sprite(1232, 517, "bigBlue");

    var grid = game.add.sprite(0, 0, "bg_grid");
    grid.fixedToCamera = true;

    // Set up global groups

    BasicGame.CollisionTiles = game.add.group();
    BasicGame.HUDGroup = game.add.group();
    BasicGame.HUDGroup.fixedToCamera = true;

    // Set up Classes

    BasicGame.CollisionManager = new BasicGame.CreateCollisionTiles("tile32");

    BasicGame.Ship = new BasicGame.ShipManager();

    BasicGame.Parts = new BasicGame.TileSpriteManager();

    BasicGame.HUD = new BasicGame.UI();

    // Populate HUD

    BasicGame.HUD.CreateButton("button0001", "brandsList");
    BasicGame.HUD.CreateButton("button0002", "brandsList");
    BasicGame.HUD.CreateButton("button0001", "brandsList");
    // BasicGame.HUD.CreateButton('button0001', 'brandsList');
    // BasicGame.HUD.CreateButton('button0001', 'brandsList');
    // BasicGame.HUD.CreateButton('button0001', 'brandsList');
    // BasicGame.HUD.CreateButton('button0001', 'brandsList');
    // BasicGame.HUD.CreateButton('button0001', 'brandsList');

    BasicGame.HUD.CreateButton("button0003", "createToolsList");
    BasicGame.HUD.CreateButton("button0004", "headerList");
    BasicGame.HUD.CreateButton("button0005", "headerList");
    BasicGame.HUD.CreateButton("button0006", "headerList");

    // BasicGame.HUD.CreateButton('button0002', 'brandsList');

    game.world.setBounds(0, 0, 3840, 4000);

    game.world.bringToTop(BasicGame.HUDGroup);
  },

  update: function () {
    BasicGame.background.tilePosition.x -= 0.05;
  },
};

BasicGame.ButtonEvent = function (button) {};

BasicGame.StopDrag = function (Sprite) {
  //console.log(Sprite);
  var SpriteX = Sprite.world.x;
  var SpriteY = Sprite.world.y;

  var positionCheck = BasicGame.CheckPosition(BasicGame.activeGroup, Sprite);

  var collisionCheck = BasicGame.CheckPosition(
    BasicGame.CollisionTiles,
    Sprite
  );

  if (!positionCheck && collisionCheck) {
    BasicGame.CustomSignals.sprite_DRAW_SHIP_PART.dispatch(
      SpriteX,
      SpriteY,
      Sprite.key,
      Sprite.partID,
      Sprite.frame
    );

    BasicGame.CustomSignals.kill_COLLISION_SPRITE.dispatch(Sprite);

    // var shipSprite = game.add.sprite(SpriteX, SpriteY, Sprite.key, Sprite.partID, Sprite.frame);
    // shipSprite.frame = Sprite.frame;
    // shipSprite.partID = Sprite.partID;
    // BasicGame.activeGroup.add(shipSprite);

    BasicGame.CollisionManager.SpawnCollisionTiles(Sprite);

    BasicGame.UpdateTempShipCost(BasicGame.PartData[Sprite.partID].cost);

    BasicGame.CustomSignals.update_INFO_PANEL.dispatch(
      BasicGame.TempTotalShipCost
    );
  }

  Sprite.x = Sprite.xPos;
  Sprite.y = Sprite.yPos;
};

BasicGame.CheckPosition = function (Group, Sprite) {
  var bool;

  for (var i = 0; i < Group.children.length; i++) {
    // console.log(Group.children[i], '-----', Sprite);

    // if (Group.children[i].x == Sprite.x + Sprite.parent.position.x && Group.children[i].y == Sprite.y + Sprite.parent.position.y && Sprite != Group.children[i]) {
    if (
      Group.children[i].world.x == Sprite.world.x &&
      Group.children[i].world.y == Sprite.world.y &&
      Sprite != Group.children[i] &&
      Group.children[i].alive
    ) {
      bool = true;
    }
  }

  return bool;
};
