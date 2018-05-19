class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.speed = 100 + Math.floor(Math.random() * 300);
        this.y = 45 + (85 * Math.floor(Math.random() * 3));
        this.x = -200;
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x >= 600) {
            this.x = -200;
            this.y = 45 + (85 * Math.floor(Math.random() * 3));
            this.speed = 100 + Math.floor(Math.random() * 300);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.y = 385;
        this.x = 200;
    }

    update() {
        if (this.y === -40) {
            this.y =385;
        }
    
        for (const enemie of allEnemies) {
            if (enemie.y === this.y) {
                if ((enemie.x - this.x) >= -50 && (enemie.x - this.x) <= 50){
                    this.y = 385;
                    this.x = 200;
                }
            }
        }   
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

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
