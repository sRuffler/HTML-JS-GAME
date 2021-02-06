var player = {
	x:20,
	y:20,
	width:20,
	height:20,
	speedX: 3,
	speedY: 2,
	color: "white"
};

var entity = {
	id:0,
	x:0,
	y:0,
	width:0,
	height:0,
	speedX: 0,
	speedY: 0,
	color: "white"
};

var enemies = [] ;

var canvas;
var ctx;
var width = 500;
var height = 500;

document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
  	createEnemies();
  }
});

function setup(){
	canvas = document.getElementById("ctx");
	ctx = canvas.getContext("2d");
    ctx.font = "16px Arial";
    setupEventListeners();

	createEnemies();
}

function setupEventListeners(){
	canvas.addEventListener("mousemove", function(e) { 

	ctx.clearRect(player.x - 10, player.y - 10, player.width, player.height);  // (0,0) the top left of the canva

    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make

    player.x = canvasX;  
    player.y = canvasY;  

    ctx.fillStyle = "white";
	ctx.fillRect(player.x - 10, player.y - 10 , player.width, player.height);
});
}

function update(){

	// Clear the canvas
	ctx.clearRect(0,0,canvas.width, canvas.height);

	// Draw player
	ctx.fillStyle = "white";
	ctx.fillRect(player.x - 10, player.y - 10 , player.width, player.height);

	updateEntities();

	drawEntities();
}

function updateEntity(entity){

	if (entity.x >= width - entity.width || entity.x <= 0)
		entity.speedX  = entity.speedX * -1;
	if (entity.y >= height - entity.height || entity.y <= 0)
		entity.speedY = entity.speedY * -1;	

	entity.x += entity.speedX;
	entity.y += entity.speedY;
}

function updateEntities(){

	//updateEntity(player);

	for(var i = 0; i < enemies.length; i++){
		if (isCollide(player, enemies[i]))
		{
			enemies.splice(i,1);
			continue;
		}	

		updateEntity(enemies[i]);
	}
}

function drawEntity(entity){
	ctx.fillStyle = entity.color;
	ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
}

function drawEntities(){
	//drawEntity(player);
	//drawEntity(enemy);

	for(var i = 0; i < enemies.length; i++){
		drawEntity(enemies[i]);
	}
}

function createEnemies(){
	for(var i = 0; i < 10; i ++){
		enemies.push(createEnemy());
	}
}

function createEnemy(){

	return {
	id:uuidv4(),
	x:Math.random() * 450,
	y:Math.random() * 450,
	width:Math.random() * 10 + 20 ,
	height:Math.random() * 10 + 20,
	speedX: Math.random() * 5 + 3,
	speedY: Math.random() * 5 + 3,
	color: Math.random() < 0.7 ? "green" : "red"

	}
}

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

setup();

setInterval(update, 1000/60);