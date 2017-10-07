
var cursors;
var d;
var playSound = gameOptions.playSound,
    playMusic = gameOptions.playMusic;
var GAME_BOUND_X = 0,
    GAME_BOUND_Y = 75,
    GAME_BOUND_WIDTH = 1020,
    GAME_BOUND_HEIGHT = 580,
    SCORE_X = 1200,
    SCORE_Y = 150;

//Variable to track the last event and time elapsed
var lastEventTrackedTime, elapsedTime;

var NAVIGATION_BUTTON_X = game.width - 180,
    NAVIGATION_BUTTON_Y = game.height - 130;
    
    var bounds;


//Keep track of the users score
//score is the players actual score, and the scoreBuffer is how many points the player has
// that need to be “animated” into the main score. 

var score = 0;
var scoreBuffer = 0;    

var style, cursors, speedX = 150,
speedY = 150,
vectorX = 1,
vectorY = 1,
angularMovement = 5,
currentNumber = 1;
var targetprevX, targetprevY;

var left = false, right = false, up = false, down = false;
var gameStart = function() {};


gameStart.prototype = {


  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = false;
    var screenDims = Utils.ScreenUtils.screenMetrics;
    if (this.game.device.desktop) {
        console.log("DESKTOP");
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
    else {
        console.log("MOBILE");
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
    }
    console.log(screenDims);

    // this.titleText = game.make.text(game.world.centerX, 20, 'Game Title', {
    //   font: 'bold 30pt TheMinion',
    //   fill: 'white',
    //   align: 'center'
    // });
    // this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    // this.titleText.anchor.set(0.5);

  },

preload: function(){
   // game.load.image('ball', 'gameassets/images/football.png');
   // game.load.image('goal', 'gameassets/images/goal.png'); 

  game.scale.setScreenSize = true;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.load.image('gameBackground', 'gameassets/images/game_bgnd.png');
  game.load.image('explosion', 'gameassets/images/fission.png');

  game.load.image('ball', 'gameassets/images/football.png');
  game.load.image('goal', 'gameassets/images/0.svg'); 
  game.load.image('goal0', 'gameassets/images/0.png'); 
  game.load.image('goal1', 'gameassets/images/1.png'); 
  game.load.image('goal2', 'gameassets/images/2.png'); 
  game.load.image('goal3', 'gameassets/images/3.png'); 
  game.load.image('goal4', 'gameassets/images/4.png'); 
  game.load.image('goal5', 'gameassets/images/5.png'); 
  game.load.image('goal6', 'gameassets/images/6.png'); 
  game.load.image('goal7', 'gameassets/images/7.png'); 
  game.load.image('goal8', 'gameassets/images/8.png'); 
  game.load.image('goal9', 'gameassets/images/9.png'); 
  
  game.load.audio('applause', 'gameassets/bgm/applause4.mp3');
  game.load.image('arrow', 'gameassets/images/arrow.png');
},

  create: function () {

    // Display background
        //  Use window.screen.width for device width and window.screen.height for device height. 
    //  .availWidth and .availHeight give you the device size minus UI taskbars. (Try on an iPhone.) 
    //  Device size is static and does not change when the page is resized or rotated.
    this.bg =  game.add.sprite(0, 0,  'gameBackground');
    //game.add.existing(this.titleText);
    this.bg.width = window.outerWidth;
     //game.world._height = window.outerHeight;
    this.bg.height = window.outerHeight;
    this.bg.alpha = 125;
    //game.world.setBounds(0, 0, 1025, 650);
    
    // this.bg.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
    // this.bg.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // this.game.scale.refresh();

    //  Modify the world and camera bounds
    // game.world.setBounds(-2000, -2000, 4000, 4000);
    //game.stage.backgroundColor = '#111111';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //setting the collision bounds
    game.physics.arcade.setBounds(GAME_BOUND_X, GAME_BOUND_Y, GAME_BOUND_WIDTH, GAME_BOUND_HEIGHT);
     //  The bounds of our physics simulation
    bounds = new Phaser.Rectangle(GAME_BOUND_X, GAME_BOUND_Y, GAME_BOUND_WIDTH, GAME_BOUND_HEIGHT);
     //  Just to display the bounds
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.drawRect(0, 0, bounds.width, bounds.height);

    cursors = game.input.keyboard.createCursorKeys();

    ball = game.add.sprite(10, 10, 'ball');
    createTarget();


    ball.body.velocity.setTo(100, 100);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);
    ball.scale.setTo(0.1, 0.1);
    ball.anchor.setTo(0.5, 0.5);


    upButton = game.add.button(NAVIGATION_BUTTON_X, NAVIGATION_BUTTON_Y, 'arrow', null, this);
    upButton.scale.setTo(0.5);
    upButton.anchor.setTo(0.5, 0.5);
    upButton.events.onInputOver.add(function(){up=true;});
    upButton.events.onInputOut.add(function(){up=false;});
    upButton.events.onInputDown.add(function(){up=true;});
    upButton.events.onInputUp.add(function(){up=false;});
    
    downButton = game.add.button(NAVIGATION_BUTTON_X, NAVIGATION_BUTTON_Y + 72, 'arrow', null, this);
    downButton.scale.setTo(0.5);
    downButton.anchor.setTo(0.5, 0.5);
    downButton.angle = 180;
    downButton.events.onInputOver.add(function(){down=true;});
    downButton.events.onInputOut.add(function(){down=false;});
    downButton.events.onInputDown.add(function(){down=true;});
    downButton.events.onInputUp.add(function(){down=false;});
    
    leftButton = game.add.button(NAVIGATION_BUTTON_X - 72, NAVIGATION_BUTTON_Y + 72, 'arrow', null, this);
    leftButton.scale.setTo(0.5);
    leftButton.anchor.setTo(0.5, 0.5);
    leftButton.angle = 270;
    leftButton.events.onInputOver.add(function(){left=true;});
    leftButton.events.onInputOut.add(function(){left=false;});
    leftButton.events.onInputDown.add(function(){left=true;});
    leftButton.events.onInputUp.add(function(){left=false;});
    
    rightButton = game.add.button(NAVIGATION_BUTTON_X + 72, NAVIGATION_BUTTON_Y + 72, 'arrow', null, this);
    rightButton.scale.setTo(0.5);
    rightButton.anchor.setTo(0.5, 0.5);
    rightButton.angle = 90;
    rightButton.events.onInputOver.add(function(){right=true;});
    rightButton.events.onInputOut.add(function(){right=false;});
    rightButton.events.onInputDown.add(function(){right=true;});
    rightButton.events.onInputUp.add(function(){right=false;});

    //Scoring Code
    
       //Create the score label
       createScore();

  },

  //update method in Phaser,  is called on loop throughout your game to update things.
  update: function() {
    playerUpdate();


       //While there is score in the score buffer, add it to the actual score
       if(scoreBuffer > 0){
           incrementScore();
           scoreBuffer--;
       }
}
,
render: function(){

        
            // game.debug.bodyInfo(ball, 32, 32);
        
            // game.debug.body(goal);
            // game.debug.body(ball);
}
}
    

