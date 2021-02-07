var player;

var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

var gameManager = {

	canvas : document.getElementById('ctx'),
	start : function(){
		this.canvas.width = 500;
		this.canvas.height = 500;
		this.context = this.canvas.getContext('2d');
		this.interval = setInterval(updateGame, 1000 / 60);
	},
	clear : function(){
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}

};

function entity(x,y,width,height,colour)
{
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
	ctx = gameManager.context;
  	ctx.fillStyle = colour;
  	ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function(){
  	this.x += this.speedX;
  	this.y += this.speedY;
  }
  
}

function stopMove(){
	player.speedX = 0;
	player.speedY = 0;
}

function updateGame(){
	gameManager.clear();
	stopMove();
	if(Keys.up){
        player.speedY = -5;
        console.log('sd');
    }

    if(Keys.down){
        player.speedY = 5;
    }

    if(Keys.left) {
        player.speedX = -5;
    }

    if(Keys.right){
    	player.speedX = 5;
    }
        
	player.newPos();
	player.update();
}

function startGame() {
  gameManager.start();
  player = new entity(30, 30, 30, 30, "white");
}

window.addEventListener('keydown', function(e){
     var kc = e.keyCode;
     e.preventDefault();

     if(kc === 37 || kc === 65) Keys.left = true;
     if(kc === 38 || kc === 87) Keys.up = true;
     if(kc === 39 || kc === 68) Keys.right = true;
     if(kc === 40 || kc === 83) Keys.down = true;
 });

window.addEventListener('keyup', function(e){
     var kc = e.keyCode;
     e.preventDefault();

     if(kc === 37 || kc === 65) Keys.left = false;
     if(kc === 38 || kc === 87) Keys.up = false;
     if(kc === 39 || kc === 68) Keys.right = false;
     if(kc === 40 || kc === 83) Keys.down = false;
 });



