import { Component, OnInit, Input/*,OnChanges, SimpleChange*/ } from '@angular/core';

@Component({
  selector: 'app-pace-card',
  templateUrl: './pace-card.component.html',
  styleUrls: ['./pace-card.component.css']
})
export class PaceCardComponent implements OnInit {

  @Input() mins: number;
  @Input() secs: number;
  @Input() speed: number;
  @Input() unit: string;

  constructor() { }

  ngOnInit() {
    this.unit="kmh";
  }

  public setMins(event){
    this.mins=parseInt(event.target.value);
    this.paceToSpeed();
  }

  public setSecs(event){
    this.secs=parseInt(event.target.value);

    // if we have no minutes, set them to 0
    if (!(this.mins)) {
      this.mins=0;
    }

    // when inputing a high number of seconds, translate it to mins:secs
    if (this.minsFromSecs(this.secs)>1) {
      this.mins=this.minsFromSecs(this.secs);
      this.secs=this.remainingSecs(this.secs);
    }

    // when increasing above 60 seconds, increase the minute and fall back to "0"
    if (this.minsFromSecs(this.secs)==1) {
      this.mins=this.mins+1;
      this.secs=this.remainingSecs(this.secs);
    }

    // when decreasing below zero, try removing a minute and fall back to 59
    if (this.secs < 0) {
      this.mins=Math.max(this.mins-1,0);
      this.secs=59;
    }
    this.paceToSpeed();
  }

  public setKmhs(event){
    this.speed=event.target.value;
    this.speedToPace();
  }

  public paceToSpeed() {
    //console.log("paceToSpeed");
    var temp;
    var secs;
    var mins;
    if( this.secs ) {
      secs=this.secs;
    } else {
      secs=0;
    }
    if( this.mins ) {
      mins=this.mins;
    } else {
      mins=0;
    }
    //console.log("mins="+mins+" secs="+secs);
    temp=(mins*60)+secs;
    temp=(1/temp)*(60*60);
    this.speed=Math.round(temp * 100)/100;
  }

  public speedToPace() {
    //console.log("speedToPace");
    var temp = (1/this.speed)*60*60;
    this.mins=this.minsFromSecs(temp);
    this.secs=Math.round(this.remainingSecs(temp));
  }

  private remainingSecs(totalSecs) {
    return totalSecs%60;
  }

  private minsFromSecs(totalSecs) {
    totalSecs=totalSecs-this.remainingSecs(totalSecs);
    return totalSecs/60;
  }

}
