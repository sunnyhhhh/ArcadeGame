// 这是我们的玩家要躲避的敌人 
var Enemy = function () {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';

    this.x = Math.floor(Math.random() * 5) * 100;
    this.y = this.localY[Math.floor(Math.random() * 3)];
};

Enemy.prototype.localY = [62, 140, 224];

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    if (this.x >= 500) {
        this.x = -50;
        this.y = this.localY[Math.floor(Math.random() * 3)];
    }
    allEnemies.forEach(function (ele, index, self) {
        if (Math.abs(ele.x - player.x) <= 45 && Math.abs(ele.y - player.y) <= 45) {
            player.reset();
        }
    });
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.up = true;
    this.left = true;
    this.right = true;
    this.down = false;
}

var TILE_WIDTH = 100,
    TILE_HEIGHT = 85;

Player.prototype.update = function (direction) {
    if (this.x <= 5) {
        this.left = false;
    }
    if (this.y <= 100) {
        this.up = false;
    }
    if (this.y >= 380) {
        this.down = false;
    }
    if (this.x >= 400) {
        this.right = false;
    }

    switch (direction) {
        case 'left':
            if (this.left) {
                this.x -= TILE_WIDTH;
            }
            break;
        case 'up':
            if (this.y <= 100) {
                player.reset();
            }
            if (this.up) {
                this.y -= TILE_HEIGHT;
            }
            break;
        case 'right':
            if (this.right) {
                this.x += TILE_WIDTH;
            }
            break;
        case 'down':
            if (this.down) {
                this.y += TILE_HEIGHT;
            }
            break;
        default:
            break;
    }
}

Player.prototype.render = function (direction) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (direction) {

    this.left = true;
    this.right = true;
    this.up = true;
    this.down = true;

    this.update(direction);
}

Player.prototype.reset = function() {
    player.x = 200;
    player.y = 380;
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var player = new Player();

var allEnemies = [];
var numsOfEnemies = 5;
for (var i = 0; i < numsOfEnemies; i++) {
    (function (j) {
        var em = new Enemy();
        em.index = j;
        em.speed = Math.random() * (100, 400);
        allEnemies.push(em);
    })(i);
}


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});