import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss'],
})
export class MealPlannerComponent implements OnInit{
  selectedRecipe:any;
  selectedDay!:any;
  selectedMeal!:string;
  favorite:any[]=[]
  mealPlans:any[]=[];



 
  ngOnInit(): void {
   this.getMealPlans();
   this.getFavorite();
  }


  constructor(private recipeService:RecipeService, private  favoriteRecipe: FavoriteService ){}

  getMealPlans(){
    this.mealPlans = this.recipeService.getMealPlan();
    console.log(this.mealPlans);
    
  }
  addToMealPlans(recipe:any, day:string, meal:string){
    this.recipeService.addToMealPlan(recipe,day,meal)
    
    this.getMealPlans()
  }
  removeFromMealPlan(day:string, meal:string, recipe:any){
    this.recipeService.removeFromMealPlan(day,meal,recipe);
    this.getMealPlans()
  }
  clearSelection(){
    this.selectedRecipe = null;
    
  }
  clearMealPlan() {
    this.selectedDay = '';
    this.selectedMeal = '';
   
  }
  
  selectRecipe(recipe:any){
    this.selectedRecipe = recipe
  }

 getFavorite(){
  this.favorite = this.favoriteRecipe.getFavoriteRecipes()
 }
}
