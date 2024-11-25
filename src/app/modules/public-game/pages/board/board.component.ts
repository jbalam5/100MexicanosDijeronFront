import { Component } from '@angular/core';
import { Question } from '../../../models/question.model';
import { Score } from '../../../models/score.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  public currentTextQuestion:any= "Bienvenidos!!!";
  public currentQuestion:Question|null = null;
  public currentScore:Score = new Score();

  ngOnInit(): void {
    this.currentQuestion = JSON.parse(localStorage.getItem('currentQuestion') || "")

    window.addEventListener('storage', () => {
      this.currentQuestion = JSON.parse(localStorage.getItem('currentQuestion') || "");
      this.currentScore = JSON.parse(localStorage.getItem('currentScore') || "");
      this.currentTextQuestion = this.currentQuestion?.question || "Bienvenidos !!!";

      this.updateScore();
      
    });    
  }

  updateScore(){
    if(!this.currentScore.isFinished){
      return;
    }
    
    if(this.currentScore.totalTeamOne === this.currentScore.totalTeamTwo){
      Swal.fire("Equipos empatados", "", "success");
    }else if (this.currentScore.totalTeamOne >= this.currentScore.totalTeamTwo){
      Swal.fire("Ganador: Equipo 1", "", "success");
    }else{
      Swal.fire("Ganador: Equipo 2", "", "success");
    }
  }

  getCounterError(i: number) {
    return new Array(i);
  }
}
