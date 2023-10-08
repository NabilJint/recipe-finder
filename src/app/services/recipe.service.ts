import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiKey = '016de696e626469e890451118d39a14e';
  private apiUrl = 'https://api.spoonacular.com/recipes';

  favoriteRecipes: any[]=[];
  maelplans:any={};

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
    return this.maelplans
  }

  addToMealPlan(recipe:any, day:string, meal:string){
    if(!this.maelplans[day]){
      this.maelplans[day] ={};
    }
    if(!this.maelplans[day][meal]){
      this.maelplans[day][meal] =[];
    }
    
    this.maelplans[day][meal].push(recipe)

    // if(!day){
    //   throw new Error('Day cannot be empty.');
    //  }
    //  if(!meal){
    //   throw new Error('Meal cannot be empty')
    //  }
    //  const mealPlanIndex= this.maelplans.findIndex((mealPlan:any) => mealPlan.day === day && mealPlan.meal === meal)
    //  if(mealPlanIndex === -1){
    //  this.maelplans.push({
    //   day,
    //   meal,
    //   recipes: [recipe]
    //  })
    //  } else{
    //   this.maelplans[mealPlanIndex].recipes.push(recipe)
    //  }
    // }
  
  }

  removeFromMealPlan(day:string, meal:string,recipe:any){
    if(this.maelplans[day] && this.maelplans[day][meal]){
      const index = this.maelplans[day][meal].findIndex((mealRecipe: { id: any; }) => mealRecipe.id === recipe.id)
      if(index!== -1){
        this.maelplans[day][meal].splice(index, 1);
      }
    }
  }

  
}
