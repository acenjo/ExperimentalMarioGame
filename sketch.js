var player, playerImage
var marioBackground, marioBackgroundImage
var marioground, mariogroundImage, marioground2
var mariocloud, mariocloudImage
var mariospike, mariospikeimage
var shootingstar, shootingstarImage
var bird, birdImage
var cloudsGroup
var spikesGroup
var birdsGroup
var shootingstarGroup
var lives = 3
var gamestate = "START"
var playerStanding
var starting, startingImage
var punchSound


function preload()
{
	playerImage = loadAnimation("Images/player1.png", "Images/player2.png")
	marioBackgroundImage = loadImage("Images/backgroundmario.png")
	mariogroundImage = loadImage("Images/marioground.png")
	mariocloudImage = loadImage("Images/mariocloud.png")
	mariospikeImage = loadImage("Images/mariospike.png")
	birdImage = loadAnimation("Images/bird1.png", "Images/bird2.png")
	shootingstarImage = loadImage("Images/shootingstar.png")
	playerStanding = loadImage("Images/player1.png")
	startingImage = loadImage("Images/starting.png")
	punchSound = loadSound("Punch sound.wav")
}

function setup() {
	createCanvas(windowWidth, windowHeight)
	marioBackground = createSprite(width/2, height/2, width + 1000, height + 1000)
	marioBackground.addImage(marioBackgroundImage)
	marioBackground.scale = 1.8

	starting = createSprite(400, height - 70, 400, 600)
	starting.addImage(startingImage)
	
	
	marioground = createSprite(width/2, height, width + 1000, height + 1000)
	marioground.addImage(mariogroundImage)
	
	player = createSprite(100, height - 70, 10, 10)
	player.addAnimation("playerStanding", playerStanding)
	player.addAnimation("playerImage", playerImage)

	

	marioground2 = createSprite(width/2, height, width, 40)
	
	player.debug = true
	player.setCollider("rectangle", 0, 0, 50, 155)

    marioground2.visible = false

	cloudsGroup = createGroup();
	spikesGroup = createGroup();
	birdsGroup = createGroup();
	shootingstarGroup = createGroup();
	

	
	
    
}


function draw() {
	
	background("gray")

	if(gamestate ===  "START"){
		starting.visible = true
		if(keyDown('space') || touches.length > 0){
			starting.visible = false
			player.changeAnimation("playerImage", playerImage)
			gamestate = "PLAY"
			touches = []
		}
		
	}

	
	if(gamestate === "PLAY"){
		
		marioBackground.velocityX = -5

		if(marioBackground.x < 0){
			marioBackground.x = marioBackground.width/2
		}
	
	
		marioground.velocityX = -5
	
		if(marioground.x < 600){
			marioground.x = marioground.width/2
		}
	
	   console.log(player.y)
		if(keyDown("space") || touches.length > 0 && player.y > 400){
		   player.velocityY = -20
		   touches = []
		}
		
		
	
		
		player.velocityY = player.velocityY + 1

		if(player.isTouching(spikesGroup)){
			player.scale = player.scale - 0.1
			spikesGroup.destroyEach()
			punchSound.play()
			lives = lives - 1
		}

		if(player.isTouching(birdsGroup)){
			lives = lives - 1
			marioground.velocityX = marioground.velocityX + 2
			marioBackground.velocityX = marioBackground.velocityX + 2
			punchSound.play()
			birdsGroup.destroyEach()
		}

		if(player.isTouching(shootingstarGroup)){
			
			lives = lives + 1
			shootingstarGroup.destroyEach()
			
		}

		
	
		if(lives === 0){
			player.changeAnimation("playerStanding", playerStanding)
			gamestate = "END"
		}
	
		spawnSpikes();
		spawnClouds();
		spawnBirds();
		spawnStars();
	}
	if(gamestate === "END"){
		spikesGroup.setLifetimeEach(-1)
		cloudsGroup.setLifetimeEach(-1)
		birdsGroup.setLifetimeEach(-1)
		shootingstarGroup.setLifetimeEach(-1)
		marioground.velocityX = 0
		marioBackground.velocityX = 0
		birdsGroup.setVelocityXEach(0)
		cloudsGroup.setVelocityXEach(0)
		spikesGroup.setVelocityXEach(0)
		shootingstarGroup.setVelocityXEach(0)
		player.velocityY = 0

	}
	
  
	

	player.collide(marioground2)

	



	



   
	drawSprites();
	textSize(30)
	fill('red')
	text("Lives: "+ lives, 10, 30)
	
}

function spawnClouds(){
	
	if(frameCount % 40 === 0){
	mariocloud = createSprite(width + 20, height - 300, 50, 50)
	mariocloud.addImage(mariocloudImage)
	mariocloud.scale = 0.5
	
	mariocloud.y = Math.round(random(300, 500))

	player.depth = mariocloud.depth + 1
	
	mariocloud.velocityX = -12

	cloudsGroup.add(mariocloud)
	}
	
}

function spawnSpikes(){
	if(frameCount % 80 === 0){
		mariospike = createSprite(width + 30, height - 60, 50, 50)
		mariospike.addImage(mariospikeImage)
		mariospike.scale = 0.15

		mariospike.debug = true
		mariospike.setCollider("rectangle", 0, 0, 350, 350)

		mariospike.velocityX = -7
		mariospike.debug = true
		spikesGroup.add(mariospike)
	}
	
}

function spawnBirds(){
	if(frameCount % 150 === 0){
		bird = createSprite(width + 20, height - 300, 20, 20)
		bird.addAnimation("birdImage", birdImage)
		bird.y = Math.round(random(300, 600))
		bird.scale = 0.5

		bird.debug = true
		bird.setCollider("rectangle", 0, 0, 20, 20)

		bird.velocityX = -24
		birdsGroup.add(bird)
        
	}
}

function spawnStars(){
	if(frameCount % 400 === 0){
		shootingstar = createSprite(800, 60, 20, 20)
		shootingstar.addImage(shootingstarImage)
		shootingstar.y = Math.round(random(100, 250))
		shootingstar.scale = 0.07

		shootingstar.velocityX = -18
		shootingstarGroup.add(shootingstar)
		
	}
}

