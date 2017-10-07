// Constants
var GAME_WIDTH = window.innerWidth * window.devicePixelRatio; //800;
var GAME_HEIGHT = window.innerHeight * window.devicePixelRatio; //600;

var game;

var gameOptions = {
      playSound: true,
      playMusic: true
	};
	

	//bring Phaser to life by creating an instance of a Phaser.Game object and assigning it to a 
//global variable called 'game', The third parameter can be either Phaser.CANVAS, Phaser.WEBGL, 
//or Phaser.AUTO. This is the rendering context that you want to use
//4h parameter is id of the DOM element in which you would like to insert the canvas element that Phaser creates.


window.onload = function() {	   
  var screenDims = Utils.ScreenUtils.calculateScreenMetrics(GAME_WIDTH, GAME_HEIGHT, 1 /* LANDSCAPE */);
     
  game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'game');
    
    game.state.add("Main", main);
    //Start the first state          
    game.state.start("Main");
  }


////////////////////////////////////////////////////////////////////////////////

var main = function(game){};

main.prototype = {

    //Phaser automatically look preload function when it starts and load anything defined within it.
    //we're going to load everything we need to show our cool splash screen, then we'll use the state system to switch to our awesome splash screen once it is ready.
    preload: function () {
      //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //game.scale.setScreenSize = true;
      //game.scale.pageAlignHorizontally = true;
      //game.scale.pageAlignVertically = true;
      //game.stage.backgroundColor = "#020028";
      game.load.script('splash',  'gamejs/states/splash.js');
      game.load.image('loading',  'gameassets/images/loading.png');
	    game.load.image('brand',    'gameassets/images/logo.png');
      
    },

    create: function () {
      game.state.add('splash', splash);
      game.state.start('splash');
    }  
}

