import { defineMcp } from "@lovable.dev/mcp-js";
import searchRecipes from "./tools/search-recipes";
import getRecipe from "./tools/get-recipe";
import generateRecipeIdea from "./tools/generate-recipe-idea";

export default defineMcp({
  name: "cucharon-de-amor-mcp",
  title: "Un Cucharón de Amor",
  version: "0.1.0",
  instructions:
    "Tools for Un Cucharón de Amor, a gentle-on-the-body Spanish recipe app. Use `search_recipes` to browse the published recipe library, `get_recipe` to fetch full ingredients and steps, and `generate_recipe_idea` to create a new recipe from an ingredient or mood.",
  tools: [searchRecipes, getRecipe, generateRecipeIdea],
});