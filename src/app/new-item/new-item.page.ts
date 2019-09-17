import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {

  new_item_form: FormGroup;

  constructor(
    public toastController: ToastController,
    private router: Router,
    public formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });
  }

  goBack(){
    this.router.navigate(['/tabs/home']);
  }

  createItem(value){
    
    this.itemService.createItem(value.title, value.description, value.time);
    this.new_item_form.reset();
    this.presentToast()
    this.goBack();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your tudu has been added.',
      duration: 2000,
      position:'top',
      color:'success'
    });
    toast.present();
  }

}
