var backgroundImg,bg,backGroundSound;
var spaceShip,spaceShipImg;
var meteorImg,meteor
var star,starImg;
var planet,planetImg
var invisiableLine
var invisiableLine2;


var score = 0 

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var starsGroup;
var meteorsGroup;
var planetsGroup;

var gameOver,gameOverImg,gameOverSound;
var restart,restartImg;





function preload(){
backGroundImg = loadImage("assest/backGround.png");
spaceShipImg = loadImage("assest/spaceShip4.png");
meteorImg = loadImage("assest/meteor4.png");
starImg = loadImage("assest/star2.png")
gameOverImg = loadImage("assest/gameOver2.png")
restartImg = loadImage("assest/restart.png")

planetImg = loadImage("assest/planet4.png")

gameOverSound = loadSound("sfx-defeat7.mp3");
backGroundSound = loadSound("backGroundSon.mp3")
}

function setup(){
createCanvas(windowWidth,windowHeight);





bg = createSprite(windowWidth/2,windowHeight/2,50,50);
bg.addImage(backGroundImg);
bg.velocityY+=5;
bg.scale = 3.2;

spaceShip = createSprite(windowWidth/2,windowHeight-120,50,50);
spaceShip.addImage(spaceShipImg);
spaceShip.scale = 0.25

spaceShip.setCollider("circle",0,0,300)


gameOver = createSprite(windowWidth/2,windowHeight/2-100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.4; 

restart = createSprite(windowWidth/2,windowHeight/2+150);
restart.addImage(restartImg);
restart.scale = 0.25;

invisiableLine = createSprite(10,windowHeight,10,10000)
invisiableLine.visible = false;

invisiableLine2 = createSprite(1525,windowHeight,10,10000)
invisiableLine2.visible = false;




starsGroup = new Group();
meteorsGroup = new Group();
planetsGroup = new Group();


}


function draw(){
 // background(0);
 

 
 
      if(gameState === PLAY){
      
        
        if(bg.y>500){
          bg.y=bg.width/2;
         
        }

        if(bg.velocityY > 0){
          backGroundSound.play();
        }
       
          score = score + Math.round(getFrameRate()/60);
  
          if(keyIsDown(RIGHT_ARROW)){
            spaceShip.position.x +=5
          }
          
          if(keyIsDown(LEFT_ARROW)){
             spaceShip.position.x -=5
          }
          
          if(spaceShip.isTouching(meteorsGroup )){
          gameState = END;
          gameOverSound.play()
          }

          if(spaceShip.isTouching(planetsGroup)){
            gameState = END;
            gameOverSound.play()
          }

          bg.velocityY = (6 + 2*score/100);
          
          meteorsGroup.setVelocityYEach(6 + 2*score/100);
          starsGroup.setVelocityYEach(6 + 2*score/100);
          planetsGroup.setVelocityYEach(6 + 2*score/100);

          gameOver.visible = false;
         restart.visible = false;

         spaceShip.collide(invisiableLine);
         spaceShip.collide(invisiableLine2)
          spawnstars();
         spawnmeteors();
         spawnplanet()
        
      }
      else if(gameState === END){
        bg.velocityY = 0;

        meteorsGroup.setVelocityYEach(0);
        starsGroup.setVelocityYEach (0);
        planetsGroup.setVelocityYEach(0);

        meteorsGroup.destroyEach();
        starsGroup.destroyEach();
        planetsGroup.destroyEach();

        if(mousePressedOver(restart)) {
          reset();
        }

        gameOver.visible = true;
        restart.visible = true;
      }

      
      drawSprites();

      fill("white")
      strokeWeight(10);
      stroke("yellow")
       textSize(50);
      text("Score:"+score,windowWidth/2+450,windowHeight-600);
     
}

function spawnstars() {
  
  if (frameCount % 20 === 0) {
    var  star = createSprite(700,-100)
      star.addImage(starImg);
     star.scale=0.2;
      star.x=Math.round(random(80,1400));
      star.velocity.y=+5
     
      star.depth = spaceShip.depth;
      spaceShip.depth = spaceShip.depth -5;

      starsGroup.add(star);
      
    }
  }
  
  function spawnmeteors(){
    if (frameCount % 25 === 0) {
      var  meteor = createSprite(700,-100)
        meteor.addImage(meteorImg);
       meteor.scale=0.5;
        meteor.x=Math.round(random(70,1400));
        meteor.velocity.y=+5
        meteor.setCollider("circle",0,0,59)
      

        spaceShip.depth = meteor.depth;
        spaceShip.depth = spaceShip.depth +1;

        meteorsGroup.add(meteor);
      }
  }

 

  function spawnplanet(){
    if (frameCount % 50 === 0) {
      var  planet = createSprite(700,-100)
        planet.addImage(planetImg);
       planet.scale=0.2;
        planet.x=Math.round(random(70,1400));
        planet.velocity.y=+5
        planet.setCollider("circle",0,0,200)

        spaceShipdepth =  planet.depth;
        spaceShip.depth = spaceShip.depth +1;

        planetsGroup.add(planet);
      }
  }
  
  function reset(){
    gameState = PLAY;
    bg.velocityY +=5
    gameOver.visible = false;
    restart.visible = false;

    

    score = 0
  }
