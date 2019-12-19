import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";
export class Director {
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }

    return Director.instance;
  }

  constructor() {
    this.datastore = DataStore.getInstance();
    this.landSpeed = 2;
  }

  createPencil() {
    const minTop = window.innerHeight / 8;
    const maxTop = window.innerHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.datastore.get('pencils').push(new UpPencil(top));
    this.datastore.get('pencils').push(new DownPencil(top));
  }

  run() {
    this.datastore.get('background').draw();
    this.datastore.get('pencils').forEach(function (value) {
      value.draw();
    });
    this.datastore.get('land').draw();
    let timer = requestAnimationFrame(() => this.run());
    this.datastore.put('timer', timer);
  }

}
//# sourceMappingURL=Director.js.map