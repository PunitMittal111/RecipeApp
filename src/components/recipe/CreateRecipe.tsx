import React, { useState } from "react";
import { X } from "lucide-react";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  id: string;
  title: string;
  userId?: string;
  description: string;
  category: string;
  prepTime: number;
  image: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  ingredients: Ingredient[];
  instructions: string[];
  notes: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newRecipe: Recipe, userId: string) => void;
}

const CreateRecipe: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [activeNutrient, setActiveNutrient] = useState<string | null>(null);
  const [formData, setFormData] = useState<Recipe>({
    id: Date.now().toString(),
    title: "",
    description: "",
    category: "",
    prepTime: 0,
    image: "",
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
    },
    ingredients: [],
    instructions: [],
    notes: "",
  });

  const [ingredient, setIngredient] = useState<Ingredient>({
    name: "",
    amount: 0,
    unit: "",
  });

  const [instruction, setInstruction] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "prepTime" || name === "calories" ? Number(value) : value,
    }));
  };

  const handleNutritionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [name]: Number(value),
      },
    }));
  };

  const handleAddIngredient = () => {
    if (ingredient.name && ingredient.amount > 0 && ingredient.unit) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient],
      }));
      setIngredient({ name: "", amount: 0, unit: "" });
    }
  };

  const handleAddInstruction = () => {
    if (instruction.trim()) {
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, instruction],
      }));
      setInstruction("");
    }
  };

  const handleSubmit = () => {
    if (formData.title && formData.ingredients.length > 0) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not authenticated.");
        return;
      }
      const dataWithUserId = { ...formData, userId };

      onCreate(dataWithUserId, userId);
      onClose();
    } else {
      alert("Please enter at least a title and one ingredient.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-auto max-h-[90vh] p-8 relative space-y-6">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-semibold text-gray-800">
          Create New Recipe
        </h2>

        {/* Title & Description */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            className="w-full border rounded-md p-2"
            value={formData.title || ""}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border rounded-md p-2"
            rows={3}
            value={formData.description || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Category, Time, Image */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            name="category"
            className="w-full border rounded-md p-2"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select>
          <input
            type="number"
            name="prepTime"
            placeholder="Prep Time (min)"
            className="w-full border rounded-md p-2"
            value={formData.prepTime || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full border rounded-md p-2"
            value={formData.image || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Ingredients Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="text"
              placeholder="Name"
              className="flex-1 border rounded-md p-2"
              value={ingredient.name}
              onChange={(e) =>
                setIngredient((prev) => ({ ...prev, name: e.target.value }))
              }
              onKeyDown={(e) => e.key === "Enter" && handleAddIngredient()}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-24 border rounded-md p-2"
              value={ingredient.amount}
              onChange={(e) =>
                setIngredient((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value),
                }))
              }
              onKeyDown={(e) => e.key === "Enter" && handleAddIngredient()}
            />
            <input
              type="text"
              placeholder="Unit"
              className="w-24 border rounded-md p-2"
              value={ingredient.unit}
              onChange={(e) =>
                setIngredient((prev) => ({ ...prev, unit: e.target.value }))
              }
            />
            <button
              onClick={handleAddIngredient}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            {formData.ingredients.map((i, idx) => (
              <li key={idx}>
                {i.amount} {i.unit} {i.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Step instruction"
              className="flex-1 border rounded-md p-2"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddInstruction()}
            />
            <button
              onClick={handleAddInstruction}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <ol className="list-decimal pl-6 text-sm text-gray-700">
            {formData.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Nutrition Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Nutrition per serving</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["calories", "protein", "carbs", "fat", "fiber", "sugar"].map(
              (nutrient) => {
                const label =
                  nutrient.charAt(0).toUpperCase() + nutrient.slice(1);
                const value =
                  formData.nutrition[
                    nutrient as keyof typeof formData.nutrition
                  ];

                return (
                  <div key={nutrient} className="w-full">
                    <input
                      type="number"
                      name={nutrient}
                      autoFocus
                      value={value || ""}
                      placeholder={label}
                      className="w-full border rounded-md p-2"
                      onBlur={() => setActiveNutrient(nutrient)}
                      onChange={handleNutritionChange}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div>
          <textarea
            name="notes"
            placeholder="Additional Notes"
            className="w-full border rounded-md p-2"
            rows={3}
            value={formData.notes || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            onKeyDown={(e) => e.key === "Enter"}
          >
            Create Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
