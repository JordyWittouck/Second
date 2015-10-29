import Main from './classes/states/Main';

let game = new Phaser.Game(600,600, Phaser.AUTO);
game.state.add('Main', Main, true); //state is een object, geen functie. een functie bevat haakjes.
