import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { Question } from '../../../models/question.model';
import { Score } from '../../../models/score.model';
import { ControlGameService } from './control-game.service';
// import * as JSONData from '../../../../../../public/questions.json';

@Component({
  selector: 'app-control-game',
  imports: [],
  templateUrl: './control-game.component.html',
  styleUrl: './control-game.component.scss'
})
export class ControlGameComponent {
  public currentTextQuestion:string= "Bienvenido!!!";
  public questions:Question[] = [
    {
      id: 1,
      question: "Menciona un animal con 4 patas",
      answers: [
        {
          text: "Perro",
          value: 50,
          visible: false
        },
        {
          text: "Gato",
          value: 30,
          visible: false
        },
        {
          text: "Raton",
          value: 25,
          visible: false
        },
        {
          text: "Mosca",
          value: 10,
          visible: false
        }
      ]
    },
    {
      id: 2,
      question: "Menciona un lugar para cenar",
      answers: [
        {
          text: "Restaurant",
          value: 50,
          visible: false
        },
        {
          text: "Cocina econocmica",
          value: 30,
          visible: false
        },
        {
          text: "Los tacos",
          value: 25,
          visible: false
        },
        {
          text: "Cine",
          value: 10,
          visible: false
        }
      ]
    },
    {
      id: 3,
      question: "Menciona un animal con 4 patas",
      answers: [
        {
          text: "Perro",
          value: 50,
          visible: false
        },
        {
          text: "Gato",
          value: 30,
          visible: false
        },
        {
          text: "Raton",
          value: 25,
          visible: false
        },
        {
          text: "Mosca",
          value: 10,
          visible: false
        }
      ]
    },
    {
      id: 4,
      question: "Menciona un lugar para cenar",
      answers: [
        {
          text: "Restaurant",
          value: 50,
          visible: false
        },
        {
          text: "Cocina econocmica",
          value: 30,
          visible: false
        },
        {
          text: "Los tacos",
          value: 25,
          visible: false
        },
        {
          text: "Cine",
          value: 10,
          visible: false
        }
      ]
    }
  ];

  public currentQuestion:Question|undefined = undefined;
  public currentScore:Score = new Score();
  private isFinishedRound:boolean = false;

  constructor(
    private controlGameService:ControlGameService
  ){ 
    controlGameService.getQuestions().then(response=> {
      this.questions = response;
    });
  }

  public showAnswer(data:any){
    console.log(data);
    data.visible = !data.visible;
    
    if(!this.isFinishedRound){
      if(data.visible){
        this.currentScore.totalPoints += data.value;
        this.controlGameService.play(this.controlGameService.audioAnswerd);
      }else{
        this.currentScore.totalPoints -= data.value;
      }
    }

    this.updateInfo();

  }

  newGame(){
    Swal.fire({
      title: "¿Iniciar nueva partida?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        this.currentScore = new Score();
        this.currentScore.currentRound = 1;
        
        this.questions = this.questions.sort(()=> Math.random() - 0.5);
        this.currentQuestion = new Question();
        this.isFinishedRound = false;
        
        this.getNextQuestion();
        this.updateInfo();
        Swal.fire("Partida Iniciada", "", "success");
        this.controlGameService.play(this.controlGameService.audioIntro);
      }
    });
  }

  async finishedRound(){
    if(this.currentScore.currentRound <= 0){
      return;
    }

    if(this.currentScore.totalPoints <= 0){
      return;
    }

    const { value: team } = await Swal.fire({
      title: "Ronda Finalizada",
      input: "select",
      inputOptions: {
        teamOne: "Equipo 1",
        teamTwo: "Equipo 2"
      },
      inputPlaceholder: "Seleccione el equipo ganador",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve("Seleccione el equipo ganador");
          }
        });
      }
    });

    if (team === "teamOne") {
      this.currentScore.totalTeamOne += this.currentScore.totalPoints;
    }else{
      this.currentScore.totalTeamTwo += this.currentScore.totalPoints;
    }

    this.isFinishedRound = true;
    this.currentScore.totalPoints = 0;
    this.currentScore.totalError = 0;

    this.updateInfo();
    this.controlGameService.play(this.controlGameService.audioFinishedRound);
  }

  async nextRound(){
    if(this.currentScore.currentRound <= 0){
      return;
    }

    if(!this.isFinishedRound){
      this.finishedRound();
    }

    this.currentScore.currentRound += 1;

    this.isFinishedRound = false;
    this.getNextQuestion();
    this.updateInfo();
    this.controlGameService.play(this.controlGameService.audioIntro);
  }

  addStrike(){
    if(this.isFinishedRound){
      return;
    }
    
    if(this.currentScore.currentRound <= 0){
      return;
    }

    if(this.currentScore.totalError < 3){
      this.controlGameService.play(this.controlGameService.audioStrike);
      this.currentScore.totalError += 1;
      this.updateInfo();
    }
  }

  finishGame(){
    this.currentQuestion = new Question();
    this.currentScore = new Score();
    this.currentScore.isFinished = true;

    this.updateInfo();
  }

  getNextQuestion(){
    if(this.questions){
      if((this.currentScore.currentRound-1) <= this.questions.length ){
        this.currentQuestion = this.questions[this.currentScore.currentRound-1]
      }
    } 

    if(this.currentQuestion){
      this.currentTextQuestion = this.currentQuestion.question;
      console.log(this.questions);
      console.log(this.currentQuestion);
    }else{
      this.currentScore.isFinished = true;
      this.updateInfo();
      
      this.currentQuestion = new Question();
      
      if(this.currentScore.totalTeamOne === this.currentScore.totalTeamTwo){
        Swal.fire("Equipos empatados", "", "success");
      }else if (this.currentScore.totalTeamOne >= this.currentScore.totalTeamTwo){
        Swal.fire("Ganador: Equipo 1", "", "success");
      }else{
        Swal.fire("Ganador: Equipo 2", "", "success");
      }

      this.currentScore = new Score();
      this.currentTextQuestion = "Bienvenido!!!";
      this.updateInfo();
      
    }
  }

  updateInfo(){
    localStorage.setItem("currentScore", JSON.stringify(this.currentScore))
    localStorage.setItem('currentQuestion', JSON.stringify(this.currentQuestion));
  }

  getCounterError(i: number) {
    return new Array(i);
  }
}
