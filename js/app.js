// Enemies our player must avoid
var Enemy = function(y) {
    //enemy image
    this.sprite = 'images/enemy-bug.png';
    //enemy initial location
    this.x = 0;
    this.y = y;
    //speed of enemy movement
    this.acceleration = Math.ceil(Math.random() * 100) + 50;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.acceleration * dt;
    //If enemy is on the end of the map reset his position
    if(this.x > 505){
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
var Player = function() {
    //player image
    this.sprite = 'images/char-boy.png';
    //player initial location
    this.x = 200;
    this.y = 375; 
    //player's move
    this.moveY = 80;
    this.moveX = 101;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
}

//Player move
Player.prototype.handleInput = function(key) {

    if(key === 'up'){
        this.y -= this.moveY;
    } else if (key === 'right'){
        this.x += this.moveX
    } else if (key === 'down'){
        this.y += this.moveY
    } else if (key === 'left'){
        this.x -= this.moveX
    }

    //Check if player is not outside the map
    if(this.x < 0){
        this.x = 0;
    }
    if(this.x > 400){
        this.x = 400;
    }
    if(this.y > 375){
        this.y = 375;
    }
    //won
    if(this.y < 15){
        this.x = 200;
        this.y = 375;
        alert('You won!')
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(215), new Enemy(135), new Enemy(55)];
var player = new Player();    

//this function listen for collisions
function checkCollisions() {

    for(let i = 0; i < allEnemies.length; i++){
        //Compare enemy and player position to check if user don't lost
        if ((Math.abs(player.x - allEnemies[i].x.toFixed()) <= 60) && (Math.abs(player.y - allEnemies[i].y) <= 15)) {
           //rester player's position 
           player.x = 200;
           player.y = 375;
           //lose
           alert('You lost!')
        }
    }

}

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});