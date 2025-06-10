import React from "react";
import RecipeCard, { RecipeCardProps } from "./RecipeCard";

interface RecipeGridProps {
  recipes: RecipeCardProps[];
  onToggleSave?: (id: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onToggleSave }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id ?? index}
          {...recipe}
          onToggleSave={() => onToggleSave && onToggleSave(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
