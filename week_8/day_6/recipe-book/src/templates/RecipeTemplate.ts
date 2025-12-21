import { RecipeCollection } from "../model/RecipeCollection";
import { RecipeItem } from "../model/RecipeItem";

export class RecipeTemplate {
  private container: HTMLElement;
  private collection: RecipeCollection;

  constructor(params: { container: HTMLElement; collection: RecipeCollection }) {
    this.container = params.container;
    this.collection = params.collection;
  }

  render(): void {
    const recipes = this.collection.getAll();

    this.container.innerHTML = "";

    if (recipes.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "No recipes yet. Add your first recipe!";
      this.container.appendChild(empty);
      return;
    }

    for (const recipe of recipes) {
      this.container.appendChild(this.createRecipeCard(recipe));
    }
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.dataset.recipeId = recipe.id;

    const header = document.createElement("div");
    header.className = "recipe-card__header";

    const title = document.createElement("h3");
    title.textContent = recipe.title;

    const actions = document.createElement("div");
    actions.className = "recipe-card__actions";

    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.textContent = recipe.isFavorite ? "★ Favorite" : "☆ Favorite";
    favBtn.addEventListener("click", () => {
      this.collection.toggleFavorite(recipe.id);
      this.render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      this.collection.remove(recipe.id);
      this.render();
    });

    const toggleDetailsBtn = document.createElement("button");
    toggleDetailsBtn.type = "button";
    toggleDetailsBtn.textContent = "Show details";

    actions.appendChild(favBtn);
    actions.appendChild(toggleDetailsBtn);
    actions.appendChild(deleteBtn);

    header.appendChild(title);
    header.appendChild(actions);

    const details = document.createElement("div");
    details.className = "recipe-card__details";
    details.hidden = true;

    // Ingredients
    const ingTitle = document.createElement("h4");
    ingTitle.textContent = "Ingredients";

    const ingList = document.createElement("ul");
    for (const ing of recipe.ingredients) {
      const li = document.createElement("li");
      li.textContent = ing;
      ingList.appendChild(li);
    }

    // Instructions
    const instTitle = document.createElement("h4");
    instTitle.textContent = "Instructions";

    const inst = document.createElement("p");
    inst.textContent = recipe.instructions;

    details.appendChild(ingTitle);
    details.appendChild(ingList);
    details.appendChild(instTitle);
    details.appendChild(inst);

    toggleDetailsBtn.addEventListener("click", () => {
      details.hidden = !details.hidden;
      toggleDetailsBtn.textContent = details.hidden ? "Show details" : "Hide details";
    });

    card.appendChild(header);
    card.appendChild(details);

    // petit marquage visuel si favori
    if (recipe.isFavorite) {
      card.setAttribute("data-favorite", "true");
    }

    return card;
  }
}
