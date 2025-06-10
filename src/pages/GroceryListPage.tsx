import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Check,
  X,
  Trash2,
  ShoppingCart,
  Printer,
  Edit3,
  Save,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GroceryItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: string;
  completed: boolean;
  fromRecipe?: string;
}

interface LocationState {
  title?: string;
  ingredients?: Array<{
    name: string;
    amount: string;
    unit: string;
  }>;
}

const CATEGORIES = [
  "Produce",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Pantry",
  "Bakery",
  "Frozen",
  "Beverages",
  "Other",
];

const categorizeIngredient = (name: string): string => {
  const lowerName = name.toLowerCase();

  if (
    lowerName.includes("milk") ||
    lowerName.includes("cheese") ||
    lowerName.includes("yogurt") ||
    lowerName.includes("butter") ||
    lowerName.includes("cream") ||
    lowerName.includes("egg")
  ) {
    return "Dairy & Eggs";
  }
  if (
    lowerName.includes("chicken") ||
    lowerName.includes("beef") ||
    lowerName.includes("pork") ||
    lowerName.includes("fish") ||
    lowerName.includes("salmon") ||
    lowerName.includes("shrimp")
  ) {
    return "Meat & Seafood";
  }
  if (
    lowerName.includes("onion") ||
    lowerName.includes("garlic") ||
    lowerName.includes("tomato") ||
    lowerName.includes("lettuce") ||
    lowerName.includes("carrot") ||
    lowerName.includes("pepper") ||
    lowerName.includes("spinach") ||
    lowerName.includes("broccoli")
  ) {
    return "Produce";
  }
  if (
    lowerName.includes("bread") ||
    lowerName.includes("roll") ||
    lowerName.includes("bagel") ||
    lowerName.includes("muffin")
  ) {
    return "Bakery";
  }
  if (lowerName.includes("frozen") || lowerName.includes("ice cream")) {
    return "Frozen";
  }
  if (
    lowerName.includes("juice") ||
    lowerName.includes("soda") ||
    lowerName.includes("water") ||
    lowerName.includes("coffee") ||
    lowerName.includes("tea")
  ) {
    return "Beverages";
  }
  if (
    lowerName.includes("flour") ||
    lowerName.includes("sugar") ||
    lowerName.includes("salt") ||
    lowerName.includes("oil") ||
    lowerName.includes("vinegar") ||
    lowerName.includes("spice") ||
    lowerName.includes("sauce")
  ) {
    return "Pantry";
  }

  return "Other";
};

const GroceryListPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    amount: "",
    unit: "",
    category: "Other",
  });
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState({
    name: "",
    amount: "",
    unit: "",
    category: "Other",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("groceryList");
    if (savedItems) {
      setGroceryItems(JSON.parse(savedItems));
    }
  }, []);

  // Add recipe ingredients when navigated from recipe
  useEffect(() => {
    if (state?.ingredients && state?.title) {
      const recipeItems: GroceryItem[] = state.ingredients.map(
        (ingredient, index) => ({
          id: `recipe-${Date.now()}-${index}`,
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          category: categorizeIngredient(ingredient.name),
          completed: false,
          fromRecipe: state.title,
        })
      );

      setGroceryItems((prev) => {
        const existingItems = prev.filter(
          (item) => item.fromRecipe !== state.title
        );
        const newItems = [...existingItems, ...recipeItems];
        localStorage.setItem("groceryList", JSON.stringify(newItems));
        return newItems;
      });
    }
  }, [state]);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryItems));
  }, [groceryItems]);

  const addItem = () => {
    if (newItem.name.trim()) {
      const item: GroceryItem = {
        id: `custom-${Date.now()}`,
        name: newItem.name.trim(),
        amount: newItem.amount,
        unit: newItem.unit,
        category: newItem.category,
        completed: false,
      };

      setGroceryItems((prev) => [...prev, item]);
      setNewItem({ name: "", amount: "", unit: "", category: "Other" });
      setIsAddingItem(false);
    }
  };

  const toggleItem = (id: string) => {
    setGroceryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setGroceryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setGroceryItems((prev) => prev.filter((item) => !item.completed));
  };

  const clearAll = () => {
    setGroceryItems([]);
  };

  const startEditing = (item: GroceryItem) => {
    setEditingId(item.id);
    setEditingItem({
      name: item.name,
      amount: item.amount,
      unit: item.unit,
      category: item.category,
    });
  };

  const saveEdit = () => {
    if (editingItem.name.trim()) {
      setGroceryItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...editingItem, name: editingItem.name.trim() }
            : item
        )
      );
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingItem({ name: "", amount: "", unit: "", category: "Other" });
  };

  const handlePrint = () => {
    window.print();
  };

  const groupedItems = groceryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const completedCount = groceryItems.filter((item) => item.completed).length;
  const totalCount = groceryItems.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/recipes"
                className="inline-flex items-center text-gray-600 hover:text-primary-600 mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-primary-600" />
                  Grocery List
                </h1>
                {state?.title && (
                  <p className="text-sm text-gray-600 mt-1">
                    From recipe:{" "}
                    <span className="font-medium">{state.title}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={handlePrint} className="btn btn-outline">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              <button
                onClick={() => setIsAddingItem(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Progress Bar */}
            {totalCount > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                  <span className="text-sm text-gray-500">
                    {completedCount} of {totalCount} items
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-primary-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Add New Item Form */}
            <AnimatePresence>
              {isAddingItem && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg shadow-sm p-6 mb-6"
                >
                  <h3 className="font-bold text-lg mb-4">Add New Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        placeholder="Item name"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        autoFocus
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Amount"
                        value={newItem.amount}
                        onChange={(e) =>
                          setNewItem({ ...newItem, amount: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Unit"
                        value={newItem.unit}
                        onChange={(e) =>
                          setNewItem({ ...newItem, unit: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <select
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem({ ...newItem, category: e.target.value })
                      }
                      className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    >
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => setIsAddingItem(false)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button onClick={addItem} className="btn btn-primary">
                      Add Item
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grocery Items by Category */}
            {totalCount > 0 ? (
              <div className="space-y-6">
                {CATEGORIES.map((category) => {
                  const categoryItems = groupedItems[category];
                  if (!categoryItems || categoryItems.length === 0) return null;

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-sm"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800">
                          {category}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {
                            categoryItems.filter((item) => item.completed)
                              .length
                          }{" "}
                          of {categoryItems.length} completed
                        </p>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <AnimatePresence>
                            {categoryItems.map((item) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`flex items-center p-3 rounded-lg border transition-all ${
                                  item.completed
                                    ? "bg-gray-50 border-gray-200"
                                    : "bg-white border-gray-200 hover:border-primary-200 hover:shadow-sm"
                                }`}
                              >
                                <button
                                  onClick={() => toggleItem(item.id)}
                                  className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors ${
                                    item.completed
                                      ? "bg-primary-600 border-primary-600 text-white"
                                      : "border-gray-300 hover:border-primary-400"
                                  }`}
                                >
                                  {item.completed && (
                                    <Check className="w-3 h-3" />
                                  )}
                                </button>

                                <div className="flex-1">
                                  {editingId === item.id ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      <input
                                        type="text"
                                        value={editingItem.name}
                                        onChange={(e) =>
                                          setEditingItem({
                                            ...editingItem,
                                            name: e.target.value,
                                          })
                                        }
                                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                                      />
                                      <input
                                        type="text"
                                        value={editingItem.amount}
                                        onChange={(e) =>
                                          setEditingItem({
                                            ...editingItem,
                                            amount: e.target.value,
                                          })
                                        }
                                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                                        placeholder="Amount"
                                      />
                                      <input
                                        type="text"
                                        value={editingItem.unit}
                                        onChange={(e) =>
                                          setEditingItem({
                                            ...editingItem,
                                            unit: e.target.value,
                                          })
                                        }
                                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                                        placeholder="Unit"
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      <span
                                        className={`font-medium ${
                                          item.completed
                                            ? "line-through text-gray-500"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {item.amount && item.unit
                                          ? `${item.amount} ${item.unit} `
                                          : ""}
                                        {item.name}
                                      </span>
                                      {item.fromRecipe && (
                                        <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                                          {item.fromRecipe}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center space-x-1 ml-2">
                                  {editingId === item.id ? (
                                    <>
                                      <button
                                        onClick={saveEdit}
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                      >
                                        <Save className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={cancelEdit}
                                        className="p-1 text-gray-500 hover:bg-gray-50 rounded"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => startEditing(item)}
                                        className="p-1 text-gray-500 hover:bg-gray-50 rounded"
                                      >
                                        <Edit3 className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => deleteItem(item.id)}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  Your grocery list is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add items manually or import from a recipe to get started.
                </p>
                <button
                  onClick={() => setIsAddingItem(true)}
                  className="btn btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Item
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>

              <div className="space-y-3">
                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="btn btn-outline w-full"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Clear Completed ({completedCount})
                  </button>
                )}

                {totalCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="btn btn-outline w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear All Items
                  </button>
                )}
              </div>

              <div className="border-t my-6"></div>

              <div>
                <h3 className="font-bold text-lg mb-3">Shopping Tips</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <p className="font-medium text-primary-800 mb-1">Pro Tip</p>
                    <p>
                      Shop by category to save time in the store. Start with
                      produce, then move through each section systematically.
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="font-medium text-amber-800 mb-1">
                      Save Money
                    </p>
                    <p>
                      Check your pantry before shopping and only buy what you
                      need to avoid waste.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryListPage;
