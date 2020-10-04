import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
  
}
)

export class CalModalPage implements AfterViewInit {
  calendar = {
    mode: 'month',
    currentDate: new Date()

  };
  viewTitle: string;

  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true,
    expdate: this.getSelectedDate(),
    selectedMonth: this.getSelectedDate().split(" ")[0],
    selectedDay: this.getSelectedDate().split(" ")[1],
    selectedYear: this.getSelectedDate().split(" ")[2]
    
  
  };

  modalReady = false;
  
 
  constructor(private modalCtrl: ModalController,
              private storage: Storage) { }
 
  //This function loads all information needed when started up window such as the selected date
  ngAfterViewInit() {
    
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
    
    this.event.selectedMonth = this.event.expdate.split(' ')[0]
    this.event.selectedDay =  this.event.expdate.split(' ')[1] 
    this.event.selectedYear = this.event.expdate.split(' ')[2]
  }


  //This function gets the date that the user has selected from the main menu
  getSelectedDate(){
    var year_month_temp = document.getElementsByClassName("ion-text-center md hydrated")[0].innerHTML.split(">")[1]
    var year_month = year_month_temp.split("<")[0]
    
    var day = document.getElementsByClassName("monthview-selected")[0].innerHTML.split(" ")[1]
    var year = year_month.split(" ")[1]
    var month = year_month.split(" ")[0]
    
    var full_date = month+" "+day+" "+year
    return full_date;

  }
 //This function gets the info that was inputted and puts it in the calendar
  save() { 
    var n = 0
    this.event.startTime = new Date(this.readDescription())
    this.storage.set('fooditem'+this.increaseVal(),this.event);
    this.modalCtrl.dismiss({event: this.event})

    
  }

  //This function allows changes to be made in the menu, such as the date
  readDescription(){
    var date_curr = this.event.selectedMonth + " " + this.event.selectedDay + " "+ this.event.selectedYear
    return date_curr
    
    
    
  }
  
  increaseVal()
  {
    
      var value = parseInt(document.getElementById('number').innerHTML)
      value+=1
      document.getElementById('number').innerHTML = value.toString();
      return document.getElementById('number').innerHTML
      
  }


  close() {
    this.modalCtrl.dismiss();
  }
}
