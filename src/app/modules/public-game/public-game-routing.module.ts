import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';

const routes: Routes = [
  {
    path: 'board',
    component: BoardComponent
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
