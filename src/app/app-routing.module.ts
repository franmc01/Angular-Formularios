import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactivosComponent } from './pages/reactivos/reactivos.component';
import { TemplateComponent } from './pages/template/template.component';

const ROUTES: Routes = [
  { path: 'reactivos', component: ReactivosComponent },
  { path: 'template', component: TemplateComponent },
  { path: '**', pathMatch: 'full', redirectTo : 'reactivos' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
