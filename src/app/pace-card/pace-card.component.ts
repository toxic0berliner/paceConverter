import { Component, OnInit, Input/*,OnChanges, SimpleChange*/ } from '@angular/core';
import {trigger,state,style,transition,animate,keyframes} from "@angular/animations";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SlideInOutAnimation } from "./animations";

@Component({
  selector: 'app-pace-card',
  templateUrl: './pace-card.component.html',
  styleUrls: ['./pace-card.component.css'],
  animations: [SlideInOutAnimation]
})
export class PaceCardComponent implements OnInit {

  @Input() mins: number;
  @Input() secs: number;
  @Input() speed: number;
  @Input() unit: string;
  public controlsCollapsed: boolean;
  animationState = "in";

  constructor() { }

  ngOnInit() {
    this.unit="kmh";
  }

  /*onSwipeRight = function(ev, target) {
      alert('You swiped right!!');

      console.log('Event Target: ', ev.target);
      console.log('Event Current Target: ', ev.currentTarget);
      console.log('Original Current Target: ', target.current);
    };*/

  public setMinsEvent(event){
    this.setMins(parseInt(event.target.value));
    if (event.target.value > 1 ) {
      document.getElementById("secs").focus();
      //document.getElementById("secs").setSelectionRange(0, document.getElementById("secs").value.length)
      //ugly hack to select all content after focusing the secs field :
      setTimeout(function () { var temp=document.getElementById("secs") as HTMLInputElement; temp.select(); }, 10);
    }

  }

  public setMins(m){
    this.mins=parseInt(m);
    this.paceToSpeed();
  }

  public setSecsEvent(event){
    this.setSecs(parseInt(event.target.value));
  }

  public setSecs(s){
    this.secs=parseInt(s);
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

  public setSpeedEvent(event){
    this.setSpeed(event.target.value);
  }

  public setSpeed(s){
    this.speed=parseFloat(s);
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

  public addSpeed(s) {
    if (!(this.speed)) {
      this.speed=0;
    }
    this.speed=this.speed+s;
    this.speedToPace();
  }

  public addMins(m) {
    if (!(this.mins)) {
      this.mins=0;
    }
    this.setMins(this.mins+m);
  }

  public addSecs(m) {
    if (!(this.secs)) {
      this.secs=0;
    }
    this.setSecs(this.secs+m);
  }

  public toggleControls() {
    this.controlsCollapsed = this.controlsCollapsed ? false : true;
    this.animationState = this.animationState === "out" ? "in" : "out";
  }

}
