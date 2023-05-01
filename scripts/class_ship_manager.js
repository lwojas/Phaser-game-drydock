BasicGame.ShipManager = function () {
  this.saveShips = {};
  this.tempGroup = game.add.group();
  this.shipNameCounter = 1;
  this.defaultShipName = "MyShip_";

  this.CreateShip();

  BasicGame.CustomSignals.save_OPEN_SHIP.add(this.SaveShip, this);
  BasicGame.CustomSignals.open_SAVED_SHIP.add(this.LoadShip, this);

  // BasicGame.CustomSignals.state_CREATE_SHIP.add(this.ClearActiveGroup, this);
  BasicGame.CustomSignals.sprite_DRAW_SHIP_PART.add(this.DrawShipPart, this);
  BasicGame.CustomSignals.sprite_PAINT_SHIP_PART.add(this.PaintShipParts, this);
};

BasicGame.ShipManager.prototype.CreateShip = function () {
  //this.group = game.add.group();
  BasicGame.activeGroup = this.tempGroup;
};

BasicGame.ShipManager.prototype.ClearActiveGroup = function () {
  BasicGame.activeGroup.removeAll(true);
};

BasicGame.ShipManager.prototype.LoadShip = function (ShipName) {
  BasicGame.activeGroup.removeAll(true);
  BasicGame.activeShipName = ShipName;

  var shipToLoad = this.saveShips[ShipName];

  for (var i = 0; i < shipToLoad.length; i++) {
    var shipPart = BasicGame.PartData[shipToLoad[i][0]];

    var frame = shipPart.frame;
    var partID = shipPart.id;
    // BasicGame.activeGroup.add(shipSprite);

    // var shipSprite = game.add.sprite(shipToLoad[i][1], shipToLoad[i][2], shipPart.sprite);
    this.DrawShipPart(
      shipToLoad[i][1],
      shipToLoad[i][2],
      shipPart.sprite,
      partID,
      frame,
      shipToLoad[i][3]
    );
    console.log(shipPart.sprite);
  }
};

BasicGame.ShipManager.prototype.DrawShipPart = function (
  x,
  y,
  Sprite,
  id,
  frame,
  Angle
) {
  console.log(id);

  var that = this;

  var shipSprite = game.add.sprite(x, y, Sprite);
  shipSprite.anchor.setTo(0.5, 0.5);
  shipSprite.angle = Angle;
  shipSprite.world.x = x;
  shipSprite.world.x = y;
  shipSprite.frame = frame;
  shipSprite.partID = id;
  shipSprite.inputEnabled = true;
  shipSprite.events.onInputDown.add((s) => {
    BasicGame.CustomSignals.move_POINTER.dispatch(s);
    console.log(s);
    if (BasicGame.editTools.eraserOn) {
      s.kill();
    }
    if (BasicGame.editTools.spriteRotateOn) {
      // s.anchor.setTo(.5,.5);
      that.RotatePart(s);
    }
  }, this);
  BasicGame.activeGroup.add(shipSprite);
};

BasicGame.ShipManager.prototype.RotatePart = function (Sprite) {
  var xPos = Sprite.x;
  var yPos = Sprite.y;
  Sprite.angle += 90;
};

BasicGame.ShipManager.prototype.PaintShipParts = function (Sprite, id, frame) {
  // console.log('Paint should be working');

  var that = this;
  var timer = 0;

  BasicGame.CollisionTiles.forEachAlive(function (c) {
    game.time.events.add(timer, () => {
      console.log("Paint should be working");

      var shipSprite = game.add.sprite(c.world.x + 16, c.world.y + 16, Sprite);
      shipSprite.world.x = c.world.x + 16;
      shipSprite.world.x = c.world.y + 16;
      shipSprite.anchor.setTo(0.5, 0.5);
      shipSprite.frame = frame;
      shipSprite.partID = id;
      shipSprite.inputEnabled = true;
      shipSprite.events.onInputDown.add((s) => {
        BasicGame.CustomSignals.move_POINTER.dispatch(s);
        // console.log(s);
        if (BasicGame.editTools.eraserOn) {
          s.kill();
        }
        if (BasicGame.editTools.spriteRotateOn) {
          // s.anchor.setTo(.5,.5);
          that.RotatePart(s);
        }
      }, this);
      BasicGame.activeGroup.add(shipSprite);
      BasicGame.CustomSignals.update_INFO_PANEL.dispatch(id);
    });
    timer += 50;
    BasicGame.CustomSignals.fx_SWIPE_PLAY.dispatch();
    // BasicGame.CustomSignals.update_INFO_PANEL.dispatch(id);
  });

  // BasicGame.CustomSignals.fx_SWIPE_PLAY.dispatch();

  if (BasicGame.editTools.brushOn) {
    BasicGame.CustomSignals.kill_PAINT_SPRITES.dispatch();
  }
};

BasicGame.ShipManager.prototype.SaveShip = function () {
  var shipName;
  if (BasicGame.activeShipName) {
    shipName = BasicGame.activeShipName;
  } else {
    shipName = this.defaultShipName + this.shipNameCounter;
    BasicGame.CustomSignals.myships_ADD_SHIP.dispatch(
      shipName,
      "open_SAVED_SHIP",
      shipName,
      "button4",
      "button3_style",
      "savedShipsList"
    );
  }

  this.shipNameCounter++;

  this.saveShips[shipName] = [];

  var spriteTable = BasicGame.activeGroup.children;

  for (var i = 0; i < spriteTable.length; i++) {
    var partContainer = [];

    partContainer.push(
      spriteTable[i].partID,
      spriteTable[i].x,
      spriteTable[i].y,
      spriteTable[i].angle
    );

    this.saveShips[shipName].push(partContainer);
  }

  this.ClearActiveGroup();

  BasicGame.TempTotalShipCost = 0;

  BasicGame.CustomSignals.update_INFO_PANEL.dispatch(
    BasicGame.TempTotalShipCost
  );

  BasicGame.activeShipName = "";
};
