// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = 45 + (85 * Math.floor(Math.random() * 3));
    this.x = -200;
    this.speed = 100 + Math.floor(Math.random() * 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 600) {
        this.x = -200;
        this.y = 45 + (85 * Math.floor(Math.random() * 3));
        this.speed = 100 + Math.floor(Math.random() * 300);
    }
    if (this.y === player.y) {
        if ((this.x - player.x) >= -50 && (this.x - player.x) <= 50){
            player.y = 385;
            player.x = 200;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.y = 385;
    this.x = 200;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x > 0) {
                this.x -= 100;
            }
            break;
        case 'right':
            if(this.x < 400) {
               this.x += 100;
            }
            break;
        case 'up':
            if(this.y > -40) {
                this.y -= 85;
            }
            break;
        case 'down':
            if(this.y < 385) {
                this.y += 85;
            }
            break;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = (() => {
    let arr = [];
    for(let i = 0; i < 5; i++) {
        const enemy = new Enemy();
        arr.push(enemy);
    }
    return arr;
})();
console.log(allEnemies);


const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
