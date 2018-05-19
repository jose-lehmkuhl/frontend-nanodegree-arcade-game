class Enemy {
    
    // Enemies constructor function, sets enemie sprite and calls setUp function
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.setUp();
    }

    // sets random speed the new enemie, and randomly chose one row to put it;
    setUp() {
        this.speed = 100 + Math.random() * 300;
        this.y = 45 + (85 * Math.floor(Math.random() * 3));
        this.x = -200;
    }

    
    // Moves the enemy based on its "speed" atribute, than checks if it went off screen,
    // setting it up again;
    update(dt) {
        this.x += this.speed * dt;
        if (this.x >= 600) {
            this.setUp();
        }
    }

    // renders enemie image on the canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {

    // Player constructor method, sets player sprite and starting location
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.y = 385;
        this.x = 200;
    }

    // Updates player location, checking if the player collided or reached the water,
    // than calls the reset function
    update() {
        if (this.y === -40) {
            this.reset()
        }
    
        for (const enemie of allEnemies) {
            if (enemie.y === this.y) {
                if ((enemie.x - this.x) >= -50 && (enemie.x - this.x) <= 50){
                    this.reset();
                }
            }
        }   
    }

    // resets player to the starting location
    reset() {
        this.y = 385;
        this.x = 200;
    }

    // renders player image to the canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // gets by the event listener and checks wich direction key was pressed,
    // deciding what to do with it
    handleInput(key) {
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
    }
}

// initializes the enemies through an immediately evoked function that creates an array of
// enemies and returns it to the allEnemies array.
const allEnemies = (() => {
    let arr = [];
    for(let i = 0; i < 6; i++) {
        const enemy = new Enemy();
        arr.push(enemy);
    }
    return arr;
})();

// initializes player;
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
