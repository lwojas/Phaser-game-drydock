BasicGame.UI = function () {
  //////////////////////////////////////
  //
  // Setup UI groups
  //
  /////////////////////////////////////

  this.hud = game.add.group();
  this.hud.fixedToCamera = true;

  this.shipParts = BasicGame.PartData;

  this.bottomInfoBG = game.add.sprite(0, 522, "modal_bottom");
  // this.bottomInfoBG.y = game.camera.height - 218;
  this.hud.add(this.bottomInfoBG);

  // Main UI state parent group
  this.ui_states = game.add.group();

  // Main UI states
  this.state_create = game.add.group();
  this.state_myships = game.add.group();

  this.ui_states.add(this.state_create);
  this.ui_states.add(this.state_myships);

  // Camera PAN controls added to 'hud' group during create method
  this.panControlGroup = game.add.group();

  // Main navigation added to 'hud' group below
  this.header = game.add.group();
  this.headerList = game.add.group();

  this.cameraButtons = game.add.group();

  // Create sprite groups
  this.brands = game.add.group();
  this.brandsList = game.add.group();
  this.tiles = game.add.group();
  this.createTools = game.add.group();
  this.createFX = game.add.group();
  this.createMenu = game.add.group();

  // Add above sprite groups to the 'state_create' parent
  this.state_create.add(this.createTools);
  this.state_create.add(this.tiles);
  this.state_create.add(this.brands);
  this.state_create.add(this.brandsList);
  this.state_create.add(this.createFX);
  this.state_create.add(this.createMenu);

  // Dock / view state
  this.savedShips = game.add.group();
  this.state_myships.add(this.savedShips);

  //this.detailGroup = game.add.group();

  // Tool tip Modal added to 'hud' during create method
  this.toolTipGroup = game.add.group();

  // Layer sorting of main UI elements
  this.hud.add(this.header);
  this.hud.add(this.cameraButtons);
  this.hud.add(this.headerList);
  this.hud.add(this.ui_states);

  //////////////////////////////////////
  //
  // Setup text styles
  //
  /////////////////////////////////////

  this.modalstyle = {
    font: "14px neuroregular",
    fill: "#FFF",
    align: "left",
    boundsAlignH: "right",
    boundsAlignV: "top",
    wordWrap: true,
    wordWrapWidth: 200,
  };

  this.modalstyle24 = {
    font: "24px neuroregular",
    fill: "#FFF",
    align: "left",
    boundsAlignH: "right",
    boundsAlignV: "top",
    wordWrap: true,
    wordWrapWidth: 400,
  };

  this.modalstyle32 = {
    font: "32px neuroregular",
    fill: "#FFF",
    align: "left",
    boundsAlignH: "right",
    boundsAlignV: "top",
    wordWrap: true,
    wordWrapWidth: 400,
  };

  this.modalstyleLarge = {
    font: "48px neuroregular",
    fill: "#FFF",
    align: "left",
    boundsAlignH: "right",
    boundsAlignV: "top",
    wordWrap: true,
    wordWrapWidth: 200,
  };

  this.button1_style = {
    font: "18px neuroregular",
    fill: "#FFF",
    align: "center",
    boundsAlignH: "right",
    boundsAlignV: "top",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.button2_style = {
    font: "12px neuroregular",
    fill: "#FFF",
    align: "center",
    boundsAlignH: "right",
    boundsAlignV: "center",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.button3_style = {
    font: "12px neuroregular",
    fill: "#FFF",
    align: "left",
    boundsAlignH: "left",
    boundsAlignV: "center",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.deatail_style = {
    font: "14px neuroregular",
    fill: "#FFF",
    align: "left",
    boundsAlignH: "right",
    boundsAlignV: "top",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.funds_style = {
    font: "18px neuroregular",
    fill: "#9EE7FF",
    align: "left",
    boundsAlignH: "right",
    boundsAlignV: "top",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.deatailH1_style = {
    font: "14px neuroregular",
    fill: "#FFF",
    align: "left",
    boundsAlignH: "left",
    boundsAlignV: "top",
    wordWrap: false,
    // wordWrapWidth: 200
  };

  this.deatailBody_style = {
    font: "12px neuroregular",
    fill: "#DEDEDE",
    align: "left",
    boundsAlignH: "left",
    boundsAlignV: "top",
    wordWrap: true,
    wordWrapWidth: 300,
  };

  //////////////////////////////////////
  //
  // Fire the create methods, order determines sprite layers
  //
  /////////////////////////////////////

  this.CreateTileModal();
  this.CreatCameraControls();
  this.CreateCameraPanZones();
  if (BasicGame.touchOn) {
    this.CreateTouchArea();
  }
  this.CreateNavModal();
  this.CreateHeaderModal();
  this.CreateMyListModal();
  this.CreateDetailModal();
  this.CreateFundsModal();
  this.CreateNotificationHighlight();
  this.CreateToolTipModal();
  this.CreateBuildTools();

  //////////////////////////////////////
  //
  // Hide the main UI states
  //
  /////////////////////////////////////

  this.ui_states.forEach(function (c) {
    c.visible = false;
  });

  //////////////////////////////////////
  //
  // Bind events
  //
  /////////////////////////////////////

  BasicGame.CustomSignals.tile_MODAL_DISPLAY_ON.add(this.StartTileModal, this);
  BasicGame.CustomSignals.myships_ADD_SHIP.add(this.CreateDynamicButton, this);
  BasicGame.CustomSignals.myships_MODAL_ON.add(this.ShowMyShipsModal, this);
  BasicGame.CustomSignals.state_CREATE_SHIP.add(this.state_CREATESHIP, this);
  BasicGame.CustomSignals.state_MY_SHIPS.add(this.state_MYSHIPS, this);
  BasicGame.CustomSignals.update_INFO_PANEL.add(this.UpdateDetailModal, this);
  BasicGame.CustomSignals.update_TOOL_TIP.add(this.UpdateToolTip, this);
  BasicGame.CustomSignals.close_TOOL_TIP.add(this.CloseToolTip, this);
  BasicGame.CustomSignals.move_POINTER.add(this.MovePointer, this);
  BasicGame.CustomSignals.fx_SWIPE_PLAY.add(this.PlaySwipeFX, this);
};

//////////////////////////////////////
//
// Main UI state switchers
//
/////////////////////////////////////

BasicGame.UI.prototype.state_MYSHIPS = function () {
  this.ui_states.forEach(function (c) {
    c.visible = false;
  });
  this.state_myships.visible = true;
  this.ResetEditTools();
  BasicGame.CollisionTiles.visible = false;
  this.touchAreaGroup.visible = false;
  this.CloseTileImages();
};

BasicGame.UI.prototype.state_CREATESHIP = function () {
  this.ui_states.forEach(function (c) {
    c.visible = false;
  });
  this.state_create.visible = true;
  this.tiles.visible = false;
  this.ResetEditTools();
  BasicGame.CollisionTiles.visible = true;
  this.touchAreaGroup.visible = true;
  this.pointer_blue.playAnimA.start();
  BasicGame.editTools.shopOn = false; // This forces the shop toggle
  this.ShowNavModal();
};

BasicGame.UI.prototype.CreateTouchArea = function () {
  this.touchAreaGroup = game.add.group();
  this.touchAreaGroup.createMultiple(476 - 136, "tile_red");
  this.touchAreaGroup.x = game.camera.x + 64;
  this.touchAreaGroup.y = game.camera.y + 192;

  this.touchAreaGroup.align(34, 14, 32, 32);
  this.touchAreaGroup.alpha = 0;

  this.touchAreaGroup.forEach(function (c) {
    c.exists = true;
    c.inputEnabled = true;
  });

  // Bind Input events to each touch sprite
  this.touchAreaGroup.onChildInputDown.add((a, b) => {
    BasicGame.CustomSignals.move_POINTER.dispatch(a);
    BasicGame.editTools.brushDown = true;
    BasicGame.CustomSignals.move_COLLISION_SPRITE.dispatch(a, b);
    BasicGame.CustomSignals.close_TOOL_TIP.dispatch();
  }, this);

  this.touchAreaGroup.onChildInputUp.add((a, b) => {
    BasicGame.editTools.brushDown = false;
    BasicGame.brushClearToggle = false;
  }, this);

  this.touchAreaGroup.onChildInputOver.add((a, b) => {
    if (BasicGame.editTools.brushDown) {
      BasicGame.CustomSignals.move_POINTER.dispatch(a);
      BasicGame.CustomSignals.move_COLLISION_SPRITE.dispatch(a, b);
    }
  }, this);

  // Add the touch area to the 'hud' group
  this.hud.add(this.touchAreaGroup);
};

BasicGame.UI.prototype.EnableTouchArea = function () {
  this.touchAreaGroup.setAll("inputEnabled", true);
};

BasicGame.UI.prototype.DisableTouchArea = function () {
  this.touchAreaGroup.setAll("inputEnabled", false);
};

//////////////////////////////////////
//
// Edit tool states
//
/////////////////////////////////////

BasicGame.UI.prototype.SetBrushMode = function () {
  BasicGame.editTools.brushOn = !BasicGame.editTools.brushOn;

  if (!BasicGame.editTools.brushOn) {
    this.buttonBrush.frame = 13;
    BasicGame.CustomSignals.kill_PAINT_SPRITES.dispatch();
  } else {
    this.buttonBrush.frame = 12;
    this.buttonEraser.frame = 11;
    this.buttonRotate.frame = 15;
    BasicGame.editTools.eraserOn = false;
    BasicGame.editTools.spriteRotateOn = false;
    this.touchAreaGroup.visible = true;
    BasicGame.CollisionTiles.visible = true;
    this.pointer_blue.frame = 0;
  }
};

BasicGame.UI.prototype.SetEraserMode = function () {
  BasicGame.editTools.eraserOn = !BasicGame.editTools.eraserOn;

  if (!BasicGame.editTools.eraserOn) {
    this.buttonEraser.frame = 11;
    BasicGame.CollisionTiles.visible = true;
    this.touchAreaGroup.visible = true;
    this.pointer_blue.frame = 0;
    // BasicGame.CustomSignals.kill_PAINT_SPRITES.dispatch();
  } else {
    this.buttonEraser.frame = 10;
    this.buttonBrush.frame = 13;
    this.buttonRotate.frame = 15;
    BasicGame.editTools.brushOn = false;
    BasicGame.editTools.brushDown = false;
    BasicGame.editTools.brushClearToggle = false;
    BasicGame.editTools.spriteRotateOn = false;
    BasicGame.CollisionTiles.visible = false;
    this.touchAreaGroup.visible = false;
    this.pointer_blue.frame = 1;
  }
};

BasicGame.UI.prototype.SetRotateMode = function () {
  BasicGame.editTools.spriteRotateOn = !BasicGame.editTools.spriteRotateOn;

  if (!BasicGame.editTools.spriteRotateOn) {
    this.buttonRotate.frame = 15;
    BasicGame.CollisionTiles.visible = true;
    this.touchAreaGroup.visible = true;
    this.pointer_blue.frame = 0;
    // BasicGame.CustomSignals.kill_PAINT_SPRITES.dispatch();
  } else {
    this.buttonRotate.frame = 14;
    this.buttonEraser.frame = 11;
    this.buttonBrush.frame = 13;
    BasicGame.editTools.brushOn = false;
    BasicGame.editTools.brushDown = false;
    BasicGame.editTools.brushClearToggle = false;
    BasicGame.editTools.eraserOn = false;
    BasicGame.CollisionTiles.visible = false;
    this.touchAreaGroup.visible = false;
    this.pointer_blue.frame = 2;
  }
};

BasicGame.UI.prototype.ResetEditTools = function () {
  BasicGame.editTools.eraserOn = false;
  BasicGame.editTools.brushOn = false;
  BasicGame.editTools.brushDown = false;
  BasicGame.editTools.brushClearToggle = false;
  BasicGame.editTools.spriteRotateOn = false;
  this.buttonBrush.frame = 13;
  this.buttonEraser.frame = 11;
  this.buttonRotate.frame = 15;
};

BasicGame.UI.prototype.MovePointer = function (Sprite) {
  var offSet = 0;
  if (Sprite.anchor.x == 0.5) {
    offSet = 16;
  }

  this.pointer_blue.x = Sprite.world.x - this.hud.x - 3 - offSet;
  this.pointer_blue.y = Sprite.world.y - this.hud.y - 3 - offSet;
};

BasicGame.UI.prototype.PlaySwipeFX = function () {
  BasicGame.CollisionTiles.forEachAlive((c) => {
    var singleTile = this.swipeFX.getFirstExists(false);
    if (singleTile) {
      // console.log(singleTile.exists);
      singleTile.reset(c.world.x - this.hud.x, c.world.y - this.hud.y - 8);
      singleTile.playAnimA.start(); // This animation is declared in the create method below

      // This animation is added dynamically as tweens have abosolute values for positioning
      singleTile.playAnimC = game.add
        .tween(singleTile)
        .to({ y: "+32" }, 300, "Quart.easeIn");
      singleTile.playAnimC.onComplete.add(() => {
        game.tweens.remove(singleTile.playAnimC);
        singleTile.exists = false;
      }, this);
      singleTile.playAnimC.start();
    }
  });
};

BasicGame.UI.prototype.CreateBuildTools = function () {
  this.createToolsList = game.add.group();
  this.createEditList = game.add.group();

  this.buttonBrush = game.add.button(
    0,
    0,
    "button_camera",
    this.SetBrushMode,
    this
  );
  this.buttonBrush.frame = 13;
  this.createEditList.add(this.buttonBrush);

  this.buttonEraser = game.add.button(
    0,
    0,
    "button_camera",
    this.SetEraserMode,
    this
  );
  this.buttonEraser.frame = 11;
  this.createEditList.add(this.buttonEraser);

  this.buttonRotate = game.add.button(
    0,
    0,
    "button_camera",
    this.SetRotateMode,
    this
  );
  this.buttonRotate.frame = 15;
  this.createEditList.add(this.buttonRotate);

  this.swipeFX = game.add.group();
  this.swipeFX.createMultiple(50, "swipe", 0, false);
  this.swipeFX.forEach(function (c) {
    c.frame = 0;
    c.playAnimA = game.add.tween(c).to({ alpha: 1 }, 100, "Quart.easeIn");
    c.playAnimB = game.add.tween(c).to({ alpha: 0 }, 200, "Quart.easeIn");
    c.playAnimA.chain(c.playAnimB);
  });

  this.createTools.add(this.swipeFX);

  this.pointer_blue = game.add.sprite(0, 0, "pointer");
  this.pointer_blue.playAnimA = game.add
    .tween(this.pointer_blue)
    .to({ alpha: 0.8 }, 200, "Quart.easeIn");
  this.pointer_blue.playAnimB = game.add
    .tween(this.pointer_blue)
    .to({ alpha: 0.2 }, 600, "Quart.easeIn");
  this.pointer_blue.playAnimA.chain(this.pointer_blue.playAnimB);
  this.pointer_blue.playAnimB.chain(this.pointer_blue.playAnimA);

  this.createTools.add(this.pointer_blue);

  this.createToolsList.sortGroup = () => {
    // sortGroup method is used by dynamic buttons see the CreateDynamicButton method
    this.createToolsList.align(6, -1, 208, 48);
  };

  this.createEditList.x = game.camera.width - 80;
  this.createEditList.y = 300;
  this.createEditList.align(1, -1, 0, 60);

  this.createToolsList.x = game.camera.x + 960;

  this.createToolsList.y = 550;

  this.createToolsList.align(6, -1, 208, 48);

  this.createTools.add(this.createToolsList);
  this.createTools.add(this.createEditList);
};

BasicGame.UI.prototype.CreateToolTipModal = function () {
  this.tooltipBorder = game.add.sprite(0, 0, "line");

  this.tooltipTitle = game.add.text(
    this.tooltipBorder.x + 14,
    8,
    "Welcome to DryDock",
    this.deatailH1_style
  );

  this.tooltipDetail = game.add.text(
    this.tooltipTitle.x,
    this.tooltipTitle.y + 32,
    "Create endless possibilities, bring in the moolah.",
    this.deatailBody_style
  );

  this.toolTipGroup.add(this.tooltipBorder);
  this.toolTipGroup.add(this.tooltipTitle);
  this.toolTipGroup.add(this.tooltipDetail);

  // Move tool tip here
  this.toolTipGroup.x = 850;
  this.toolTipGroup.y = 80;

  this.hud.add(this.toolTipGroup);

  this.toolTipGroup.animOver = game.add
    .tween(this.toolTipGroup)
    .to({ alpha: 1 }, 100, "Quart.easeIn");
  this.toolTipGroup.animOut = game.add
    .tween(this.toolTipGroup)
    .to({ alpha: 0 }, 100, "Quart.easeIn");
};

BasicGame.UI.prototype.UpdateToolTip = function (title, detail) {
  this.toolTipGroup.alpha = 0;

  this.tooltipTitle.setText(title);

  this.tooltipDetail.setText(detail);

  if (this.toolTipGroup.animOver.isPlaying) {
    this.toolTipGroup.alpha = 1;
  } else {
    this.toolTipGroup.animOver.start();
  }
};

BasicGame.UI.prototype.CloseToolTip = function () {
  if (!this.toolTipGroup.animOver.isPlaying) {
    this.toolTipGroup.animOut.start();
  }
};

BasicGame.UI.prototype.CreateNotificationHighlight = function () {
  this.notificationHighlight = game.add.sprite(0, 0, "highlight_not");

  this.notificationHighlight.anchor.setTo(0.5, 0.5);

  this.notificationHighlight.alpha = 0;

  this.notificationHighlight.playAnimA = game.add
    .tween(this.notificationHighlight)
    .to({ alpha: 0.6 }, 200, "Quart.easeIn");
  this.notificationHighlight.playAnimB = game.add
    .tween(this.notificationHighlight)
    .to({ alpha: 0 }, 600, "Quart.easeIn");

  this.notificationHighlight.playAnimA.chain(
    this.notificationHighlight.playAnimB
  );

  this.notificationHighlight.visible = false;
};

BasicGame.UI.prototype.StartNotificationHighlight = function (x, y) {
  this.notificationHighlight.visible = true;
  this.notificationHighlight.alpha = 0;

  this.notificationHighlight.x = x;
  this.notificationHighlight.y = y;

  this.notificationHighlight.playAnimA.start();
};

BasicGame.UI.prototype.CreateDetailModal = function () {
  this.detailInfo = {};

  this.detailInfo.totalCost = game.add.text(
    BasicGame.margins.left,
    550,
    "Total cost: ",
    this.deatail_style
  );

  this.hud.add(this.detailInfo.totalCost);
};

BasicGame.UI.prototype.UpdateDetailModal = function (PartID) {
  var partInfo = this.shipParts[PartID];

  BasicGame.TempTotalShipCost += partInfo.cost;

  this.detailInfo.totalCost.setText(
    "Total cost: " + BasicGame.TempTotalShipCost
  );

  this.StartNotificationHighlight(
    this.detailInfo.totalCost.x + 80,
    this.detailInfo.totalCost.y + 10
  );
};

BasicGame.UI.prototype.CreateFundsModal = function () {
  this.fundsInfo = {};

  this.fundsInfo.totalFunds = game.add.text(
    1000,
    18,
    "Funds: " + BasicGame.TotalFunds,
    this.funds_style
  );

  this.hud.add(this.fundsInfo.totalFunds);
};

BasicGame.UI.prototype.UpdateFundsModal = function (TextInfo) {
  this.fundsInfo.totalFunds.setText("Funds: " + TextInfo);
};

BasicGame.UI.prototype.CloseTileImages = function () {
  BasicGame.CustomSignals.tile_MODAL_DISPLAY_OFF.dispatch();
};

BasicGame.UI.prototype.ViewTileImages = function () {
  BasicGame.CustomSignals.tile_MODAL_DISPLAY_ON.dispatch();
};

BasicGame.UI.prototype.CreateMyListModal = function () {
  this.modalListBg_tile = game.add.sprite(
    BasicGame.margins.left,
    80,
    "modal_nav"
  );
  this.listModaltitle = game.add.text(
    this.modalListBg_tile.x + 20,
    this.modalListBg_tile.y + 10,
    "My Ships",
    this.modalstyle
  );
  this.savedShipsList = game.add.group();

  this.savedShips.align(16, -1, 48, 48);

  this.savedShipsList.x = 64;
  this.savedShipsList.y = this.modalListBg_tile.y + 64;

  this.savedShipsList.sortGroup = () => {
    this.savedShipsList.align(1, -1, 208, 48);
  };

  this.savedShips.add(this.modalListBg_tile);
  this.savedShips.add(this.listModaltitle);
  this.savedShips.add(this.savedShipsList);
};

BasicGame.UI.prototype.ShowMyShipsModal = function () {
  BasicGame.CustomSignals.tile_MODAL_DISPLAY_OFF.dispatch();

  this.tiles.visible = false;

  this.savedShips.visible = true;
};

BasicGame.UI.prototype.CreateDynamicButton = function (
  buttonName,
  eventName,
  eventProperties,
  buttonSprite,
  buttonStyle,
  insertGroup
) {
  var buttonGroup = game.add.group();

  var uiButton = game.add.button(
    0,
    0,
    buttonSprite,
    this.ProcessButton,
    this,
    1,
    0,
    1,
    0
  );
  uiButton.id = buttonName;
  uiButton.buttonEvent = eventName;
  uiButton.eventParameter = eventProperties;
  uiButton.buttonStyle = buttonStyle;
  uiButton.insertGroup = insertGroup;

  var text = game.add.text(0, 0, buttonName, this[buttonStyle]);
  text.anchor.setTo(0.5, 0.5);
  text.x = uiButton.width / 2;
  text.y = uiButton.height / 2 + 4;

  buttonGroup.add(uiButton);
  buttonGroup.add(text);

  console.log(this[insertGroup]);

  this[insertGroup].add(buttonGroup);
  this[insertGroup].sortGroup();
};

BasicGame.UI.prototype.CreateHeaderModal = function () {
  var modalBG = game.add.sprite(0, 0, "header");

  this.header.add(modalBG);

  this.headerList.x = 20;
  this.headerList.y = 9;
  this.headerList.align(6, -1, 208, 48);

  this.headerList.sortGroup = () => {
    this.headerList.align(6, -1, 208, 48);
  };
};

BasicGame.UI.prototype.ShowNavModal = function () {
  BasicGame.editTools.shopOn = !BasicGame.editTools.shopOn;

  if (!BasicGame.editTools.shopOn) {
    this.createTools.visible = true;

    this.brands.visible = false;
    this.brandsList.visible = false;

    this.shopButton.frame = 19;

    this.EnableTouchArea();
  } else {
    this.brands.visible = true;

    this.brandsList.visible = true;

    this.createTools.visible = false;

    this.shopButton.frame = 18;

    this.DisableTouchArea();
  }
};

//////////////////////
//
//	Store
//
////////////////////

BasicGame.UI.prototype.CreateNavModal = function () {
  this.shopButton = game.add.button(
    8,
    80,
    "button_camera",
    this.ShowNavModal,
    this
  );
  this.shopButton.frame = 19;

  this.createMenu.add(this.shopButton);

  var modalBG = game.add.sprite(
    BasicGame.margins.left,
    80,
    "dockAtlas",
    "modalbg_shop.png"
  );
  modalBG.x = game.camera.x + (game.camera.width - modalBG.width) / 2;

  var modalTitle = game.add.text(
    modalBG.x + 32,
    modalBG.y + 16,
    "VENDORS",
    this.modalstyle24
  );

  var modalText = game.add.text(
    modalBG.x + 32,
    modalBG.y + 80,
    "Manufacturers",
    this.modalstyle
  );

  this.brandsList.x = modalBG.x + 32;
  this.brandsList.y = modalBG.y + 118;

  this.brandsList.align(8, -1, 192, 48);

  this.brands.add(modalBG);
  this.brands.add(modalText);
  this.brands.add(modalTitle);

  this.brands.visible = false;
  this.brandsList.visible = false;

  this.brandsList.sortGroup = () => {
    this.brandsList.align(6, -1, 192, 48);
  };

  this.brands.startAnimation = game.add
    .tween(this.brands)
    .to({ alpha: 1 }, 200, "Quart.easeIn");
};

BasicGame.UI.prototype.SortNavModal = function () {
  this.brandsList.align(6, -1, 208, 48);
};

BasicGame.UI.prototype.CreateButton = function (buttonID, insertGroup) {
  var buttonGroup = game.add.group();
  var buttonInfo = BasicGame.ButtonData[buttonID];

  var uiButton = game.add.button(
    0,
    0,
    buttonInfo.sprite,
    this.ProcessButton,
    this,
    buttonInfo.overFrame,
    buttonInfo.outFrame,
    buttonInfo.downFrame,
    buttonInfo.upFrame
  );
  uiButton.id = buttonInfo.id;
  uiButton.buttonEvent = buttonInfo.buttonEvent;
  uiButton.eventParameter = buttonInfo.eventParameter;

  uiButton.buttonTitle = buttonInfo.buttonTitle;
  uiButton.buttonDetail = buttonInfo.buttonDetail;

  var text = game.add.text(0, 0, buttonInfo.buttonText, this[buttonInfo.style]);
  text.anchor.setTo(buttonInfo.anchor, 0.5);

  if (buttonInfo.anchor === 0) {
    text.x = uiButton.x + 24;
  } else {
    text.x = uiButton.width / 2;
  }

  text.y = uiButton.height / 2 + 2;

  uiButton.events.onInputOver.add(() => {
    BasicGame.CustomSignals.update_TOOL_TIP.dispatch(
      uiButton.buttonTitle,
      uiButton.buttonDetail
    );
  });

  uiButton.events.onInputOut.add(() => {
    BasicGame.CustomSignals.close_TOOL_TIP.dispatch();
  });

  buttonGroup.add(uiButton);
  buttonGroup.add(text);

  this[insertGroup].add(buttonGroup);
  this[insertGroup].sortGroup();
};

BasicGame.UI.prototype.ProcessButton = function (Button) {
  var eventButton = Button.buttonEvent;

  if (eventButton) {
    console.log(Button.eventParameter);

    BasicGame.CustomSignals[eventButton].dispatch(Button.eventParameter);
  } else {
    console.log("No event present in this object");
  }

  var buttonTitle = Button.buttonTitle;

  if (buttonTitle) {
    BasicGame.CustomSignals.update_TOOL_TIP.dispatch(
      buttonTitle,
      Button.buttonDetail
    );
  }
};

BasicGame.UI.prototype.MoveCameraLeft = function () {
  game.camera.x -= 32;
};

BasicGame.UI.prototype.MoveCameraRight = function () {
  game.camera.x += 32;
};

BasicGame.UI.prototype.MoveCameraUp = function () {
  game.camera.y -= 32;
};

BasicGame.UI.prototype.MoveCameraDown = function () {
  game.camera.y += 32;
};

BasicGame.UI.prototype.CreateCameraPanZones = function () {
  var xPos;
  var yPos;
  var sprite;
  var camDirection;
  this.panControlGroup.alpha = 0.4;

  for (var i = 0; i < 4; i++) {
    if (i == 0) {
      // Up
      sprite = "cam_pan_top";
      camDirection = "MoveCameraUp";
      xPos = 0;
      yPos = 0;
    } else if (i == 1) {
      // Down
      camDirection = "MoveCameraDown";
      sprite = "cam_pan_top";
      xPos = 0;
      yPos = game.camera.height - 64;
    } else if (i == 2) {
      // Left
      sprite = "cam_pan_side";
      camDirection = "MoveCameraLeft";
      xPos = 0;
      yPos = 0;
    } else if (i == 3) {
      // Right
      sprite = "cam_pan_side";
      camDirection = "MoveCameraRight";
      xPos = game.camera.width - 64;
      yPos = 0;
    }

    var panSprite = game.add.sprite(xPos, yPos, sprite);

    panSprite.inputEnabled = true;

    panSprite.events.onInputOver.add(this[camDirection], this);
    panSprite.events.onInputDown.add(this[camDirection], this);

    this.panControlGroup.add(panSprite);
  }

  this.hud.add(this.panControlGroup);

  this.panControlGroup.visible = false;
};

BasicGame.UI.prototype.TogglePanControls = function () {
  this.panControlGroup.visible = !this.panControlGroup.visible;
  if (!this.panControlGroup.visible) {
    this.headerList.visible = true;
    BasicGame.CustomSignals.kill_PAINT_SPRITES.dispatch();
  } else {
    this.headerList.visible = false;
  }
  // this.headerList.visible = !this.headerList.visible;
};

BasicGame.UI.prototype.CreatCameraControls = function () {
  // This is now a camera toggle, cameraUp is a legacy name

  this.cameraUp = game.add.button(
    128 + 64,
    0,
    "button_camera",
    this.TogglePanControls,
    this,
    8,
    9,
    9,
    8
  );

  this.cameraButtons.add(this.cameraUp);

  this.cameraButtons.x = 1000;
  this.cameraButtons.y = 96;
};

BasicGame.UI.prototype.CloseModal = function (Button, b) {
  var modalID = Button.parentModal;

  console.log(Button, b);

  modalID.visible = false;
};

// Modal for the parts tiles, current set to 0 alpha (not visible)

BasicGame.UI.prototype.StartTileModal = function (ModalTitle) {
  this.ShowNavModal();
  this.tiles.visible = true;
  this.tiles.alpha = 0;

  this.tileModaltitle.setText(ModalTitle);

  this.tiles.startAnimation.start();
};

BasicGame.UI.prototype.CreateTileModal = function () {
  this.modalbg_tile = game.add.sprite(0, 565, "dockAtlas", "modalbg_tile.png");
  this.modalbg_tile.alpha = 0;

  this.tileModaltitle = game.add.text(
    this.modalbg_tile.x + 20,
    this.modalbg_tile.y + 18,
    "KUSANAGI",
    this.modalstyleLarge
  );
  this.tileModaltitle.alpha = 0.05;
  this.tileModalHeading = game.add.text(0, 0, "Modules", this.button1_style);
  this.tileModalHeading.anchor.setTo(0.5, 0);
  this.tileModalHeading.x = this.modalbg_tile.x + this.modalbg_tile.width / 2;
  this.tileModalHeading.y = this.modalbg_tile.y + 12;

  // this.modalCloseButton = game.add.button(350,220, 'close_modal', ()=>{
  // 	this.CloseModal(this.modalCloseButton);
  // 	BasicGame.CustomSignals.tile_MODAL_DISPLAY_OFF.dispatch();
  // }, this, 1, 0, 1, 0);
  // this.modalCloseButton.parentModal = this.tiles;

  this.tiles.add(this.modalbg_tile);
  this.tiles.add(this.tileModaltitle);
  // this.tiles.add(this.modalCloseButton);
  this.tiles.add(this.tileModalHeading);

  this.tiles.startAnimation = game.add
    .tween(this.tiles)
    .to({ alpha: 1 }, 200, "Quart.easeIn");

  this.tiles.visible = false;
};
