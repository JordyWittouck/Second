/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _classesStatesMain = __webpack_require__(1);

	var _classesStatesMain2 = _interopRequireDefault(_classesStatesMain);

	var game = new Phaser.Game(600, 600, Phaser.AUTO);
	game.state.add('Main', _classesStatesMain2['default'], true); //state is een object, geen functie. een functie bevat haakjes.

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Main = (function (_Phaser$State) {
		_inherits(Main, _Phaser$State);

		function Main() {
			_classCallCheck(this, Main);

			_get(Object.getPrototypeOf(Main.prototype), 'constructor', this).apply(this, arguments);
		}

		_createClass(Main, [{
			key: 'preload',
			value: function preload() {
				console.log('preload');
				this.game.load.image('tile', 'assets/tile.png');
				this.game.load.image('player', 'assets/player.png');
			}
		}, {
			key: 'create',
			value: function create() {
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
				this.scoreText = this.game.add.text(this.game.world.centerX, 100, '0', {});
				this.cursors = this.game.input.keyboard.createCursorKeys(); // keyboard controls aanmaken
			}
		}, {
			key: 'update',
			value: function update() {
				console.log('update');
				//this.addTile(this.game.rnd.integerInRange(0,this.game.world.width), 0); //add een tegeltje

				this.game.physics.arcade.collide(this.player, this.platforms); //player botst met platforms
				if (this.player.body.y >= this.game.world.height - this.player.height) {
					// als speler tegen de onderkant komt
					this.game.state.start('Main'); //dan wordt de main gestart (= herstart);
				}

				if (this.cursors.left.isDown) {
					this.player.body.velocity.x -= 30;
				}

				if (this.cursors.right.isDown) {
					this.player.body.velocity.x += 30;
				}

				this.player.body.velocity.x += 0.9;

				if (this.cursors.up.isDown && this.player.body.wasTouching.down) {
					this.player.body.velocity.y -= 1200;
				}
			}
		}, {
			key: 'addTile',
			value: function addTile(x, y) {
				var tile = this.platforms.getFirstDead(); //getfirstdead haalt een tile uit de groep die niete wordt gebruikt.
				tile.reset(x, y); // reset de x en y, zo zal de tile niet meer dood zijn, maar wordt hij 'levend'. zo neemt hij steeds een nieuwe die wel nog dood is.
				tile.body.velocity.y = this.speed;tile.body.immovable = true; //zorgt ervoor dat de tile naar beneden valt.
				tile.checkWorldBounds = true; //zet de check aan wanneer iets buiten het scherm valt.
				tile.outOfBoundsKill = true; //When the tile leaves the screen, kill it. wordt automatisch als dead gemarkeerd en kan zo opnieuw opgeroepen worden.
				return tile;
			}
		}, {
			key: 'addPlatform',
			value: function addPlatform() {
				var y = arguments.length <= 0 || arguments[0] === undefined ? -this.tileHeight : arguments[0];

				if (this.scoreText) {
					this.score++;
					this.scoreText.setText(this.score);
				}

				var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth); //berekend hoeveel tegels er nodig zijn om een hele rij te vullen.

				var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1; //Add a hole randomly somewhere

				for (var i = 0; i < tilesNeeded; i++) {
					//Keep creating tiles next to each other until we have an entire row
					if (i !== hole && i !== hole + 1) {
						//Don't add tiles where the random hole is
						this.addTile(i * this.tileWidth, y);
					}
				}
			}
		}, {
			key: 'initPlayer',
			value: function initPlayer() {
				this.player = this.game.add.sprite(this.game.world.centerX, 100, 'player'); //player aanmaken.
				this.player.anchor.set(0.5, 1);
				this.game.physics.arcade.enable(this.player);
				console.log(this.player.body);
				this.player.body.gravity.y = 2000;
				this.player.body.collideWorldBounds = true;
				this.player.body.bounce.y = 0.2;
			}
		}, {
			key: 'initPlatforms',
			value: function initPlatforms() {
				var numPlatforms = 1 + Math.ceil(this.game.world.height / (this.spacing + this.tileHeight)); //berekent het aantal platformen die moet aangemaakt worden.
				for (var i = 0; i < numPlatforms; i++) {
					this.addPlatform(i * this.spacing - this.tileHeight); //add een platform op de juiste plaats en met de juiste spacing, - tileheight anders is er een te grote gap tussen bepaalde platformen
				}
			}
		}, {
			key: 'shutdown',
			value: function shutdown() {
				this.scoreText.destroy();
				this.scoreText = null;
			}
		}]);

		return Main;
	})(Phaser.State);

	exports['default'] = Main;
	module.exports = exports['default'];

/***/ }
/******/ ]);