export default class Main extends Phaser.State {
	preload(){
		console.log('preload');
		this.game.load.image('tile', 'assets/tile.png');
		this.game.load.image('player', 'assets/player.png');
	}
	create(){
		console.log('create');
		this.tileWidth = this.game.cache.getImage('tile').width;
		this.tileHeight = this.game.cache.getImage('tile').height;
		this.speed = 150;
		this.spacing = 250;
		this.intervalTime = this.spacing * 1000 / this.speed;
		this.score = 0;

		this.game.stage.backgroundColor = '479cde';
		this.game.physics.startSystem(Phaser.Physics.ARCADE); //zorgt ervoor dat de arcade physics wordt geenabled op het game.
		this.platforms = this.game.add.group(); //maakt groep aan die platforms noemt
		this.platforms.enableBody = true; //
		this.platforms.createMultiple(250, 'tile'); //maakt 250 tiles aan in de platforms groep.

		this.timer = this.game.time.events.loop(this.intervalTime, this.addPlatform, this); //this.addplatform wordt opgeroepen met een interval.
		this.initPlatforms();
		this.initPlayer(); // roep playerfunctie op om player aan te maken
		this.scoreText = this.game.add.text(this.game.world.centerX, 100, '0' ,{


		});
		this.cursors = this.game.input.keyboard.createCursorKeys();// keyboard controls aanmaken
	}
	update(){
		console.log('update');
		//this.addTile(this.game.rnd.integerInRange(0,this.game.world.width), 0); //add een tegeltje

		this.game.physics.arcade.collide(this.player, this.platforms); //player botst met platforms
		if(this.player.body.y >= this.game.world.height - this.player.height){ // als speler tegen de onderkant komt
			this.game.state.start('Main'); //dan wordt de main gestart (= herstart);
		}

		if(this.cursors.left.isDown){  
			this.player.body.velocity.x -= 30;
		}


		if(this.cursors.right.isDown){ 
			this.player.body.velocity.x += 30;
		}

		this.player.body.velocity.x += 0.9;

		if(this.cursors.up.isDown && this.player.body.wasTouching.down){ 
			this.player.body.velocity.y -= 1200;
		}


	}

	addTile(x, y) {
		let tile = this.platforms.getFirstDead(); //getfirstdead haalt een tile uit de groep die niete wordt gebruikt.
		tile.reset(x, y); // reset de x en y, zo zal de tile niet meer dood zijn, maar wordt hij 'levend'. zo neemt hij steeds een nieuwe die wel nog dood is.
		tile.body.velocity.y = this.speed; tile.body.immovable = true; //zorgt ervoor dat de tile naar beneden valt. 
		tile.checkWorldBounds = true; //zet de check aan wanneer iets buiten het scherm valt.
		tile.outOfBoundsKill = true;//When the tile leaves the screen, kill it. wordt automatisch als dead gemarkeerd en kan zo opnieuw opgeroepen worden. 
		return tile;
	}


	addPlatform(y = -this.tileHeight) {
		if(this.scoreText){
			this.score++;
			this.scoreText.setText(this.score);
		}

		let tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth); //berekend hoeveel tegels er nodig zijn om een hele rij te vullen.

		let hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;	//Add a hole randomly somewhere
		

		for (let i = 0; i < tilesNeeded; i++){//Keep creating tiles next to each other until we have an entire row
			if (i !== hole && i !== hole + 1){//Don't add tiles where the random hole is 
				this.addTile(i * this.tileWidth, y);
			}
		} 	
	}

	initPlayer(){
		this.player = this.game.add.sprite(this.game.world.centerX, 100, 'player'); //player aanmaken.
		this.player.anchor.set(0.5,1);
		this.game.physics.arcade.enable(this.player);
		console.log(this.player.body);
		this.player.body.gravity.y = 2000;
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = 0.2;
	}

	initPlatforms(){
		let numPlatforms = 1 + Math.ceil(this.game.world.height / (this.spacing + this.tileHeight)); //berekent het aantal platformen die moet aangemaakt worden.
		for(let i = 0; i < numPlatforms; i++){
			this.addPlatform(i * this.spacing - this.tileHeight); //add een platform op de juiste plaats en met de juiste spacing, - tileheight anders is er een te grote gap tussen bepaalde platformen
		}

	}
	shutdown(){
		this.scoreText.destroy();
		this.scoreText = null;
	}
}