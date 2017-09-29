
var cursors;
var d;
var playSound = gameOptions.playSound,
playMusic = gameOptions.playMusic;

var style, cursors, speedX = 150,
speedY = 150,
vectorX = 1,
vectorY = 1,
angularMovement = 5,
currentNumber = 1;

var left = false, right = false, up = false, down = false;
var GameStart = function() {};


GameStart.prototype = {


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
   // game.load.image("ball", "assets/images/football.png");
   // game.load.image("goal", "assets/images/goal.png"); 

  game.scale.setScreenSize = true;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#020028";   

  game.stage.backgroundColor = '#007236';
  
  game.load.image("ball", "assets/images/football.png");
  game.load.image("goal", "assets/images/0.svg"); 
  game.load.audio("applause", "assets/bgm/applause4.mp3");
  game.load.image("arrow", "assets/images/arrow.png");
},

  create: function () {

    game.add.existing(this.titleText);
   

    //  Modify the world and camera bounds
    // game.world.setBounds(-2000, -2000, 4000, 4000);
    game.stage.backgroundColor = '#111111';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    ball = game.add.sprite(10, 10, "ball");
    createTarget();


    ball.body.velocity.setTo(100, 100);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);
    ball.scale.setTo(0.1, 0.1);
    ball.anchor.setTo(0.5, 0.5);


    button_x = game.width - 130;
    button_y = game.height - 130;
    button_up = game.add.button(button_x, button_y, "arrow", null, this);
    button_up.scale.setTo(0.5);
    button_up.anchor.setTo(0.5, 0.5);
    button_up.events.onInputOver.add(function(){up=true;});
    button_up.events.onInputOut.add(function(){up=false;});
    button_up.events.onInputDown.add(function(){up=true;});
    button_up.events.onInputUp.add(function(){up=false;});
    
    button_y += 72;
    button_down = game.add.button(button_x, button_y, "arrow", null, this);
    button_down.scale.setTo(0.5);
    button_down.anchor.setTo(0.5, 0.5);
    button_down.angle = 180;
    button_down.events.onInputOver.add(function(){down=true;});
    button_down.events.onInputOut.add(function(){down=false;});
    button_down.events.onInputDown.add(function(){down=true;});
    button_down.events.onInputUp.add(function(){down=false;});

    button_x -= 72;    
    button_left = game.add.button(button_x, button_y, "arrow", null, this);
    button_left.scale.setTo(0.5);
    button_left.anchor.setTo(0.5, 0.5);
    button_left.angle = 270;
    button_left.events.onInputOver.add(function(){left=true;});
    button_left.events.onInputOut.add(function(){left=false;});
    button_left.events.onInputDown.add(function(){left=true;});
    button_left.events.onInputUp.add(function(){left=false;});
    
    button_x += 144;
    button_right = game.add.button(button_x, button_y, "arrow", null, this);
    button_right.scale.setTo(0.5);
    button_right.anchor.setTo(0.5, 0.5);
    button_right.angle = 90;
    button_right.events.onInputOver.add(function(){right=true;});
    button_right.events.onInputOut.add(function(){right=false;});
    button_right.events.onInputDown.add(function(){right=true;});
    button_right.events.onInputUp.add(function(){right=false;});    
  },

  update: function() {
    playerUpdate();
}
// ,
// render: function(){

        
//             game.debug.bodyInfo(goal, 32, 32);
        
//             game.debug.body(goal);
//             game.debug.body(ball);
// }
}
    

function createTarget() {
    style = { font: "32px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: ball.width, align: "center"};

    var x = game.rnd.integerInRange(50, 700);
    var y = game.rnd.integerInRange(50, 500);
    console.log("x: ", x, 'y: ', y);
    goal = game.add.sprite(x, y, "goal");
    //goal.scale.setTo(0.1, 0.1);
    //goal.scale.setTo(0.7);    
    TargetGroup = game.add.group();
    TargetGroup.add(goal);    
    game.physics.enable([ball, goal], Phaser.Physics.ARCADE);
    
    text = game.add.text(goal.x+goal.width/2 ,goal.y+goal.height/2,currentNumber, style);
    text.anchor.setTo(0.5);
    TargetGroup.add(text);
    //  This adjusts the collision body size to be a 100x100 circle.
    //  next 2 parameters are the X and Y offset of the newly sized circle.
    
    goal.body.setSize(goal.width/2, goal.height/2, goal.width/4, goal.height/4);
    //goal.body.setCircle(100, 365, 225)
    //console.log("w: ", goal.width/2, 'h: ', goal.height/2);
    goal.body.immovable = true;
}

function playerUpdate() {

    game.physics.arcade.overlap(goal, ball, handleOverlap, null, this);

    if (cursors.left.isDown || left) {
        ball.body.velocity.setTo(-200, 0);
        angularMovement = -5;
    } else if (cursors.right.isDown || right) {
        ball.body.velocity.setTo(200, 0);
        angularMovement = 5;
    } else if (cursors.up.isDown || up) {
        ball.body.velocity.setTo(0, -200);
        angularMovement = -5;
    } else if (cursors.down.isDown || down) {
        ball.body.velocity.setTo(0, 200);
        angularMovement = 5;
    }
    ball.angle += angularMovement;
}

function handleOverlap(goal, ball){
    console.log("playSound: ", playSound);
    if (playSound == false) {
        music.stop();
      }
      else {
        var snd = game.add.audio("applause");
	//	And this defines the markers.
	//	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.

    snd.addMarker("appl1", 1, 2);

        snd.play("appl1");
        
      } ; 

   //var killTween = game.add.tween(goal.scale);
    //to(properties, duration, ease, autoStart, delay, repeat, yoyo) 
    //killTween.to({x:0.2,y:0.2}, 500, Phaser.Easing.Quadratic.Out); 
    //killTween.to( { x:0, y:0 }, 2000, Phaser.Easing.Linear.None);

    //killTween.to({x:0}, 500, Phaser.Easing.Quadratic.Out);
    //killTween.to( { x:1, y:43 }, 500, Phaser.Easing.Linear.None);
    var killTween = game.add.tween(TargetGroup);
    //  We will use the same reference over each time, rather than creating new ones
    killTween.to( { x:-TargetGroup.centerX + 50*currentNumber, y: -TargetGroup.centerY + game.world.height - 50 }, 2000, Phaser.Easing.Bounce.Out,true);
    killTween.onComplete.addOnce(function(){
        //goal.body = null;        
        //goal.destroy();
    }, this);
    killTween.start();
    //text.destroy();
    currentNumber++;
    createTarget();
}