function createTarget() {
    style = { font: '32px Arial', fill: '#fff', wordWrap: true, wordWrapWidth: ball.width, align: 'center'};

    //console.log('boundx: ', bounds.x + 50, 'boundwidth: ', bounds.x + bounds.width - 50);
    //console.log('boundx: ', bounds.y + 50, 'boundheight: ', bounds.y + bounds.height - 50);    
    var x = game.rnd.integerInRange(bounds.x + 50, bounds.x + bounds.width - 50);
    var y = game.rnd.integerInRange(bounds.y + 50, bounds.y + bounds.height - 50);
    console.log('x: ', x, 'y: ', y);
    //following code is to avoid too much proximity between two consecutive targets
    if (game.math.difference(x, targetprevX) <= 100 && game.math.difference(y, targetprevY) <= 100) {
        //console.log('diffx: ', x, 'prevx: ', targetprevX);
        //console.log('diffy: ', y, 'prevy: ', targetprevY);
        if (x+200 > bounds.x + bounds.width) {
            x -= 150;
        }
        else{
            x += 150;
        }
        if (y+200 > bounds.y + bounds.height) {
            y -= 150;
        }
        else{
            y += 150;
        }    
        //console.log('1stHit: ', x, 'y: ', y);   
    }


    var spriteimage = 'goal' + currentNumber;
    goal = game.add.sprite(x, y, spriteimage);
    goal.scale.setTo(0.5, 0.5);
    goal.anchor.setTo(0.5);
    TargetGroup = game.add.group();
    TargetGroup.add(goal);    
    game.physics.enable([ball, goal], Phaser.Physics.ARCADE);

    //text = game.add.text(goal.x+goal.width/2 ,goal.y+goal.height/2,currentNumber, style);
    //text.anchor.setTo(0.5);
    //TargetGroup.add(text);
    //  This adjusts the collision body size to be a 100x100 circle.
    //  next 2 parameters are the X and Y offset of the newly sized circle.
    
    goal.body.setSize(goal.width/2, goal.height, goal.width/2, goal.height/2);
    //console.log('w4: ', goal.width, 'h4: ', goal.height);
    //goal.body.setCircle(100,  goal.centerX , goal.centerY)
    //console.log('w: ', goal.width/2, 'h: ', goal.height/2);
    goal.body.immovable = true;
    targetprevX = x;
    targetprevY = y;
    lastEventTrackedTime = game.time.time;
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
    // else {
    //     if (ball.body.velocity.x > 0){
    //     ball.body.acceleration.x -= 10;
    //     } else if (ball.body.velocity.x < 0){
    //         ball.body.acceleration.x += 10;
    //     }
    //     if (ball.body.velocity.y > 0){
    //         ball.body.acceleration.y -= 10;
    //         }
    //     angularMovement = 0;
    // }
    ball.angle += angularMovement;
    
}

