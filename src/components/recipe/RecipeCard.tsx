import React from "react";
import { Link } from "react-router-dom";
import { Clock, Flame, Heart } from "lucide-react";
import { motion } from "framer-motion";

export interface RecipeCardProps {
  _id: string;
  title: string;
  image: string;
  prepTime: number;
  calories: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  isSaved?: boolean;
  onToggleSave?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  _id,
  title,
  image,
  prepTime,
  calories,
  category,
  difficulty,
  isSaved = false,
  onToggleSave,
}) => {
  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      className="card group hover:shadow-lg"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative">
        <Link to={`/recipes/${_id}`}>
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </Link>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="recipe-tag">{category}</span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColor[difficulty]}`}
          >
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "Uncategorized"}
          </span>
        </div>

        <Link to={`/recipes/${_id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{prepTime} min</span>
          </div>
          <div className="flex items-center">
            <Flame className="h-4 w-4 mr-1" />
            <span>{calories} cal</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
