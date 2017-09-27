//Splash.js will be used to load the rest of our assets and show a progress bar as they are loaded.
//To keep things organized, we'll create specific functions that have single responsibilities. 
//To follow the single responsibility principal, let's create separate functions that load specific 
//types of media.


var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('gamemenu','js/states/GameMenu.js');
    game.load.script('gamestart', 'js/states/gamestart.js');
    //game.load.script('gameover','js/states/GameOver.js');
    //game.load.script('options', 'js/states/Options.js');
  },

  loadBgm: function () {
    game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
  },

  
  loadImages: function () {
    //game.load.image('menu-bg', 'assets/images/menu-bg.png');
  
     
  
  },


  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    //utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    game.scale.setScreenSize = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = "#020028";    
    //game.add.sprite(0, 0, 'stars');
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.logo).anchor.set(0.5);
    
    game.add.existing(this.loadingBar);
    game.add.existing(this.status).anchor.set(0.5);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    //this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("GameStart",GameStart);
    //game.state.add("GameOver",GameOver);
    //game.state.add("Options",Options);
  },

  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function() {
    this.status.setText('Ready!');
    //console.log("starting......");
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {game.state.start("GameMenu");}, 1000);

  }
};
