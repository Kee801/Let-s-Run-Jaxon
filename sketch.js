var road;
var Road_Img;
var player;
var player_animation;
var left_edge;
var right_edge;
var alien;
var alien_img;
var border;
var border_img;
var bullet;
var bottom_edge;
var gameState = "start";
var song;
var beep;
var lost;
var controls;
var controls_img;
var gameover;
var gameover_img;



function preload(){
  //pre-load images
  road_img = loadAnimation("path.png");

  player_animation = loadAnimation("Runner-1.png", "Runner-2.png");
  player_animation.frameDelay = 15;

  alien_img = loadAnimation("Alien 2.png");

  border_img = loadAnimation("border.png");

  song = loadSound("start epic song.mp3");

  beep = loadSound("beep (mp3cut.net).mp3");

  lost = loadSound("loast.wav");

  controls_img = loadAnimation("controls2.png");

  gameover_img = loadAnimation("Game Over!.png");
}

function setup(){
  createCanvas(1530,750);
  //create sprites here
  song.loop();
  road = createSprite(765, 375);
  road.addAnimation("road_img", road_img);
  road.scale = 1.5;
  road.velocityY = 10;


  player = createSprite(765, 675);
  player.addAnimation("player_animation", player_animation);
  player.scale = 0.09;

  left_edge = createSprite(535, 375, 30, 780);
  left_edge.visible = false;

  bottom_edge = createSprite(765, 790, 380, 30);

  right_edge = createSprite(1010, 375, 30, 780);
  right_edge.visible = false;



  border = createSprite(770, 675, 400, -10);
  border.visible = false;

  bullet = createSprite(3000,player.y,10,50);
  bullet.visible = false;



  edges = createEdgeSprites();
  


  alien = createSprite(random(655, 900)-5);
  alien.velocityY = 0;
  alien.addAnimation("alien_img", alien_img);
  alien.scale = 0.4; 

  controls = createSprite(765, 375);
  controls.addAnimation("controls_img", controls_img);
  controls.visible = false;

  gameover = createSprite(765, 375);
  gameover.addAnimation("gameover_img", gameover_img);
  gameover.visible = false;
}



function draw() {
  background("white");

  if(gameState == "start")
  {
    controls.visible = true;
    alien.visible = false;
  }

  if(keyDown("up"))
  {

    gameState = "currently playing";
    controls.visible = false;
    alien.velocityY = 30;
    alien.visible = true;

  }

  if(gameState == "currently playing")
  {
    if(road.y >700)
    {
      road.y = road.width/2;
    }
    if(keyDown("left"))
    {
      player.x = player.x - 10;
    }
    if(keyDown("right"))
    {
       player.x = player.x+10;
    }


    if(bullet.collide(alien))
    {
      beep.play();
      bullet.visible = false;
      bullet.x = 3000;
      bullet.y = player.y;
      bullet.velocityY = 0;
      alien.y = random(-750);
      alien.x = random(655, 900);
     }

    if(alien.isTouching(bottom_edge))
    {
      lost.play();  
  
      alien.x = 765;
      alien.y = 475;
      alien.velocityY = 0;
      gameState = "end";
    }
    if(keyDown("space"))
    {
      bullet.x = player.x;
      bullet.y = player.y;
      bullet.visible = true;
      bullet.velocityY = -15;
    }

    if(bullet.isTouching(edges[2]))
    {
      bullet.x = 3000;
      bullet.y = player.y;
      bullet.visible = false;
      bullet.velocityY = 0;
    }

    player.collide(left_edge);
    player.collide(right_edge);
 }

 if(gameState == "end") 
 {
  player.destroy();
  bullet.destroy();
  alien.destroy();
  gameover.visible = true;
 }
  drawSprites();
}
