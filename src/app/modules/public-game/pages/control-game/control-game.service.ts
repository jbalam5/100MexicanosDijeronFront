import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

  export class ControlGameService {
    constructor(){}

    public audioIntro:string = "/audio2.wav";
    public audioStrike:string = "/audio5.wav";
    public audioFinishedRound:string = "/audio4.wav";
    public audioAnswerd:string = "/audio3.wav";

    play(audioName:string){
        let audio = new Audio();
        audio.src = audioName;
        audio.load();
        audio.play();
    }
  }