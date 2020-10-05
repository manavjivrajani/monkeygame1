var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey;
var ground;

var stoneGroup, bananaImage;
var obstaclesGroup;

var score=0;

function preload(){
  monkeyImage = loadAnimation("Monkey_01.png,Monkey_02.png,Monkey_03.png,Monkey_04.png,Monkey_05.png,Monkey_06.png,Monkey_07.png,Monkey_08.png,Monkey_09.png,Monkey_10.png");
  
  groundImage = loadImage("jungle.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(jungle.png);
  
  text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
  
  score = score + 2
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnbananas();
  spawnObstacles(); 
    
   if(obstaclesGroup.isTouching(monkey)){ 
  gameState=END;
   }
  }
  else if(gameState===END){
  ground.velocityX=0;
  monkey.velocityY=0;
  obstaclesGroup.setLifetimeEach(-1);
  bananasGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(0);
  bananasGroup.setVelocityXEach(0);
  }
  monkey.collide(invisibleGround)
  drawSprites();
}

function reset(){
gameState=PLAY;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
score=0;
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(stoneImage);
    
    //assign scale and lifetime to the obstacle       
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}