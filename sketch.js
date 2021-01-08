
var sword, swordImage;
var gameOver, gameOverImage;
var gamestate=1;
var END=0, PLAY=1;
var score;
var fruit1, fruit1Image, fruit2, fruit2Image, fruit3, fruit3Image, fruit4, fruit4Image, fruitGroup;
var monster, monsterImage, enemyGroup;

function preload() {
  swordImage= loadImage("sword.png")
  gameOverImage= loadImage("gameover.png")
  monsterImage= loadAnimation("alien1.png", "alien2.png")
  fruit1Image= loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
}

function setup(){
  createCanvas(600, 600);
  
  //creating Sword
  sword= createSprite(400, 300, 20, 20);
  sword.addImage(swordImage);
  sword.scale= 0.7;
  
  score= 0;
  //creating the groups
  swordGroup= createGroup();
  enemyGroup= createGroup();
  
}
function draw() {
   background("lightblue");
  
  if(gamestate=== PLAY){
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    fruits()
    Enemy()
    //to add the score by 2 when the sword touches the fruits
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      
      sword.setCollider(0, 0, 30, 30);
    }
   
  else
    {
      if(enemyGroup.isTouching(sword)){
        gameState= END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage);
        sword.x=300;
        sword.y=300;
      }
      }
    }
  
  drawSprites();
 text("Score : "+ score,300,30);
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,300,10,20);
     monster.addAnimation(monsterImage);
    monster.velocityX=-6;
    monster.y=Math.round(random(100,300));
    monster.setLifetime=100;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,100,30,30);
    fruit.scale=0.4;
     
     r=Math.round(random(1,4));
    if (ran == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-5;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}


