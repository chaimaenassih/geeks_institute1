export class RecipeItem {
  public readonly id: string;
  public title: string;
  public ingredients: string[];
  public instructions: string;
  public isFavorite: boolean;

  constructor(params: {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    isFavorite?: boolean;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.ingredients = params.ingredients;
    this.instructions = params.instructions;
    this.isFavorite = params.isFavorite ?? false;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
