import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";


export class UpPencil extends Pencil{

    constructor(top) {
        let image = Sprite.getImage('pencilUp');
        super(image,top);
    }

    draw() {
        this.y = this.top - this.height;
        super.draw();
    }
}