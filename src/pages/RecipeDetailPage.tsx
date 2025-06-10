import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Users,
  Flame,
  Printer,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { allRecipes } from "../data/recipes";
import { motion } from "framer-motion";
import { getRecipeById } from "../features/recipeSlice";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [servings, setServings] = useState(4);
  const navigate = useNavigate();
  const recipe = useSelector(
    (state: RootState) => state.recipes.selectedRecipe
  );
  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  if (!recipe) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <Link to="/recipes" className="btn-primary">
          Back to recipes
        </Link>
      </div>
    );
  }

  const handleServingsChange = (change: number) => {
    const newServings = servings + change;
    if (newServings >= 1 && newServings <= 12) {
      setServings(newServings);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateAmount = (baseAmount: number) => {
    const ratio = servings / 4;
    return (baseAmount * ratio).toFixed(1).replace(/\.0$/, "");
  };

  return (
    <div>
      <div className="bg-gray-100 py-4">
        <div className="container-custom">
          <Link
            to="/recipes"
            className="inline-flex items-center text-gray-600 hover:text-primary-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to recipes
          </Link>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  {recipe.title}
                </h1>
                <p className="text-gray-600 mb-4">{recipe.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="recipe-tag">{recipe.category}</span>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{recipe.prepTime} min</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{servings} servings</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Flame className="w-4 h-4 mr-1" />
                    <span>{recipe.calories} cal/serving</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="btn btn-outline" onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </button>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden mb-8">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-display font-bold">
                      Ingredients
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleServingsChange(-1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        disabled={servings <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium">{servings} servings</span>
                      <button
                        onClick={() => handleServingsChange(1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        disabled={servings >= 12}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                        <span>
                          <strong>
                            {calculateAmount(ingredient.amount)}{" "}
                            {ingredient.unit}
                          </strong>{" "}
                          {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-display font-bold mb-4">
                    Nutrition per serving
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Calories</p>
                        <p className="font-bold">{recipe.calories} kcal</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Protein</p>
                        <p className="font-bold">{recipe.nutrition.protein}g</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Carbs</p>
                        <p className="font-bold">{recipe.nutrition.carbs}g</p>
                      </div>
                      <div className="border-b pb-2">
                        <p className="text-sm text-gray-600">Fat</p>
                        <p className="font-bold">{recipe.nutrition.fat}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Fiber</p>
                        <p className="font-bold">{recipe.nutrition.fiber}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sugar</p>
                        <p className="font-bold">{recipe.nutrition.sugar}g</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold mb-4">
                  Instructions
                </h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="pt-1">
                        <p>{instruction}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Notes</h2>
                <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
                  <p>{recipe.notes}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-xl mb-4">Recipe Actions</h3>

              <div className="space-y-3">
                <button
                  className="btn btn-secondary w-full"
                  onClick={() =>
                    navigate("/grocery-list", {
                      state: {
                        title: recipe.title,
                        ingredients: recipe.ingredients.map((i) => ({
                          ...i,
                          amount: calculateAmount(parseFloat(i.amount)),
                        })),
                      },
                    })
                  }
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Grocery List
                </button>
              </div>

              <div className="border-t my-6"></div>

              <div>
                <h3 className="font-bold text-lg mb-3">You might also like</h3>
                <div className="space-y-4">
                  {allRecipes
                    .filter(
                      (r) => r.id !== id && r.category === recipe.category
                    )
                    .slice(0, 3)
                    .map((relatedRecipe) => (
                      <Link
                        key={relatedRecipe.id}
                        to={`/recipes/${relatedRecipe.id}`}
                        className="flex items-start group"
                      >
                        <img
                          src={relatedRecipe.image}
                          alt={relatedRecipe.title}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-primary-600 transition-colors">
                            {relatedRecipe.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{relatedRecipe.prepTime} min</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
