import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Array<any> = [
   
  ]

  constructor() { }

  createItem(title, description, time){

    let randomId = Math.random().toString(36).substr(2, 5);

    this.items.push({
      'id': randomId,
      'title': title,
      'description': description,
      'time': time
    });
  }

  getItems(){
    return this.items;
  }

  getItemById(id){
    return this.items.filter(item => item.id === id);
  }

  updateItem(newValues){
    let itemIndex = this.items.findIndex(item => item.id == newValues.id);
    this.items[itemIndex] = newValues;
  }

  deleteItem(selected){
    return  this.items.splice(selected, 1)
  }
}
