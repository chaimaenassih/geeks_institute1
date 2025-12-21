import { RecipeItem } from "./RecipeItem";

type RecipeItemDTO = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
};

export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private readonly storageKey: string;

  constructor(storageKey = "recipeBook.recipes") {
    this.storageKey = storageKey;
  }

  getAll(): RecipeItem[] {
    // copie pour éviter les modifications directes depuis l’extérieur
    return [...this.recipes];
  }

  add(recipe: RecipeItem): void {
    this.recipes = [recipe, ...this.recipes];
    this.saveToLocalStorage();
  }

  remove(id: string): void {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    this.saveToLocalStorage();
  }

  toggleFavorite(id: string): void {
    const target = this.recipes.find((r) => r.id === id);
    if (!target) return;
    target.toggleFavorite();
    this.saveToLocalStorage();
  }

  clearAll(): void {
    this.recipes = [];
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    const dto: RecipeItemDTO[] = this.recipes.map((r) => ({
      id: r.id,
      title: r.title,
      ingredients: r.ingredients,
      instructions: r.instructions,
      isFavorite: r.isFavorite,
    }));

    localStorage.setItem(this.storageKey, JSON.stringify(dto));
  }

  loadFromLocalStorage(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      this.recipes = [];
      return;
    }

    try {
      const parsed = JSON.parse(raw) as RecipeItemDTO[];
      if (!Array.isArray(parsed)) {
        this.recipes = [];
        return;
      }

      this.recipes = parsed.map(
        (x) =>
          new RecipeItem({
            id: x.id,
            title: x.title,
            ingredients: Array.isArray(x.ingredients) ? x.ingredients : [],
            instructions: x.instructions ?? "",
            isFavorite: Boolean(x.isFavorite),
          })
      );
    } catch {
      // donnée corrompue => reset
      this.recipes = [];
    }
  }
}
