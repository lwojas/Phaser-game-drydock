BasicGame.TileSpriteManager = function (PartGroupData) {
  this.partGroupData = PartGroupData;

  this.hudGroup = BasicGame.HUDGroup;

  this.hudLayer = game.add.group();
  this.hudGroup.add(this.hudLayer);
  this.spriteOverlayGroup = game.add.group();
  this.hudGroup.add(this.spriteOverlayGroup);

  this.TilePartGroupContainer = {};
  this.TileBGGroupContainer = {};
  this.TilePartDetailTextLayer = {};

  this.frame_style_green = {
    font: "10px neuroregular",
    fill: "#B8E986",
    align: "left",
    boundsAlignH: "left",
    boundsAlignV: "center",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.frame_style_yellow = {
    font: "10px neuroregular",
    fill: "#F8E71C",
    align: "left",
    boundsAlignH: "left",
    boundsAlignV: "center",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.frame_style_red = {
    font: "10px neuroregular",
    fill: "#FC8F9C",
    align: "left",
    boundsAlignH: "left",
    boundsAlignV: "center",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.frame_style_blue = {
    font: "10px neuroregular",
    fill: "#A6CEFC",
    align: "left",
    boundsAlignH: "left",
    boundsAlignV: "center",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.CreateShipParts(BasicGame.PartData, BasicGame.PartGroups.Kusanagi);

  this.CreatePartPointer();

  BasicGame.CustomSignals.tile_MODAL_DISPLAY_OFF.add(
    this.ClosePartsModal,
    this
  );

  BasicGame.CustomSignals.tile_MODAL_DISPLAY_ON.add(this.DrawParts, this);
};

BasicGame.TileSpriteManager.prototype.ClosePartsModal = function () {
  this.hudGroup.setAll("visible", false);
};

BasicGame.TileSpriteManager.prototype.DrawParts = function (TileGroupName) {
  this.hudLayer.setAll("visible", false);

  this.hudLayer.visible = true;

  var tileGroup = this.TilePartGroupContainer[TileGroupName];

  var bgGroup = this.TileBGGroupContainer[TileGroupName];

  var textLayer = this.TilePartDetailTextLayer[TileGroupName];

  bgGroup.visible = true;

  tileGroup.visible = true;

  textLayer.visible = true;

  this.selector.visible = true;

  // tileGroup.alpha = 0;

  // bgGroup.alpha = 0;

  // tileGroup.startAnimation.start();
  this.hudLayer.alpha = 0;
  this.hudLayer.y += 32;
  this.hudLayer.moveAnimation.start();
  this.hudLayer.startAnimation.start();

  // tileGroup.y += 32;
  // tileGroup.moveAnimation.start();
  // tileGroup.startAnimation.start();
};

BasicGame.TileSpriteManager.prototype.MovePartPointer = function (Sprite) {
  this.selector.x = Sprite.world.x - this.hudGroup.x - 2;
  this.selector.y = Sprite.world.y - this.hudGroup.y - 2;
  this.selector.playAnimA.start();
  // console.log(Sprite.x, Sprite.world.x);
};

BasicGame.TileSpriteManager.prototype.CreatePartPointer = function () {
  this.selector = game.add.sprite(0, 0, "pointer_part");
  this.selector.playAnimA = game.add
    .tween(this.selector)
    .to({ alpha: 1 }, 100, "Quart.easeIn");
  this.selector.playAnimB = game.add
    .tween(this.selector)
    .to({ alpha: 0 }, 300, "Quart.easeIn");
  this.selector.playAnimA.chain(this.selector.playAnimB);
  this.selector.alpha = 0;
  // this.selector.playAnimB.chain(this.selector.playAnimA);
  // this.selector.playAnimA.start();
  this.hudLayer.add(this.selector);
  this.selector.x -= 2;
  this.selector.y -= 2;
};

BasicGame.TileSpriteManager.prototype.CreateShipParts = function (
  partData,
  groupData
) {
  this.TilePartGroupContainer[groupData.id] = game.add.group();
  this.TileBGGroupContainer[groupData.id] = game.add.group();
  this.TilePartDetailTextLayer[groupData.id] = game.add.group();

  var tileGroup = this.TilePartGroupContainer[groupData.id];
  var bgGroup = this.TileBGGroupContainer[groupData.id];
  var textLayer = this.TilePartDetailTextLayer[groupData.id];

  this.hudLayer.startAnimation = game.add
    .tween(this.hudLayer)
    .to({ alpha: 1 }, 300, "Quart.easeIn");
  this.hudLayer.moveAnimation = game.add
    .tween(this.hudLayer)
    .to({ y: 0 }, 400, "Quart.easeIn");

  // tilegroup.bgTiles =
  // bgGroup.createMultiple(32, 'tile_black', 0, false);

  // tileGroup.startAnimation = game.add.tween(tileGroup).to({alpha:1}, 400, "Quart.easeIn");
  // tileGroup.moveAnimation = game.add.tween(tileGroup).to({y:616}, 400, "Quart.easeIn");

  // console.log(group);

  tileGroup.name = groupData.id;

  //group.createMultiple(1, sprite, [0,1,2,3,4,5,6,7,8], true);

  for (let i = 0; i < groupData.list.length; i++) {
    var spriteInfo = partData[groupData.list[i]];

    var partSprite = tileGroup.create(
      0,
      0,
      spriteInfo.sprite,
      spriteInfo.frame
    );

    partSprite.partID = spriteInfo.id;

    partSprite.partTitle = spriteInfo.brand + " - " + spriteInfo.model;

    partSprite.partDetail = spriteInfo.info;

    partSprite.hitArea = new Phaser.Rectangle(0, 0, 56, 64);

    console.log(spriteInfo.frame);

    partSprite.events.onInputOver.add((a) => {
      BasicGame.CustomSignals.update_TOOL_TIP.dispatch(
        a.partTitle,
        a.partDetail
      );
    });

    partSprite.events.onInputUp.add((a) => {
      this.MovePartPointer(a);
      BasicGame.CustomSignals.update_TOOL_TIP.dispatch(
        a.partTitle,
        a.partDetail
      );
    });

    partSprite.events.onInputOut.add(() => {
      BasicGame.CustomSignals.close_TOOL_TIP.dispatch();
    });

    if (BasicGame.touchOn) {
      partSprite.events.onInputDown.add((s) => {
        BasicGame.CustomSignals.sprite_PAINT_SHIP_PART.dispatch(
          spriteInfo.sprite,
          s.partID,
          s.frame
        );

        console.log(spriteInfo.frame);
      });
    }
  }

  tileGroup.align(24, -1, 68, 48);

  // tileGroup.anchor.x = 0.5;
  tileGroup.x = 640 - (tileGroup.children.length * 68) / 2;
  tileGroup.y = 616;

  tileGroup.setAll("inputEnabled", true);

  for (let i = 0; i < tileGroup.children.length; i++) {
    var bgSprite = bgGroup.create(
      tileGroup.children[i].x + tileGroup.x - 3,
      tileGroup.children[i].y + tileGroup.y - 3,
      "tile_frame"
    );

    var spritePartInfo = partData[tileGroup.children[i].partID];

    if (spritePartInfo.thrust) {
      bgSprite.frame = 1;
    }

    var detailYellow = game.add.text(
      tileGroup.children[i].x + tileGroup.x + 2,
      tileGroup.children[i].y + tileGroup.y + 36,
      "+ " + spritePartInfo.thrust,
      this.frame_style_yellow
    );
    textLayer.add(detailYellow);

    var detailRed = game.add.text(
      tileGroup.children[i].x + tileGroup.x + 2,
      tileGroup.children[i].y + tileGroup.y + 36 + 12,
      "+ " + spritePartInfo.mass,
      this.frame_style_red
    );
    textLayer.add(detailRed);

    var detailGreen = game.add.text(
      tileGroup.children[i].x + tileGroup.x + 32 + 3,
      tileGroup.children[i].y + tileGroup.y + 4,
      "+" + spritePartInfo.powerIn / 10,
      this.frame_style_green
    );
    textLayer.add(detailGreen);

    var detailBlue = game.add.text(
      tileGroup.children[i].x + tileGroup.x + 32 + 3,
      tileGroup.children[i].y + tileGroup.y + 16,
      "+" + spritePartInfo.powerOut / 10,
      this.frame_style_blue
    );
    textLayer.add(detailBlue);
  }

  console.log(this.hudGroup);

  this.hudLayer.add(bgGroup);
  this.hudLayer.add(tileGroup);
  this.hudLayer.add(textLayer);
  this.hudLayer.visible = false;
};
