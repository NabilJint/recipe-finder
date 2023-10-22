import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MealPlan, MealPlanDay, MealType, RecipeService, stringToMealPlanDay, stringToMealType } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss'],
})
export class MealPlannerComponent implements OnInit{
  selectedRecipe:any;
  mealPlanDayArray: string[] = Object.values(MealPlanDay);
  mealPlanTypeArray: string[] = Object.values(MealType);
  selectedDay!: string | null;
  selectedMeal!: string | null;
  favorite:any[]=[]
  mealPlans:MealPlan[]=[];




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
    this.recipeService.addToMealPlan(recipe,stringToMealPlanDay(day)!,stringToMealType(meal)!)

    this.getMealPlans()
  }
  removeFromMealPlan(recipe:any, day:string, meal:string){
    this.recipeService.removeFromMealPlan(recipe,stringToMealPlanDay(day)!,stringToMealType(meal)!);
    this.getMealPlans()
  }
  clearSelection(){
    this.selectedRecipe = null;

  }
  clearMealPlan() {
    this.selectedDay = null;
    this.selectedMeal = null;
  }

  selectRecipe(recipe:any){
    this.selectedRecipe = recipe
  }

 getFavorite(){
  this.favorite = this.favoriteRecipe.getFavoriteRecipes()
 }

 get currentRecipes(): any[]{
    var filter = this.mealPlans.filter((x) => x.Day == this.selectedDay);
    var currentPlan = filter.length > 0? filter[0]: null;
    if(currentPlan){
      var filterTwo = currentPlan.Meals.filter((x) => x.Type == this.selectedMeal);
      var currentMeal = filterTwo.length > 0? filterTwo[0]: null;
      if(currentMeal){
        return currentMeal.Recipes;
      }
      return [];
    }
    return [];
 }

}
