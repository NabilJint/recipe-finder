import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum MealPlanDay {
  Monday  = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack'
}

export interface Meal {
  Type: MealType
  Recipes: any[];
}
export interface MealPlan {
  Day: MealPlanDay;
  Meals: Meal[];
}

export function stringToMealType(input: string): MealType | undefined {
  // Convert the string to a MealType value
  switch (input) {
    case MealType.Breakfast:
      return MealType.Breakfast;
    case MealType.Lunch:
      return MealType.Lunch;
    case MealType.Dinner:
      return MealType.Dinner;
    case MealType.Snack:
      return MealType.Snack;
    default:
      return undefined;
  }
}

export function stringToMealPlanDay(input: string): MealPlanDay | undefined {
  switch (input) {
    case MealPlanDay.Monday:
      return MealPlanDay.Monday;
    case MealPlanDay.Tuesday:
      return MealPlanDay.Tuesday;
    case MealPlanDay.Wednesday:
      return MealPlanDay.Wednesday;
    case MealPlanDay.Thursday:
      return MealPlanDay.Thursday;
    case MealPlanDay.Friday:
      return MealPlanDay.Friday;
    case MealPlanDay.Saturday:
      return MealPlanDay.Saturday;
    case MealPlanDay.Sunday:
      return MealPlanDay.Sunday;
    default:
      return undefined;
  }
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiKey = '016de696e626469e890451118d39a14e';
  private apiUrl = 'https://api.spoonacular.com/recipes';

  favoriteRecipes: any[]=[];
  mealPlans: MealPlan[] = [];

  constructor(private http:HttpClient) { }

  searchRecipes(query:string):Observable<any>{
    const url = `${this.apiUrl}/complexSearch`;
    const params = new HttpParams()
    .set('apiKey',this.apiKey)
    .set('query',query)
    .set('number','10')

    return this.http.get(url, {params}).pipe(
      tap((data:any) =>{
        sessionStorage.setItem('searchQuery',query);
        sessionStorage.setItem('searchResults',JSON.stringify(data.results))
      })
    )
  }

  getRecpeDetails(recipeId:any):Observable<any>{
    const url = `${this.apiUrl}/${recipeId}/information`;
    const params = new HttpParams().set('apiKey', this.apiKey);

    return this.http.get(url,{params})
  }





  getMealPlan(){
    this.sortMealPlan();
    return this.mealPlans
  }

  addToMealPlan(recipe:any, day:MealPlanDay, meal:MealType){
    var dayExists: boolean = false;
    for(let plan of this.mealPlans){
      if(plan.Day == day){
        var currentMeals = plan.Meals;
        var mealExists = currentMeals.filter((x) => {
          return x.Type == meal
        }).length > 0? true : false;

          if(mealExists){
            var indexMain: number;
            for(var i = 0; i < plan.Meals.length; i++){
              if(plan.Meals[i].Type == meal){
                indexMain = i;
              }
            }
            var filter = plan.Meals[indexMain!].Recipes.filter((x) => x.title == recipe.title);
            var result = filter.length > 0? filter[0]: null;
            if(!result){
              plan.Meals[indexMain!].Recipes.push(recipe)
            }
          } else {
            var newMeal: Meal = {
              Type: meal,
              Recipes: [recipe]
            };
            plan.Meals.push(newMeal);
          }
        dayExists = true;
      }
    }

    if(!dayExists) {
      var firstMeal: Meal = {
        Type: meal,
        Recipes: [recipe]
      }
      var newPlan: MealPlan = {
        Day: day,
        Meals: [firstMeal]
      }

      this.mealPlans.push(newPlan);
    }

    this.sortMealPlan();
  }

  sortByDay(a: MealPlan, b: MealPlan): number {
    const daysOrder = Object.values(MealPlanDay);

    const dayAIndex = daysOrder.indexOf(a.Day);
    const dayBIndex = daysOrder.indexOf(b.Day);

    return dayAIndex - dayBIndex;
  }

  sortMealPlan(){
    this.mealPlans.sort(this.sortByDay);
  }

  removeFromMealPlan(recipe:any, day:MealPlanDay, meal:MealType){
    for(let plan of this.mealPlans){
      if(plan.Day == day){
        for(let m of plan.Meals){
          if(m.Type == meal){
            var filter = m.Recipes.filter((x) => x.title == recipe.title);
            var result = filter.length > 0? filter[0]: null;
            if(result){
              var index: number;
              for(let i = 0; i < m.Recipes.length; i++){
                if(m.Recipes[i].title == recipe.title){
                  index = i;
                }
              }
              m.Recipes.splice(index!, 1);
            }
            if(m.Recipes.length == 0){
              var filterTwo = plan.Meals.filter((x) => x.Type == meal);
              var resultTwo = filterTwo.length > 0? filterTwo[0]: null;
              if(resultTwo){
                var index: number;
                for(let i = 0; i < plan.Meals.length; i++){
                  if(plan.Meals[i].Type == meal){
                    index = i;
                  }
                }
                plan.Meals.splice(index!, 1);
              }
            }
          }
        }
      }
    }
  }


}
