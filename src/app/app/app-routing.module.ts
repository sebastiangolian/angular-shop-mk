import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedGuard } from '../auth/guards/is-logged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/event', pathMatch: 'full'},
  { path: '*', redirectTo: '/event', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
  { path: 'event', loadChildren: () => import('../event/event.module').then(m => m.EventModule),canActivate: [IsLoggedGuard]},
  { path: 'photo', loadChildren: () => import('../photo/photo.module').then(m => m.PhotoModule),canActivate: [IsLoggedGuard] },
  { path: 'basket', loadChildren: () => import('../basket/basket.module').then(m => m.BasketModule),canActivate: [IsLoggedGuard] },
  { path: 'order', loadChildren: () => import('../order/order.module').then(m => m.OrderModule),canActivate: [IsLoggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