function handleOverlap(goal, ball){
    //console.log('playSound: ', playSound);
    elapsedTime = game.time.elapsedSecondsSince(lastEventTrackedTime);



        
    if (playSound == false) {
        music.stop();
      }
      else {
        var snd = game.add.audio('applause');
	//	And this defines the markers.
	//	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.

        snd.addMarker('appl1', 1, 2);
        snd.play('appl1');
        
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

    console.log('elapsed tile: ', game.math.roundTo(elapsedTime));
   
     
    var newScore = 5;
    
    if (newScore - game.math.roundTo(elapsedTime) <= 0) {
        newScore = 1;
    }
    else{
        newScore = newScore - game.math.roundTo(elapsedTime);
    }

    if (newScore >= 2) {
        emitter = game.add.emitter(1200, 100, 100);
        
            emitter.makeParticles('explosion');
            emitter.minParticleSpeed.setTo(-300, 30);
            emitter.maxParticleSpeed.setTo(300, 100);
            emitter.minParticleScale = 0.05;
            emitter.maxParticleScale = 0.1;
            emitter.gravity = 250;
            //flow(lifespan, frequency, quantity, total, immediate)
            emitter.flow(1000, 500, 5, 10, true);
    }
    this.createScoreAnimation(TargetGroup.centerX, TargetGroup.centerY, '+'+newScore, newScore);
    

    //text.destroy();
    currentNumber++;
    createTarget();
}


function createScore(){
    
       var me = this;
       var scoreFont = "100px Arial";
    
       //Create the score label, setting score intial value to “0”.
       scoreLabel = this.game.add.text(SCORE_X, SCORE_Y, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15});
       scoreLabel.anchor.setTo(0.5, 0);
       scoreLabel.align = 'center';
    
       //Create a tween to grow / shrink the score label
       // set up a tween, this tween will make the score label grow to 1.5x it’s original size 
       //(we are tweening the labels scale property to do this) and then shrink back down to it’s original size. 
       //This tween won’t do anything yet, but we will be able to trigger it later.

       scoreLabelTween = this.game.add.tween(scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
    
   }

   function incrementScore(){
    //This function just increases the score by one and updates the text label accordingly.
    
       //Increase the score by one and update the total score label text
       score += 1;  
       scoreLabel.text = score;     
    
   }

   //function called createScoreAnimation which will allow us to trigger the animation from any coordinates in 
   //the game, add a message that will be displayed to the user, and provide the score to be added to the main score.

   function createScoreAnimation(x, y, message, score){
    
       var me = this;
    
       var scoreFont = "90px Arial";
    
       //Create a new label for the score
       var scoreAnimation = this.game.add.text(x, y, message, {font: scoreFont, fill: "#39d179", stroke: "#ffffff", strokeThickness: 15});
       scoreAnimation.anchor.setTo(0.5, 0);
       scoreAnimation.align = 'center';
    
       //Tween this score label to the total score label
       var scoreTween = this.game.add.tween(scoreAnimation).to({x:SCORE_X, y: SCORE_Y}, 800, Phaser.Easing.Exponential.In, true);
    
       //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
       scoreTween.onComplete.add(function(){
           scoreAnimation.destroy();
           scoreLabelTween.start();
            scoreBuffer += score;
       }, this);
   }



