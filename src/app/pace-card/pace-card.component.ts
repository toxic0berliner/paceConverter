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
    this.paceToSpeed();
  }

  public setKmhs(event){
    this.speed=event.target.value;
    this.speedToPace();
  }

  public paceToSpeed() {
    console.log("paceToSpeed");
    var temp;
    temp=(this.mins*60)+this.secs;
    temp=(1/temp)*(60*60);
    this.speed=Math.round(temp * 100)/100;
  }

  public speedToPace() {
    console.log("speedToPace");
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
