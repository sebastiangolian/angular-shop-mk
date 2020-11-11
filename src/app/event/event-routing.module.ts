import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './pages/event/event.component';

const routes: Routes = [
  { path: '', component: EventComponent },
  { path: ':id', component: EventComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
