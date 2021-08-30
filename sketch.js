var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pika,pika_running,pika_collided;
var ground, invisibleGround, groundImg;

var obstaclesGroup, squirtle, bulbasaur, charmander;

var score;
var gameOver, gameOverImg;

function preload(){
  pika_running = loadAnimation("pika1.png","pika2.png","pika3.png","pika4.png");
  pika_collided = loadImage("pika_collided.png");

  groundImg = loadImage("background2.0.png");
  
  squirtle = loadImage("squirt.png");
  bulbasaur = loadImage("bulba.png");
  charmander = loadImage("char.png");

  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  createCanvas(1200,400);

  ground = createSprite(600,325,400,20);
  ground.addImage("ground",groundImg);
  ground.x = ground.width /2;
  ground.velocityX = -3


  pika = createSprite(50,260,20,20);
  pika.addAnimation("running", pika_running);
  pika.addImage("collided", pika_collided);
  pika.scale = 0.1
 

 

  gameOver = createSprite(300,100,60,10);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.visible = false;

  invisibleGround = createSprite(200,280,400,10);
  invisibleGround.visible = false

  obstaclesGroup = createGroup();

 score = 0

pika.setCollider("circle",85,0,90);
pika.debug = true
}

function draw() {

 
  background(180);
  
  pika.collide(invisibleGround)


score = frameCount
textSize(20);
stroke ("black")


 // text.scale = 4

  if(gameState === PLAY){
    //ground.velocity =-4;

  if(ground.x<0){
      ground.x=ground.width/2
    }
  if (keyDown("space") && pika.y>250){
    pika.velocityY = -13
  }

  pika.velocityY = pika.velocityY+0.8

   gameOver.visible = false


   spawnObstacles();

 if(obstaclesGroup.isTouching(pika)){
  gameState = END;
  }
}
else if (gameState === END){
  ground.velocityX = 0;
  pika.velocityY = 0;
  gameOver.visible = true
  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  pika.changeAnimation("collided", pika_collided);
  if(mousePressedOver(gameOver)){
    restart();
  }

}
drawSprites();

text("Score: "+ score, 1000,20);
}

function spawnObstacles(){
  var r = Math.round(random(100,150))
  console.log(r)
  //console.log("r")
  if(frameCount % r === 0){
    var obstacle = createSprite(1200,260,10,40);
    obstacle.velocityX = -7

    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addImage(bulbasaur);
              break;
      case 2: obstacle.addImage(charmander);
              break;
      case 3: obstacle.addImage(squirtle);
              break;
    }

    obstacle.scale = 0.15;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

    
  }
}

function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  obstaclesGroup.destroyEach();
  score = 0
  pika.changeAnimation(pika_running)

  
}




