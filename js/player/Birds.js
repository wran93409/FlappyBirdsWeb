import {Sprite} from "../base/Sprite.js";

export class Birds extends Sprite{

    constructor(){
        const image = Sprite.getImage('birds');
        super(image);
        const birdWidth = 34;
        const birdHeigth = 24;
        this.clippingX = [9, 9 + birdWidth + 18, 9 + birdWidth + 18 + birdWidth + 18];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [birdWidth, birdWidth, birdWidth];
        this.clippingHeight = [birdHeigth, birdHeigth, birdHeigth];
        const birdX = window.innerWidth / 4;
        const birdY = window.innerHeight / 2;
        this.birdsX = [birdX, birdX, birdX];
        this.birdsY = [birdY, birdY, birdY];
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        this.birdsHeight = [birdHeigth, birdHeigth, birdHeigth];
        this.y = [birdY, birdY, birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;

    }

    draw(index) {
        this.index = index;
        if(this.index>2){
            this.index = 0;
        }

        const g = 0.98 / 3;
        const offsetUp = 30;

        const offsetY = (g * this.time * (this.time -offsetUp)) / 2;
        for(let i=0; i<=2; i++){
            this.birdsY[i] =  this.y[i] + offsetY;
        }
        this.time++;

        super.draw(this.img, this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]);
    }
}