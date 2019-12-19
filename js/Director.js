import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director{


    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor(){
        this.datastore = DataStore.getInstance();
        this.landSpeed = 2;
        this.birdSpeed = 10;
    }

    createPencil(){
        const minTop = window.innerHeight/8;
        const maxTop = window.innerHeight/2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.datastore.get('pencils').push(new UpPencil(top));
        this.datastore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent(){
        for(let i=0; i<3; i++){
            this.datastore.get('birds').y[i]=
                this.datastore.get('birds').birdsY[i];
        }
        this.datastore.get('birds').time = 0;
    }

    checkBirds(){
        const land = this.datastore.get('land');
        const bird = this.datastore.get('birds');
        const pencils = this.datastore.get('pencils');
        const score = this.datastore.get('score');
        if(bird.birdsY[0]+ bird.birdsHeight[0]>= land.y){
            this.isGameOver = true;
            console.log("撞击地板");
            return;
        }
        const birdsBorder = {
            top:bird.y[0],
            bottom:bird.birdsY[0] + bird.birdsHeight[0],
            left:bird.birdsX[0],
            right:bird.birdsX[0]+bird.birdsWidth[0]
        };

        for(let i=0; i<pencils.length; i++){
            const pencilBorder = {
                top: pencils[i].y,
                bottom: pencils[i].y + pencils[i].height,
                left: pencils[i].x,
                right: pencils[i].x + pencils[i].width
            };
            if(Director.isStrike(birdsBorder,pencilBorder)){
                this.isGameOver = true;
                console.log("撞到电线杆啦~");
                return;
            }
        }

        if(bird.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore){
            score.scoreNumber++;
            score.isScore = false;
        }

    }

    static isStrike(bird, pencil){
        let s = false;
        if(bird.top >pencil.bottom ||
            bird.bottom < pencil.top||
            bird.left > pencil.right||
            bird.right < pencil.left
            ){
            s = true;
        }
        return !s;

    }

    run(){
        this.checkBirds();
        if(!this.isGameOver) {

            this.datastore.get('background').draw();
            this.datastore.get('pencils').forEach(function (value) {
                value.draw();
            });
            let pencil = this.datastore.get('pencils');
            if (pencil[0].x + pencil[0].width <= 0 && pencil.length === 4) {
                pencil.shift();
                pencil.shift();
                this.datastore.get('score').isScore = true;
            }
            if (pencil[0].x <= (window.innerWidth - pencil[0].width) / 2 && pencil.length === 2) {
                this.createPencil();

            }

            let land = this.datastore.get('land');
            land.draw();
            this.datastore.get('score').draw();
            let bird = this.datastore.get('birds');
            if(land.landX % (this.landSpeed * Math.floor(this.birdSpeed)) === 0){
                bird.index++;
            }

            bird.draw(bird.index);

            let timer = requestAnimationFrame(() => this.run());
            this.datastore.put('timer', timer);
        }else {
            console.log("游戏结束");
            this.datastore.get('startButton').draw();
            cancelAnimationFrame(this.datastore.get('timer'));
            this.datastore.destroy();
        }
    }
}