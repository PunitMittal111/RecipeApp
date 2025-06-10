import React, { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getAllRecipes, Recipe, getRecipeById } from "../features/recipeSlice";
import { Link } from "react-router-dom";

interface MealSlot {
  type: "breakfast" | "lunch" | "dinner";
  recipeId: string | null;
}

type DailyPlan = {
  [key in "breakfast" | "lunch" | "dinner"]: Recipe | null;
};

interface WeeklyPlan {
  [date: string]: DailyPlan;
}

interface DragData {
  recipe: Recipe;
  sourceDay: string;
  sourceMealType: keyof DailyPlan;
}

const MealPlannerPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes } = useSelector((state: RootState) => state.recipes);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: 1 })
  );

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<DragData | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<{
    day: string;
    mealType: keyof DailyPlan;
  } | null>(null);

  // Initialize empty meal plan for the week
  const loadWeeklyPlanFromStorage = (): WeeklyPlan => {
    const stored = localStorage.getItem("weeklyMealPlan");
    if (stored) return JSON.parse(stored);

    // fallback to default if nothing stored
    const defaultPlan: WeeklyPlan = {};
    for (let i = 0; i < 7; i++) {
      const day = format(
        addDays(startOfWeek(today, { weekStartsOn: 1 }), i),
        "yyyy-MM-dd"
      );
      defaultPlan[day] = { breakfast: null, lunch: null, dinner: null };
    }
    return defaultPlan;
  };
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(
    loadWeeklyPlanFromStorage
  );

  useEffect(() => {
    localStorage.setItem("weeklyMealPlan", JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  const [showRecipeSelector, setShowRecipeSelector] = useState<{
    day: string;
    mealType: "breakfast" | "lunch" | "dinner";
  } | null>(null);

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeekStart((prevDate) => {
      const newDate =
        direction === "prev" ? addDays(prevDate, -7) : addDays(prevDate, 7);

      // Initialize meal plan for the new week if it doesn't exist
      const newWeeklyPlan = { ...weeklyPlan };
      for (let i = 0; i < 7; i++) {
        const day = format(addDays(newDate, i), "yyyy-MM-dd");
        if (!newWeeklyPlan[day]) {
          newWeeklyPlan[day] = {
            breakfast: null,
            lunch: null,
            dinner: null,
          };
        }
      }
      setWeeklyPlan(newWeeklyPlan);

      return newDate;
    });
  };

  const assignRecipeToMeal = async (recipeId: string) => {
    if (!showRecipeSelector) return;

    const { day, mealType } = showRecipeSelector;
    try {
      const result = await dispatch(getRecipeById(recipeId)).unwrap();
      setWeeklyPlan((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: result,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch recipe by ID:", error);
    }

    setShowRecipeSelector(null);
  };

  const removeRecipeFromMeal = (
    day: string,
    mealType: "breakfast" | "lunch" | "dinner"
  ) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null,
      },
    }));
  };

  // Drag and drop handlers
  const handleDragStart = (
    e: React.DragEvent,
    recipe: Recipe,
    day: string,
    mealType: keyof DailyPlan
  ) => {
    const dragData: DragData = {
      recipe,
      sourceDay: day,
      sourceMealType: mealType,
    };
    setDraggedItem(dragData);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (
    e: React.DragEvent,
    day: string,
    mealType: keyof DailyPlan
  ) => {
    e.preventDefault();
    setDragOverSlot({ day, mealType });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverSlot(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    targetDay: string,
    targetMealType: keyof DailyPlan
  ) => {
    e.preventDefault();
    setDragOverSlot(null);

    if (!draggedItem) return;

    const { recipe, sourceDay, sourceMealType } = draggedItem;

    // Don't do anything if dropping in the same slot
    if (sourceDay === targetDay && sourceMealType === targetMealType) {
      setDraggedItem(null);
      return;
    }

    setWeeklyPlan((prev) => {
      const newPlan = { ...prev };

      const targetRecipe = newPlan[targetDay]?.[targetMealType];
      newPlan[targetDay] = {
        ...newPlan[targetDay],
        [targetMealType]: recipe,
      };
      newPlan[sourceDay] = {
        ...newPlan[sourceDay],
        [sourceMealType]: targetRecipe || null,
      };

      return newPlan;
    });

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverSlot(null);
  };

  const renderWeekDays = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      const dayStr = format(day, "yyyy-MM-dd");
      const isToday = format(today, "yyyy-MM-dd") === dayStr;

      days.push(
        <div
          key={dayStr}
          className={`text-center py-2 ${
            isToday ? "bg-primary-50 rounded-t-lg" : ""
          }`}
        >
          <p className="text-xs text-gray-500 uppercase">
            {format(day, "EEE")}
          </p>
          <p
            className={`text-lg font-medium ${
              isToday ? "text-primary-600" : ""
            }`}
          >
            {format(day, "d")}
          </p>
        </div>
      );
    }

    return days;
  };

  const renderMealPlan = () => {
    const mealTypes = [
      { type: "breakfast", label: "Breakfast" },
      { type: "lunch", label: "Lunch" },
      { type: "dinner", label: "Dinner" },
    ];

    return mealTypes.map(({ type, label }) => (
      <div key={type} className="mb-6">
        <h3 className="text-lg font-medium mb-2">{label}</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = format(addDays(currentWeekStart, index), "yyyy-MM-dd");
            const recipe = weeklyPlan[day]?.[type as keyof DailyPlan];
            const isDropTarget =
              dragOverSlot?.day === day && dragOverSlot?.mealType === type;
            const isDragSource =
              draggedItem?.sourceDay === day &&
              draggedItem?.sourceMealType === type;

            return (
              <div
                key={`${day}-${type}`}
                className={`min-h-24 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
                  isDropTarget
                    ? "border-primary-500 bg-primary-50 scale-105"
                    : ""
                } ${isDragSource ? "opacity-50" : ""}`}
                onDragOver={handleDragOver}
                onDragEnter={(e) =>
                  handleDragEnter(e, day, type as keyof DailyPlan)
                }
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, day, type as keyof DailyPlan)}
              >
                {recipe ? (
                  <div
                    className="h-full flex flex-col cursor-move"
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, recipe, day, type as keyof DailyPlan)
                    }
                    onDragEnd={handleDragEnd}
                  >
                    <Link
                      to={`/recipes/${recipe._id}`}
                      className="h-full flex flex-col hover:shadow-md transition-shadow"
                      onClick={(e) => {
                        if (draggedItem) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div className="relative h-20 overflow-hidden rounded-t-lg">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeRecipeFromMeal(day, type as keyof DailyPlan);
                          }}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                          aria-label="Remove recipe"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <div className="p-2 text-xs flex-grow">
                        <p className="font-medium text-gray-800 line-clamp-2">
                          {recipe.title}
                        </p>
                        <div className="flex items-center mt-1 text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{recipe.prepTime} min</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <button
                    className={`w-full h-full flex flex-col items-center justify-center p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-colors ${
                      isDropTarget ? "text-primary-500" : ""
                    }`}
                    onClick={() =>
                      setShowRecipeSelector({
                        day,
                        mealType: type as keyof DailyPlan,
                      })
                    }
                  >
                    <Plus className="w-6 h-6 mb-1" />
                    <span className="text-xs">
                      {isDropTarget ? "Drop here" : `Add ${label}`}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Meal Planner</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-bold">
                {format(currentWeekStart, "MMMM d")} -{" "}
                {format(addDays(currentWeekStart, 6), "MMMM d, yyyy")}
              </h2>
            </div>

            <div className="flex space-x-2">
              <button
                className="btn-outline p-2"
                onClick={() => navigateWeek("prev")}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="btn-outline"
                onClick={() =>
                  setCurrentWeekStart(startOfWeek(today, { weekStartsOn: 1 }))
                }
              >
                Today
              </button>
              <button
                className="btn-outline p-2"
                onClick={() => navigateWeek("next")}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7">{renderWeekDays()}</div>

            <div className="p-4 bg-gray-50">{renderMealPlan()}</div>
          </div>
        </div>

        {showRecipeSelector && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
                <h3 className="text-lg font-bold">
                  Select a Recipe for{" "}
                  {showRecipeSelector.mealType.charAt(0).toUpperCase() +
                    showRecipeSelector.mealType.slice(1)}{" "}
                  on {format(new Date(showRecipeSelector.day), "MMMM d")}
                </h3>
                <button
                  onClick={() => setShowRecipeSelector(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="form-input mb-4"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {recipes
                    .filter((recipe) => recipe.userId === userId)
                    .map((recipe) => (
                      <div
                        key={recipe._id}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => assignRecipeToMeal(recipe._id)}
                      >
                        <div className="h-32 overflow-hidden">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-gray-800 mb-1">
                            {recipe.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{recipe.prepTime} min</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MealPlannerPage;
