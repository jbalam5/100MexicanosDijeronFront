import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { ControlGameComponent } from './pages/control-game/control-game.component';

const routes: Routes = [
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'control-game',
    component: ControlGameComponent
  },
  {
    path: '',
    component: BoardComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicGameRoutingModule { }
