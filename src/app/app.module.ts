import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { FavriteComponent } from './components/favrite/favrite.component';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FavoriteService } from './services/favorite.service';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    FavriteComponent,
    MealPlannerComponent,
    NavBarComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
