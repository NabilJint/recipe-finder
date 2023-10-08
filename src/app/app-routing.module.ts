import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { FavriteComponent } from './components/favrite/favrite.component';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

const routes: Routes = [
  {path:'',redirectTo:'/search', pathMatch:'full'},
  {path:'search', component:RecipeListComponent},
  {path:'favorites', component:FavriteComponent},
  {path:'meal-plan', component:MealPlannerComponent},
  { path: 'recipe/:id', component: RecipeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
