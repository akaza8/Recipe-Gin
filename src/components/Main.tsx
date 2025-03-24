import React, { useState } from "react";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";
import ClaudeRecipe from "./ClaudeRecipe";

const Main = () => {
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const recipeSection = React.useRef<HTMLDivElement>(null);

  const addIngredient = (formData: any) => {
    const newIngredient = formData.get("ingredient");
    setIngredientList((oldList) => [...oldList, newIngredient]);
  };
  async function getRecipe() {
    setLoading(true);
    const recipe = await getRecipeFromMistral(ingredientList);
    setRecipe(recipe);
    setLoading(false);
    if (recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <main>
      <form action={addIngredient} className="addIngredientForm">
        <input type="text" name="ingredient" placeholder="eg. chicken" />
        <button type="submit">+Add Ingredient List</button>
      </form>
      {ingredientList.length < 4 && <div className="instruction">Please add atleast 4 ingredients to get a recipe</div>}
      {ingredientList.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredientList}
          getRecipe={getRecipe}
        />
      )}
      {loading ? (
        <div className="loader"></div>
      ) : (
        recipe && <ClaudeRecipe recipe={recipe} />
      )}
    </main>
  );
};

export default Main;

