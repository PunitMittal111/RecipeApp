import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Search,
  Clock,
  Calendar,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";
import RecipeGrid from "../components/recipe/RecipeGrid";
import { getAllRecipes } from "../features/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipes
  );

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  const userRecipes = userId
    ? recipes.filter((recipe) => recipe.userId === userId)
    : [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Cook, Share & Plan Your Meals with Ease
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-primary-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover delicious recipes, organize your meal plan, and generate
              grocery lists — all in one place.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  className="pl-10 pr-4 py-3 rounded-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
              <button className="btn-accent py-3 px-6">Find Recipes</button>
            </motion.div>
          </div>
        </div>

        {/* Decorative food images (could be actual images in a real implementation) */}
        <div className="hidden lg:block absolute right-0 bottom-0 w-2/5 h-full">
          <div className="absolute top-1/4 right-24 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-1/3 right-48 w-32 h-32 rounded-full bg-accent-400 opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            How Culina Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discover Recipes</h3>
              <p className="text-gray-600">
                Browse thousands of recipes from around the world or create and
                share your own culinary creations.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Plan Your Meals</h3>
              <p className="text-gray-600">
                Drag and drop recipes into your weekly calendar to create the
                perfect meal plan for you and your family.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Shop with Ease</h3>
              <p className="text-gray-600">
                Automatically generate your grocery list based on your meal plan
                and never forget an ingredient again.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold">
              Featured Recipes
            </h2>
            <Link
              to="/recipes"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View all recipes <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          {loading ? (
            <p className="text-center">Loading recipes...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : userRecipes.length > 0 ? (
            <RecipeGrid recipes={userRecipes} />
          ) : (
            <p className="text-center text-gray-500">
              No featured recipes yet.
            </p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to start your culinary journey?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of food enthusiasts who are discovering, creating,
            and sharing amazing recipes every day.
          </p>
          <button className="btn-accent text-base py-3 px-8">
            Get Started — It's Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
