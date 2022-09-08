import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class AppComponent {
  title = 'AngularBingo';
  square_number: Array<number>;
  temp_number: Array<number>;
  circleVisible: boolean = false;
  number: number;  
  countDownNumber: number;
  countdownMessage: string = '';
  countdownVisible: boolean = false;
  happyNewYearVisible: boolean = false;
  countdowncircleVisible: boolean = false;
  interval: any;
  newYear: string = '2019/02/05 00:00:00';
  countdownFinished: boolean = false;

  constructor(private zone: NgZone) {
    this.square_number = [];
    this.temp_number = [];
    window.clearInterval(this.interval);
  }

  onResize(event): void {
    this.setHappyNewYearWidthHeight();
  }

  setHappyNewYearWidthHeight(): void {
    document.getElementById("happyNewYear").style.height = window.innerHeight + "px";
    document.getElementById("happyNewYear").style.width = window.innerWidth + "px";
  }

  ngOnInit(): void {
    this.initNumberArray();
    this.setHappyNewYearWidthHeight();
  }

  initNumberArray(): void {
    for(var i=1; i<100; i++) {
      this.temp_number.push(i);
    }
  }

  hideHappyNewYear(event): void {
    this.happyNewYearVisible = false;
    this.countdowncircleVisible = false;
  }

  countdown(event): void {    
    this.countdownVisible = !this.countdownVisible;
    let self = this;
    if (self.countdownFinished) {
      return;
    }
    window.clearInterval(this.interval);
    this.interval = window.setInterval(()=>{
      var timeDif = (new Date(self.newYear)).getTime() - (new Date()).getTime();
      var leftMins = (new Date(timeDif)).getUTCMinutes();
      var leftSecs = (new Date(timeDif)).getUTCSeconds();
      if (self.countdownFinished) {
        self.countdownMessage = ``;
        self.countdowncircleVisible = false;
        self.happyNewYearVisible = true;
        window.setTimeout(()=>{
          window.clearInterval(self.interval);
        }, 1000);
      } else {
        if (leftMins == 0) {
          self.countdownMessage = `距離己亥年還有 ${leftSecs} 秒`;
        } else {
          self.countdownMessage = `距離己亥年還有 ${leftMins} 分 ${leftSecs} 秒`;
        }
      }
      console.log(`${leftMins} 分 ${leftSecs} 秒`);
      if ((leftMins == 0 && leftSecs<=10)) {
        if (self.countdownVisible) {
          self.countdowncircleVisible = true;
          self.countdownMessage = ``;
          self.countDownNumber = leftSecs;
        }
      } 
      if (leftMins == 0 && leftSecs == 1) {
        self.countdownFinished = true;
      }       
    }, 500);
    
  }

  resetBingo(event): void {
    this.initNumberArray();
    this.square_number = [];
    this.circleVisible = false;
  }

  getNumber(event): void {
    if (this.temp_number.length == 0) {
      return;
    }
    let index: number = Math.floor((Math.random() * (this.temp_number.length)));
    this.number = this.temp_number[index];
    this.square_number.push(this.number);
    let self = this;
    this.temp_number = this.temp_number.filter(function(x){return x!=self.number});
    this.circleVisible = true;
  }

}
