import { Egg, Coffee, Sun, Salad, UtensilsCrossed, Soup, Beef, Carrot, Cake, Flame } from 'lucide-react';
import React from 'react';

export const allCategories = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: React.createElement(Coffee, { className: 'w-4 h-4' })
  },
  {
    id: 'lunch',
    name: 'Lunch',
    icon: React.createElement(Salad, { className: 'w-4 h-4' })
  },
  {
    id: 'dinner',
    name: 'Dinner',
    icon: React.createElement(UtensilsCrossed, { className: 'w-4 h-4' })
  },
  {
    id: 'dessert',
    name: 'Desserts',
    icon: React.createElement(Cake, { className: 'w-4 h-4' })
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    icon: React.createElement(Carrot, { className: 'w-4 h-4' })
  },
  {
    id: 'quick',
    name: 'Quick & Easy',
    icon: React.createElement(Flame, { className: 'w-4 h-4' })
  },
  {
    id: 'soup',
    name: 'Soups',
    icon: React.createElement(Soup, { className: 'w-4 h-4' })
  },
  {
    id: 'meat',
    name: 'Meat',
    icon: React.createElement(Beef, { className: 'w-4 h-4' })
  }
];