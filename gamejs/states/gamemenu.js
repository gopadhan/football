var playSound = gameOptions.playSound,
playMusic = gameOptions.playMusic;
var musicButton, soundButton;

var gameMenu = function() {};


gameMenu.prototype = {


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 20, 'Game Title', {
      font: 'bold 30pt TheMinion',
      fill: 'white',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);

  },

preload: function(){
  game.load.image('playButton', 'gameassets/images/playbutton.png');
  game.load.image('menuButton', 'gameassets/images/menubutton.png');
  game.load.image('resetGame', 'gameassets/images/resetgame.png');
  game.load.image('thankYou', 'gameassets/images/thankyou.png'); 

  
  //game.load.spritesheet('musiconoff', 'gameassets/images/musiconoff.png', 33,33);
  game.load.spritesheet('musicOnOff', 'gameassets/images/musiconoff.png', 100, 100);
  game.load.spritesheet('soundOnOff', 'gameassets/images/soundonoff.png', 100, 100);
  
  //game.scale.setScreenSize = true;
  //game.scale.pageAlignHorizontally = true;
  //game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#020028';     
},

  create: function () {

    game.add.existing(this.titleText);
    
    var playButton = game.add.button(game.width / 2, game.height / 2, 'playButton', function(){game.state.start('gameStart');});
    playButton.anchor.set(0.5);
    playButton.scale.set(0.4);

   
        
    musicButton = game.add.button(game.width - 30, 30, 'musicOnOff' , MusicOnOffClick); 
    musicButton.anchor.set(0.5);
    musicButton.scale.set(0.33);
    //playMusic = !playMusic;
    musicButton.frame = playMusic ? 0 : 1;
    soundButton = game.add.button(game.width - 30, 75, 'soundOnOff' , SoundOnOffClick);
    soundButton.anchor.set(0.5); 
    soundButton.scale.set(0.33);
    //playSound = !playSound;
    soundButton.frame = playSound ? 0 : 1;       
  
    menuGroup = game.add.group();
    var menuButton = game.add.button(20, game.height / 2, 'menuButton', toggleMenu);
    menuButton.anchor.set(0.5);
    menuButton.scale.set(0.8);
    menuGroup.add(menuButton);
    var resetGame = game.add.button(-100, game.height / 2 - 25, 'resetGame', function(){game.state.start('options');});
    resetGame.anchor.set(0.5);
    resetGame.scale.set(0.7);
    menuGroup.add(resetGame);
    var thankYou = game.add.button(-100, game.height / 2 + 25, 'thankYou', function(){game.state.start('gameOver');});
    thankYou.anchor.set(0.5);
    thankYou.scale.set(0.7);
    menuGroup.add(thankYou); 
    
    
    if (music.name !== 'dangerous' && playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }


  }
}


function toggleMenu(){
  
  if(menuGroup.x == 0){
    //A Tween allows you to alter one or more properties of a target object over a defined period of time. This can be used for things such as alpha fading Sprites, scaling them or motion. 
    //to(properties, duration, ease, autoStart, delay, repeat, yoyo) → {Phaser.Tween}
       var menuTween = game.add.tween(menuGroup).to({
            x: 220     
       }, 500, Phaser.Easing.Liner, true);    
  }
  if(menuGroup.x == 220){
       var menuTween = game.add.tween(menuGroup).to({
            x: 0    
       }, 500, Phaser.Easing.Liner, true);     
  }
}

function MusicOnOffClick(){  
  playMusic = !playMusic;
  musicButton.frame = playMusic ? 0 : 1;
  if (playMusic == false) {
    music.stop();
  }
  else {
    music.play();
  }
}

function SoundOnOffClick(){
  playSound = !playSound;
  soundButton.frame = playSound ? 0 : 1;
  if (playSound == false) {
    music.stop();
  }
  else {
    music.play();
  }  
}