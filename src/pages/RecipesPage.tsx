import React, { useState, useEffect } from "react";
import CategoryFilter from "../components/recipe/CategoryFilter";
import RecipeGrid from "../components/recipe/RecipeGrid";
import CreateRecipe from "../components/recipe/CreateRecipe";
import { allCategories } from "../data/categories";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { createRecipe, getAllRecipes } from "../features/recipeSlice";

const RecipesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const dispatch = useDispatch<AppDispatch>();
  const { recipes } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  const handleCreateRecipe = (recipe: Recipe) => {
    const userId = localStorage.getItem("userId");
    dispatch(createRecipe({ ...recipe, userId }));
    // dispatch(createRecipe(recipe));
  };

  const handleToggleSave = (id: string) => {
    setSavedRecipes((prev) =>
      prev.includes(id)
        ? prev.filter((recipeId) => recipeId !== id)
        : [...prev, id]
    );
    console.log(id);
  };
  const filteredRecipes = recipes
    .filter((recipe) => recipe.userId === userId)
    .filter((recipe) => {
      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;

      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Explore Recipes
          </h1>
          <p className="text-gray-600">
            Discover delicious recipes for any occasion
          </p>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search recipes..."
            className="form-input pl-4 pr-4 py-2 w-full md:w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="btn-outline flex items-center md:w-auto w-full justify-center"
            onClick={() => setIsCreateOpen(true)}
          >
            + Create
          </button>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Recipes Grid */}
        <div className="mt-6 mb-10">
          {filteredRecipes.length > 0 ? (
            <RecipeGrid
              recipes={filteredRecipes.map((recipe) => ({
                ...recipe,
                isSaved: savedRecipes.includes(recipe.id),
              }))}
              onToggleSave={handleToggleSave}
            />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No recipes found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>

        {/* Create Recipe Modal */}
        <CreateRecipe
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreateRecipe}
        />
      </div>
    </div>
  );
};

export default RecipesPage;
