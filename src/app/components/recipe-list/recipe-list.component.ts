import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{
  recipes: any[] =[];
  searchQuery:string = '';
  constructor(private recipeService: RecipeService){}
  ngOnInit(): void {
    const storedResults = sessionStorage.getItem('searchResults');
    if(storedResults){
      this.recipes = JSON.parse(storedResults)
    }
  }

  searchRecipes(){
    if(this.searchQuery !== ''){
      this.recipeService.searchRecipes(this.searchQuery).subscribe((data:any) => {
        console.log(data.results)
        this.recipes = data.results;
        
      })
    }
    else {
      alert('You have to fill the serach')
    }
  }
}
