var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//var image = document.getElementById("imgs");

//loading images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipetop = new Image();
var pipebottom = new Image();

bird.src = "./images/bird.png";
bg.src = "/images/bg.png";
fg.src = "images/fg.png";
pipetop.src = "/images/pipeNorth.png";
pipebottom.src = "/images/pipeSouth.png";

console.log(ctx)


//draw images on document
var gap = 100;
var constant = pipetop.height+gap;
var birdX = 10;
var birdY = 150;
var gravity = 1.2;

//on pressing key down
document.addEventListener("keydown", moveup);
function moveup(){
    birdY -= 30;
    fly.play();
}

//pipe coordinates
var pipe = [];
pipe[0] = {
    x: cvs.width,  // 288px
    y: 0
};

//audio files

var fly = new Audio();
var score = new Audio();

fly.src = "sounds/fly.mp3";
score.src = "sounnds/score.mp3"


var Score = 0;

function draw(){
    
    ctx.drawImage(bg,0,0);

    for(var i=0; i<pipe.length; i++){
        ctx.drawImage(pipetop, pipe[i].x, pipe[i].y,);
        ctx.drawImage(pipebottom, pipe[i].x, pipe[i].y+constant);
        pipe[i].x--;  //from 288px 1px is reduced every time when for loop runs; 

        if(pipe[i].x==120){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipetop.height)- pipetop.height
               
            })
        } 
        //collition detection
        if(birdX+bird.width >= pipe[i].x && birdX <= pipe[i].x + pipetop.width 
            && (birdY <= pipe[i].y + pipetop.height || birdY+bird.height >= 
            pipe[i].y + constant || birdY + bird.height >= cvs.height - fg.height)){
           
            location.reload(); //reloads the page;
        }

        if(pipe[i].x == 5){
            Score++;
            score.play();
        }
    }

    
   // ctx.drawImage(fg, 0, 394, 306, 118);
   ctx.drawImage(fg, 0, cvs.height-fg.height);
   ctx.drawImage(bird,birdX,birdY);
   birdY += gravity;

   ctx.fillStyle = "black";
   ctx.font = "20px verdana";
   ctx.fillText("Score : " + Score,10,cvs.height-20);
   requestAnimationFrame(draw);

}

draw();

