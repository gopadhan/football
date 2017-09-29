var playSound = gameOptions.playSound,
playMusic = gameOptions.playMusic;
var musicButton, sounfButton;

var GameMenu = function() {};


GameMenu.prototype = {


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 20, "Game Title", {
      font: 'bold 30pt TheMinion',
      fill: 'white',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);

  },

preload: function(){
  game.load.image("playbutton", "assets/images/playbutton.png");
  game.load.image("menubutton", "assets/images/menubutton.png");
  game.load.image("resetgame", "assets/images/resetgame.png");
  game.load.image("thankyou", "assets/images/thankyou.png"); 

  
  //game.load.spritesheet("musiconoff", "assets/images/musiconoff.png", 33,33);
  game.load.spritesheet("musiconoff", "assets/images/musiconoff.png", 100, 100);
  game.load.spritesheet("soundonoff", "assets/images/soundonoff.png", 100, 100);
  
  game.scale.setScreenSize = true;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#020028";     
},

  create: function () {

    game.add.existing(this.titleText);
    
    var playButton = game.add.button(game.width / 2, game.height / 2, "playbutton", function(){game.state.start("GameStart");});
    playButton.anchor.set(0.5);
    playButton.scale.set(0.4);

   
        
    musicButton = game.add.button(game.width - 30, 30, "musiconoff" , MusicOnOffClick); 
    musicButton.anchor.set(0.5);
    musicButton.scale.set(0.33);
    //playMusic = !playMusic;
    musicButton.frame = playMusic ? 0 : 1;
    SoundButton = game.add.button(game.width - 30, 75, "soundonoff" , SoundOnOffClick);
    SoundButton.anchor.set(0.5); 
    SoundButton.scale.set(0.33);
    //playSound = !playSound;
    SoundButton.frame = playSound ? 0 : 1;       
  
    menuGroup = game.add.group();
    var menuButton = game.add.button(20, game.height / 2, "menubutton", toggleMenu);
    menuButton.anchor.set(0.5);
    menuButton.scale.set(0.8);
    menuGroup.add(menuButton);
    var resetGame = game.add.button(-100, game.height / 2 - 25, "resetgame", function(){game.state.start("Options");});
    resetGame.anchor.set(0.5);
    resetGame.scale.set(0.7);
    menuGroup.add(resetGame);
    var thankYou = game.add.button(-100, game.height / 2 + 25, "thankyou", function(){game.state.start("GameOver");});
    thankYou.anchor.set(0.5);
    thankYou.scale.set(0.7);
    menuGroup.add(thankYou); 
    
    
    if (music.name !== "dangerous" && playMusic) {
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
  SoundButton.frame = playSound ? 0 : 1;
  if (playSound == false) {
    music.stop();
  }
  else {
    music.play();
  }  
}