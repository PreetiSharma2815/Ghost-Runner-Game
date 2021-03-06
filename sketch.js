var towerImg, tower,towerImg2;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostJump;
var gameOver, gameOverImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start";

function preload() {

  towerImg = loadImage("tower.png");
  towerImg2 = loadImage("BlackBackGround.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png");
  gameOverImg = loadImage("GameOver2.jpg");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  tower.addImage("tower2", towerImg2);
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(400, 300, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  gameOver = createSprite(width/2, height/2);
  gameOver.visible = false;
}

function draw() {
  background(0);
  drawSprites();

  if (gameState === "start") {
    tower.changeImage("tower", towerImg);
    tower.velocityY = 1;

    ghost.scale = 0.3;
    ghost.addImage("ghost", ghostImg);
    ghost.velocityY = 0;
    ghost.visible=true;
    
    fill("black");
    textSize(20)
    stroke("black")
    text("Press the 'SpaceBar' To Climb the Doors :)",115,50)    
    
    if (keyDown("space")) {
      gameState = "play";
    }

    if (tower.y > 400) {
      tower.y = 300
    }

  }
  if (gameState === "play") {

    tower.changeImage("tower", towerImg);
    tower.velocityY = 1;

    ghost.scale = 0.3;
    ghost.addImage("ghost", ghostImg);
    ghost.visible=true;
    //control ghost with right and left arrow
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    //make the ghost jump with space key
    if (keyDown("space")) {
      ghost.velocityY = -10;
      ghost.addImage("ghost", ghostJump);
    }
    
    //add gravity to the ghost
    ghost.velocityY = ghost.velocityY + 0.8

    if (tower.y > 400) {
      tower.y = 300
    }
    spawnDoors();

    //climbersGroup.collide(ghost);
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      //ghost.destroy();
      gameState = "end"
    }

  }

  if (gameState === "end") {
    ghost.visible=false;
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    
    gameOver.visible = true;
    gameOver.addImage("gameover", gameOverImg);
    
    tower.velocityY=0; 
    tower.changeImage("tower2", towerImg2);
  }
  if (mousePressedOver(gameOver)) {
      gameOver.visible = false;
      restart();      
    }
  
}

function spawnDoors() {
  //code here to spawn the doors in the tower
  
  if (frameCount % 300 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    
    invisibleBlock.visible=false;
    
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.setCollider("rectangle",0,0,climber.width/2,2)
    
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    //adjust ghost depth
    ghost.depth = door.depth;
    ghost.depth += 1;

    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    //invisibleBlock.debug = true;
  }
}

function restart() {  
  
  ghost.x = 400;
  ghost.y = 250;
  ghost.velocityY= 0;
  
  ghost.addImage("ghost", ghostImg);
  
  gameState = "start";

}
