import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <span className="text-xl font-display font-bold">C</span>
              </div>
              <span className="font-display text-xl font-bold text-white">Culina</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Discover, create, and share delicious recipes with a community of food lovers.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/recipes" className="text-gray-400 hover:text-white transition-colors">Recipes</Link></li>
              <li><Link to="/meal-planner" className="text-gray-400 hover:text-white transition-colors">Meal Planner</Link></li>
              <li><Link to="/grocery-list" className="text-gray-400 hover:text-white transition-colors">Grocery List</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/recipes?category=breakfast" className="text-gray-400 hover:text-white transition-colors">Breakfast</Link></li>
              <li><Link to="/recipes?category=lunch" className="text-gray-400 hover:text-white transition-colors">Lunch</Link></li>
              <li><Link to="/recipes?category=dinner" className="text-gray-400 hover:text-white transition-colors">Dinner</Link></li>
              <li><Link to="/recipes?category=dessert" className="text-gray-400 hover:text-white transition-colors">Desserts</Link></li>
              <li><Link to="/recipes?category=vegetarian" className="text-gray-400 hover:text-white transition-colors">Vegetarian</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left md:flex md:justify-between">
          <p className="text-gray-400 text-sm">© 2025 Culina. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;