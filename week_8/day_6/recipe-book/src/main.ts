import "./style.css";
import { v4 as uuidv4 } from "uuid";
import { RecipeItem } from "./model/RecipeItem";
import { RecipeCollection } from "./model/RecipeCollection";
import { RecipeTemplate } from "./templates/RecipeTemplate";


function mustGetEl<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Missing element with id="${id}"`);
  }
  return el as T;
}

function splitIngredients(raw: string): string[] {
 
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

const form = mustGetEl<HTMLFormElement>("recipeEntryForm");
const titleInput = mustGetEl<HTMLInputElement>("recipeTitle");
const ingredientsInput = mustGetEl<HTMLTextAreaElement>("ingredients");
const instructionsInput = mustGetEl<HTMLTextAreaElement>("instructions");
const container = mustGetEl<HTMLDivElement>("recipeContainer");
const clearBtn = mustGetEl<HTMLButtonElement>("clearRecipesButton");

const collection = new RecipeCollection();
collection.loadFromLocalStorage();

const template = new RecipeTemplate({ container, collection });
template.render();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const ingredients = splitIngredients(ingredientsInput.value);
  const instructions = instructionsInput.value.trim();

  if (!title || ingredients.length === 0 || !instructions) {
    return;
  }

  const recipe = new RecipeItem({
    id: uuidv4(),
    title,
    ingredients,
    instructions,
    isFavorite: false,
  });

  collection.add(recipe);
  template.render();

  form.reset();
  titleInput.focus();
});

clearBtn.addEventListener("click", () => {
  collection.clearAll();
  template.render();
});
