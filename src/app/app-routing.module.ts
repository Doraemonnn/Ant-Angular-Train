import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 菜单配置
import { RouteData } from "./app-routes-data";

const routes: Routes = RouteData;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
