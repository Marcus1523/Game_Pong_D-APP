var canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 800;

var c = canvas.getContext('2d');
var tecla;
var pontosJ1=0;
var pontosJ2=0;

window.addEventListener('keydown', function(event) {
    tecla = event.key;
})

function Ball (x,y,radius, dx, dy, color) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function (){
        c.beginPath();
        c.strokeStyle = '#00AA00';
        c.fillStyle = this.color;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.stroke();
        c.fill();
    }

    this.update = function (){
        //SE A BOLINHA PASSAR O GOL DO JOGADOR 1
        if((this.x <= 0)) {
            pontosJ2++;
            resetBolinha();
        }

        //SE A BOLINHA PASSAR O GOL DO JOGADOR 2
        if(this.x >= canvas.width) {
            pontosJ1++;
            resetBolinha();
        }

        //SE A BOLINHA BATER NA RAQUETE DO JOGADOR 2
        if((this.x >= player2.x)){
            if((this.y >= player2.y) && (this.y <= (player2.y + player2.tamY))){
                this.x = player2.x;
                this.dx = -this.dx;
                console.log("BATEU NA RAQUETE 2");
            }
        }

        //SE A BOLINHA BATER NA RAQUETE DO JOGADOR 1
        if((this.x <= (player1.x + player1.tamX))){
            if((this.y >= player1.y) && (this.y <= (player1.y + player1.tamY))){
                this.x = player1.x + player1.tamX;
                this.dx = -this.dx;
            }
        }

        //SE A BOLINHA BATER NO TETO OU NO CHÃO
        if((this.y <= 0) || (this.y >= canvas.height)) {
            this.dy = -this.dy;
        }

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        this.draw();
    }
}

function resetBolinha () {
    bolinha.x = 390;
    bolinha.y = 390;
    //bolinha.dx++;
}

function Raquete (x, y, tamX, tamY, dy, color) {

    this.x = x;
    this.y = y;
    this.tamX = tamX;
    this.tamY = tamY;
    this.dy = dy;
    this.color = color;

    this.draw = function () {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.tamX, this.tamY);
    }

    this.update1 = function () {
        if((tecla=='w') || (tecla=='W')) {
            if(this.y>=0) {
                this.y = this.y - this.dy;
            }

            tecla = '';
        }

        if((tecla=='s') || (tecla=='S')) {
            if((this.y + this.tamY) < canvas.height){
                this.y = this.y + this.dy;
            }

            tecla = '';
        }

        this.draw();
    }

    this.update2 = function () {
        if((tecla=='o') || (tecla=='O')) {
            if(this.y>=0) {
                this.y = this.y - this.dy;
            }

            tecla = ' ';
        }

        if((tecla=='l') || (tecla=='L')) {
            if((this.y + this.tamY) < canvas.height){
                this.y = this.y + this.dy;
            }

            tecla = ' ';
        }        

        this.draw();
    }
}

function animate (){
    requestAnimationFrame(animate);

    c.clearRect(0,0,800,800);

    player1.update1();
    player2.update2();

    bolinha.update();

    console.log("\nJOGADOR 1: " + pontosJ1 + "\nJOGADOR 2:" + pontosJ2);
}

var player1 = new Raquete(90, 300, 20, 200, 20, 0);
var player2 = new Raquete(690, 300, 20, 200, 20, 0);

//Ball(x,y,radius,dx,dy,color)
var bolinha = new Ball(390,390,10,3,3,0);

animate();
