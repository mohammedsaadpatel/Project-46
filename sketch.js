var player1,player2;
var player1kick,player1stand,player2stand,player2punch;
var player1sound,player2sound;
var wall1,wall2,wallGroup;
var bgImg,stflogo;
var heartImage, powerImage;
var controlButton,controlsImage,controlline,controllineImage;

var GameState = 0;


var life1 = 185

var life2 = 185

function preload(){
  player1stand = loadImage("assets/assassin.png");
  player1kick = loadImage("assets/assassin2.png");
  player1sound = loadSound("kick.mp3");

  player2stand = loadImage("assets/boxer1.png");
  player2punch = loadImage("assets/boxer2.png");
  player2sound = loadSound("punch.wav");

  bgImg = loadImage("assets/backgroundimg.jpg");
  stflogo = loadImage("assets/Street_Fighter_Logo.png")
  
  playButtonImg = loadImage("assets/btn_en.png")

  heartImage = loadImage("assets/life.png")

  powerImage = loadImage("assets/power.png")

  controlsImage = loadImage("assets/controlicon.png")
  controllineImage = loadImage("assets/ctrlm.png")

  backButtonImage = loadImage("assets/backbutton.png")

  knifeImage = loadAnimation("assets/knife.png" , "assets/knife2.png" , "assets/knife3.png")
  fireballImage = loadImage("assets/fireball.png")
}

function setup() 
{
  createCanvas(1000,500);

  wallGroup = new Group();

  //logo
  logo =createSprite(500,80,10,10)
  logo.addImage(stflogo);
  logo.scale = 0.7

  //PLAYERS
  player1 = createSprite(200,300,20,20)
  player1.addImage(player1stand);
  player1.scale = 0.40;
  player1.visible = false;

  player2 = createSprite(800,300,20,20)
  player2.addImage(player2stand)
  player2.scale = 0.35;
  player2.visible = false;


  //WALLS
  wall1 = createSprite(960,250,40,500)
  wall1.visible = false;
  wallGroup.add(wall1)

  wall2 = createSprite(40,250,2,500)
  wall2.visible = false;
  wallGroup.add(wall2)

  //playButton
  playButton = createSprite(500,250)
  playButton.addImage(playButtonImg)
  playButton.scale = 0.5

  controlButton = createSprite(500,400)
  controlButton.addImage(controlsImage)
  controlButton.scale = 0.3

  controlline = createSprite(500,300)
  controlline.addImage(controllineImage)
  controlline.scale = 0.7
  controlline.visible = false;

  backButton = createSprite(100,100)
  backButton.addImage(backButtonImage)
  backButton.scale = 0.2
  backButton.visible = false;

  knifeGroup = createGroup()
  fireballGroup = createGroup()

}

function draw() 
{
  background(bgImg);

  if(mousePressedOver(controlButton)){
   playButton.visible = false 
   controlButton.visible = false 
   controlline.visible = true;
   backButton.visible = true;
  }
  
  if(mousePressedOver(backButton)){
    playButton.visible = true; 
    controlButton.visible = true; 
    controlline.visible = false;
    backButton.visible = false;
   }

  if(mousePressedOver(playButton)){
    GameState = 1
  }
  
  if(GameState == 1){

    player1.visible = true
    player2.visible = true

    controlButton.visible = false; 
    playButton.visible = false

    //PLAYER1 CONTROLS :-
    if(keyDown("A")){
      player1.x= player1.x-8;
    }

    if(keyDown("S")){
      player1.x= player1.x+8;
    }
    
    //player1 kick
    if(keyDown("D")){
      player1.addImage(player1kick)
      spawnKnife()
      player1sound.play();
      setTimeout(function(){
        player1.addImage(player1stand)
      }, 200);
      setTimeout(function(){
        player1sound.stop();
      }, 800);
    }

    //PLAYER2 CONTROLS :-
   
    if(keyDown("K")){
      player2.x= player2.x-8;
    }

    if(keyDown("L")){
      player2.x= player2.x+8;
    }

    //player2 punch
    if(keyDown("J")){
      player2.addImage(player2punch)
      spawnFireball()
      player2sound.play();

      setTimeout(function(){
        player2.addImage(player2stand)
      }, 150);

      setTimeout(function(){
        player2sound.stop();
      }, 800);

    }

    // ------------------------- Heart Bar for player1 -------------------------
    push();
    image(heartImage , 50, 50 , 20, 20);
    fill("white");
    rect(100 , 50 , 180, 20);
    fill("#f50057");
    rect(100 , 50 , life1 , 20);
    noStroke();
    pop();

    // ------------------------- Heart Bar for player2 -------------------------
    push();
    image(heartImage , width - 300 , 50 , 20, 20);
    fill("white");
    rect(width - 250 , 50 , 180, 20);
    fill("#f50057");
    rect(width - 250  , 50 , life2 , 20);
    noStroke();
    pop();

    // ------------------------- Power Bar for player1 -------------------------
    push();
    image(powerImage, 50 , 100 , 30, 30);
    fill("white");
    rect(100, 100 , 180, 20);
    fill("#ffc400");
    rect(100, 100 , 180 , 20);
    noStroke();
    pop();
    
    // ------------------------- Power Bar for player2 -------------------------
    push();
    image(powerImage, width - 300, 100 , 30, 30);
    fill("white");
    rect(width - 250 , 100, 180, 20);
    fill("#ffc400");
    rect(width - 250 , 100,  180 , 20);
    noStroke();
    pop();

    //----------------------------------- block to check if knife killing player2 ----------------------------------
    if(knifeGroup.isTouching(player2)){

      for(var i = 0 ; i < knifeGroup.length ; i++){
        if(knifeGroup[i].isTouching(player2)){

          knifeGroup[i].destroy()
          life2 -= 185/16
        }
      }
    }

    //----------------------------------- block to check if fireball killing player1 ----------------------------------
    if(fireballGroup.isTouching(player1)){

      for(var i = 0 ; i < fireballGroup.length ; i++){
        if(fireballGroup[i].isTouching(player1)){

          fireballGroup[i].destroy()
          life1 -= 185/16
        }
      }
    }

    // ---------------------------- knife vs fireball ----------------------
  
    if(fireballGroup.isTouching(knifeGroup)){

      for(var i = 0 ; i < fireballGroup.length ; i++){
        if(fireballGroup[i].isTouching(knifeGroup)){

          fireballGroup.destroyEach()
          knifeGroup.destroyEach()
        }
      }
    }
  }
  
  player1.collide(wallGroup);
  player2.collide(wallGroup);

   drawSprites();
}

function spawnKnife(){

  knife = createSprite(player1.x , player1.y-70)
  knife.addAnimation("knife" , knifeImage)
  knife.velocityX = 7
  knife.scale = 0.15

  knifeGroup.add(knife)
}

function spawnFireball(){

  fireball = createSprite(player2.x , player2.y-70)
  fireball.addImage(fireballImage)
  fireball.velocityX = -7
  fireball.scale = 0.15
  
  fireballGroup.add(fireball)

}