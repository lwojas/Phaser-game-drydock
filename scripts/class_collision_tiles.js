BasicGame.CreateCollisionTiles = function (Sprite) {
  BasicGame.CollisionTiles.alpha = 0.4;

  this.collisionSprite = Sprite;

  var amount = 50;

  // if (BasicGame.touchOn) {amount = 1};

  BasicGame.CollisionTiles.createMultiple(amount, Sprite);

  // var initTile =  BasicGame.CollisionTiles.getFirstExists(false);

  // initTile.reset(game.camera.x + 640, game.camera.y + 384);

  this.fadeTweenA = game.add
    .tween(BasicGame.CollisionTiles)
    .to({ alpha: 0.2 }, 400, "Quart.easeIn");
  this.fadeTweenB = game.add
    .tween(BasicGame.CollisionTiles)
    .to({ alpha: 0.4 }, 800, "Quart.easeIn");
  this.fadeTweenA.chain(this.fadeTweenB);
  this.fadeTweenB.chain(this.fadeTweenA);
  // this.fadeTweenA.start();

  BasicGame.CustomSignals.save_OPEN_SHIP.add(this.ResetCollisionTiles, this);

  BasicGame.CustomSignals.state_CREATE_SHIP.add(this.ResetCollisionTiles, this);

  BasicGame.CustomSignals.move_COLLISION_SPRITE.add(this.MoveSingleTile, this);

  BasicGame.CustomSignals.kill_PAINT_SPRITES.add(
    this.ResetCollisionTiles,
    this
  );

  if (!BasicGame.touchOn) {
    BasicGame.CustomSignals.kill_COLLISION_SPRITE.add(
      this.KillSingleTile,
      this
    );
  }

  this.ResetCollisionTiles();
};

BasicGame.CreateCollisionTiles.prototype.KillSingleTile = function (sprite) {
  BasicGame.CollisionTiles.forEach(function (c) {
    if (c.world.x == sprite.world.x && c.world.y == sprite.world.y) {
      c.kill();
      c.x = -32;
      c.y = -32;
    }
  });
};

BasicGame.CreateCollisionTiles.prototype.DrawSingleTile = function () {
  var spriteName = BasicGame.CollisionTiles.getFirstExists(false);
  spriteName.exists = true;
  spriteName.alive = true;

  return spriteName;
};

BasicGame.CreateCollisionTiles.prototype.MoveSingleTile = function (
  pointer,
  b
) {
  // console.log('Touch is down');

  var singleTile;

  if (BasicGame.editTools.brushOn) {
    if (!BasicGame.brushClearToggle) {
      BasicGame.brushClearToggle = true;
      BasicGame.CollisionTiles.forEach(function (c) {
        c.kill();
        c.x = -32;
        c.y = -32;
      });
    }

    singleTile = this.DrawSingleTile();

    console.log("First if is fired brushOn = true");
  } else {
    singleTile = BasicGame.CollisionTiles.getFirstExists(true);

    if (!singleTile) {
      singleTile = this.DrawSingleTile();
    }

    console.log("Second if is fired brushOn is not true");
  }

  singleTile.x = BasicGame.RoundTo32Grid(pointer.world.x);
  singleTile.y = BasicGame.RoundTo32Grid(pointer.world.y);

  BasicGame.CollisionTiles.forEachAlive((c) => {
    if (singleTile.x == c.x && singleTile.y == c.y && singleTile != c) {
      singleTile.kill();
      singleTile.x = -32;
      singleTile.y = -32;
    }
  });

  BasicGame.touchPosition.x = pointer.world.x;
  BasicGame.touchPosition.y = pointer.world.y;
};

BasicGame.CreateCollisionTiles.prototype.ResetCollisionTiles = function () {
  BasicGame.CollisionTiles.forEach(function (c) {
    c.kill();
    c.x = -32;
    c.y = -32;
  });

  if (!BasicGame.editTools.brushOn) {
    BasicGame.initTile = BasicGame.CollisionTiles.getFirstExists(false);
    BasicGame.initTile.reset(game.camera.x + 400, game.camera.y + 384);
    BasicGame.touchPosition.x = BasicGame.initTile.world.x;
    BasicGame.touchPosition.y = BasicGame.initTile.world.y;

    BasicGame.CustomSignals.move_POINTER.dispatch(BasicGame.initTile);
  }
};

BasicGame.CreateCollisionTiles.prototype.SpawnCollisionTiles = function (
  Sprite
) {
  // var Sprite = this.collisionSprite;

  for (var i = 0; i < 4; i++) {
    var xPos, yPos;

    // console.log('Loop is working');

    if (i == 0) {
      xPos = 32;
      yPos = 0;
    } else if (i == 1) {
      xPos = 0;
      yPos = 32;
    } else if (i == 2) {
      xPos = -32;
      yPos = 0;
    } else if (i == 3) {
      xPos = 0;
      yPos = -32;
    }

    var colTile = BasicGame.CollisionTiles.getFirstExists(false);
    colTile.reset(Sprite.world.x + xPos, Sprite.world.y + yPos);

    var collisionCheck = BasicGame.CheckPosition(
      BasicGame.activeGroup,
      colTile
    );
    var tileCheck = BasicGame.CheckPosition(BasicGame.CollisionTiles, colTile);

    if (collisionCheck || tileCheck) {
      colTile.kill();
    }

    //var colTile = BasicGame.CollisionTiles.getFirstExists(false);
  }
};
