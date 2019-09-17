import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { ToastController, IonFab } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Button } from 'protractor';



@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {

  item: any;
  edit_item_form: FormGroup;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.item = this.itemService.getItemById(data.id)[0];
        //if item is undefined, go back to home
        if(!this.item){
          this.goBack();
        } else{
          this.edit_item_form = this.formBuilder.group({
            title: new FormControl(this.item.title, Validators.required),
            description: new FormControl(this.item.description, Validators.required),
            time: new FormControl(this.item.time, Validators.required)
          });
        }
      }
    )
  }
  

  goBack(){
    this.router.navigate(['/tabs/home']);
  }


  updateItem(value){
    let newValues = {
      id: this.item.id,
      title: value.title,
      description: value.description,
      time: value.time
    }
    this.itemService.updateItem(newValues);
    this.presentToastUpdate()
    this.goBack();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your tudu has been deleted.',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }
  async presentToastUpdate() {
    const toast = await this.toastController.create({
      message: 'Your tudu has been updated.',
      duration: 2000,
      color: 'tertiary',
      position: 'top'
    });
    toast.present();
  }

  async presentAlertMultipleButtons(item) {

    const alert = await this.alertController.create({
      header: 'Deleting item',
      message: 'Are you sure that you want to delete your todo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancelled')
          }
        },

        {
          text:'Delete',
          role:'delete',
          handler: () => {
            this.itemService.deleteItem(item)
            this.presentToast()
            this.goBack()  
          
        }
    }
  ]
    })
    await alert.present();

  }
}
