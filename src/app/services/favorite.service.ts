import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: any[] = [];
  private favoriteRecipes: any[] =[];
  private favoritesChangedSubject = new BehaviorSubject<any>('');
  get favoritesChanged() {
    return this.favoritesChangedSubject.asObservable();
  }
  constructor() { 
    const storedFavorite = sessionStorage.getItem('favoriteRecipe');
    if(storedFavorite){
      this.favoriteRecipes = JSON.parse(storedFavorite)
    }
  }

  addToFavorite(recipe:any){
    

      this.favoriteRecipes.push(recipe)
      sessionStorage.setItem('favoriteRecipe',JSON.stringify(this.favoriteRecipes))
      this.favoritesChangedSubject.next('');
    
  }
  getFavoriteRecipes():any[]{
    const StoredFavoriteRecipes = sessionStorage.getItem('favoriteRecipe');
    if(StoredFavoriteRecipes){
      return JSON.parse(StoredFavoriteRecipes);
    }else{

      return this.favoriteRecipes;
    }
  }
  removeFromFavorites(recipe: any): void {
    const index = this.favoriteRecipes.findIndex((r) => r.id === recipe.id);
    if (index !== -1) {
      this.favoriteRecipes.splice(index, 1);
      sessionStorage.setItem('favoriteRecipe',JSON.stringify(this.favoriteRecipes))
      this.favoritesChangedSubject.next('');
    }
  }

  isRecipeInFavorites(recipe: any): boolean {
    return this.favoriteRecipes.some((r) => r.id === recipe.id);
  }


  saveFavoriteState() {
    localStorage.setItem('favoriteRecipes', JSON.stringify(this.favorites));
  }


}
