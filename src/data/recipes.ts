export const allRecipes = [
  {
    id: '1',
    title: 'Mediterranean Chickpea Salad',
    description: 'A refreshing and nutritious salad loaded with Mediterranean flavors. Perfect for a light lunch or as a side dish.',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 15,
    calories: 320,
    difficulty: 'easy' as const,
    category: 'lunch',
    ingredients: [
      { name: 'chickpeas, drained and rinsed', amount: 15, unit: 'oz' },
      { name: 'cucumber, diced', amount: 1, unit: '' },
      { name: 'cherry tomatoes, halved', amount: 1, unit: 'cup' },
      { name: 'red onion, finely chopped', amount: 0.25, unit: 'cup' },
      { name: 'feta cheese, crumbled', amount: 0.5, unit: 'cup' },
      { name: 'Kalamata olives, sliced', amount: 0.3, unit: 'cup' },
      { name: 'fresh parsley, chopped', amount: 0.25, unit: 'cup' },
      { name: 'olive oil', amount: 3, unit: 'tbsp' },
      { name: 'lemon juice', amount: 2, unit: 'tbsp' },
      { name: 'garlic, minced', amount: 1, unit: 'clove' },
      { name: 'dried oregano', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 0.5, unit: 'tsp' },
      { name: 'black pepper', amount: 0.25, unit: 'tsp' }
    ],
    instructions: [
      'In a large bowl, combine chickpeas, cucumber, cherry tomatoes, red onion, feta cheese, and olives.',
      'In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper to make the dressing.',
      'Pour the dressing over the salad and toss to combine.',
      'Sprinkle with fresh parsley and gently mix.',
      'For best flavor, refrigerate for at least 30 minutes before serving.'
    ],
    nutrition: {
      protein: 12,
      carbs: 30,
      fat: 18,
      fiber: 8,
      sugar: 4
    },
    notes: 'This salad keeps well in the refrigerator for up to 3 days. The flavors actually improve over time as they meld together!'
  },
  {
    id: '2',
    title: 'Honey Garlic Salmon',
    description: 'A quick and delicious salmon dish with a sweet and savory glaze. Ready in under 30 minutes!',
    image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 25,
    calories: 420,
    difficulty: 'medium' as const,
    category: 'dinner',
    ingredients: [
      { name: 'salmon fillets', amount: 4, unit: '6 oz' },
      { name: 'honey', amount: 0.25, unit: 'cup' },
      { name: 'soy sauce', amount: 0.25, unit: 'cup' },
      { name: 'garlic, minced', amount: 4, unit: 'cloves' },
      { name: 'lemon juice', amount: 2, unit: 'tbsp' },
      { name: 'olive oil', amount: 1, unit: 'tbsp' },
      { name: 'butter', amount: 1, unit: 'tbsp' },
      { name: 'red pepper flakes', amount: 0.25, unit: 'tsp' },
      { name: 'fresh parsley, chopped', amount: 2, unit: 'tbsp' },
      { name: 'salt', amount: 0.5, unit: 'tsp' },
      { name: 'black pepper', amount: 0.25, unit: 'tsp' }
    ],
    instructions: [
      'Pat salmon fillets dry with paper towels and season with salt and pepper.',
      'In a small bowl, whisk together honey, soy sauce, garlic, lemon juice, and red pepper flakes.',
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add salmon fillets skin-side down and cook for 4-5 minutes until the skin is crispy.',
      'Flip the salmon and cook for another 2 minutes.',
      'Pour the honey garlic sauce into the pan and add the butter.',
      'Reduce heat to medium-low and cook for 3-4 minutes, occasionally spooning the sauce over the salmon.',
      'Remove from heat when salmon is cooked through and the sauce has thickened.',
      'Garnish with chopped parsley before serving.'
    ],
    nutrition: {
      protein: 29,
      carbs: 18,
      fat: 22,
      fiber: 0,
      sugar: 16
    },
    notes: 'Serve this salmon with steamed vegetables and rice for a complete meal. The sauce also works great with chicken or shrimp!'
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Egg',
    description: 'A perfect breakfast or brunch option that\'s nutritious and satisfying.',
    image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 15,
    calories: 350,
    difficulty: 'easy' as const,
    category: 'breakfast',
    ingredients: [
      { name: 'whole grain bread', amount: 2, unit: 'slices' },
      { name: 'ripe avocado', amount: 1, unit: 'large' },
      { name: 'eggs', amount: 2, unit: 'large' },
      { name: 'white vinegar', amount: 1, unit: 'tbsp' },
      { name: 'lemon juice', amount: 1, unit: 'tsp' },
      { name: 'red pepper flakes', amount: 0.25, unit: 'tsp' },
      { name: 'salt', amount: 0.5, unit: 'tsp' },
      { name: 'black pepper', amount: 0.25, unit: 'tsp' },
      { name: 'microgreens or sprouts', amount: 0.25, unit: 'cup' },
      { name: 'cherry tomatoes, halved', amount: 0.5, unit: 'cup' }
    ],
    instructions: [
      'Fill a medium pot with water and bring to a gentle simmer. Add white vinegar.',
      'Toast the bread slices until golden brown and firm.',
      'In a small bowl, mash the avocado with lemon juice, salt, and pepper.',
      'Spread the mashed avocado evenly on the toast slices.',
      'Crack an egg into a small bowl. Create a gentle whirlpool in the simmering water and carefully slide the egg in. Cook for 3 minutes for a runny yolk.',
      'Using a slotted spoon, remove the poached egg and place on top of the avocado toast.',
      'Repeat for the second egg.',
      'Sprinkle with red pepper flakes, additional salt and pepper if desired.',
      'Top with microgreens and cherry tomatoes before serving.'
    ],
    nutrition: {
      protein: 14,
      carbs: 30,
      fat: 22,
      fiber: 10,
      sugar: 3
    },
    notes: 'For perfect poached eggs, use the freshest eggs possible. You can also add other toppings like crumbled feta, sliced radishes, or a drizzle of hot sauce for extra flavor.'
  },
  {
    id: '4',
    title: 'Classic Beef Lasagna',
    description: 'A comforting and hearty Italian classic with layers of pasta, meat sauce, and cheeses.',
    image: 'https://images.pexels.com/photos/6406460/pexels-photo-6406460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 60,
    calories: 580,
    difficulty: 'hard' as const,
    category: 'dinner',
    ingredients: [
      { name: 'lasagna noodles', amount: 12, unit: 'sheets' },
      { name: 'ground beef', amount: 1, unit: 'lb' },
      { name: 'Italian sausage, casings removed', amount: 0.5, unit: 'lb' },
      { name: 'onion, diced', amount: 1, unit: 'large' },
      { name: 'garlic, minced', amount: 3, unit: 'cloves' },
      { name: 'crushed tomatoes', amount: 28, unit: 'oz' },
      { name: 'tomato paste', amount: 2, unit: 'tbsp' },
      { name: 'ricotta cheese', amount: 15, unit: 'oz' },
      { name: 'mozzarella cheese, shredded', amount: 3, unit: 'cups' },
      { name: 'Parmesan cheese, grated', amount: 1, unit: 'cup' },
      { name: 'egg', amount: 1, unit: 'large' },
      { name: 'dried oregano', amount: 2, unit: 'tsp' },
      { name: 'dried basil', amount: 2, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'tsp' },
      { name: 'black pepper', amount: 0.5, unit: 'tsp' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'fresh parsley, chopped', amount: 0.25, unit: 'cup' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Cook lasagna noodles according to package directions. Drain and set aside.',
      'In a large skillet, heat olive oil over medium heat. Add onions and cook until translucent, about 5 minutes.',
      'Add garlic and cook for another minute until fragrant.',
      'Add ground beef and Italian sausage, breaking it apart with a spoon. Cook until browned, about 8 minutes.',
      'Stir in crushed tomatoes, tomato paste, oregano, basil, salt, and pepper. Simmer for 20 minutes.',
      'In a bowl, mix ricotta cheese, 1/2 cup Parmesan, egg, parsley, and a pinch of salt and pepper.',
      'In a 9x13 inch baking dish, spread a thin layer of meat sauce. Layer with lasagna noodles, ricotta mixture, mozzarella, and meat sauce. Repeat layers.',
      'Top with remaining mozzarella and Parmesan cheese.',
      'Cover with foil and bake for 25 minutes. Remove foil and bake for another 25 minutes until cheese is golden and bubbly.',
      'Let rest for 15 minutes before serving.'
    ],
    nutrition: {
      protein: 36,
      carbs: 42,
      fat: 30,
      fiber: 4,
      sugar: 8
    },
    notes: 'This lasagna can be assembled up to 24 hours in advance and refrigerated before baking. It also freezes well for up to 3 months. Let it cool completely before freezing.'
  },
  {
    id: '5',
    title: 'Vegetarian Buddha Bowl',
    description: 'A colorful and nutritious bowl filled with roasted vegetables, grains, and a flavorful sauce.',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 40,
    calories: 450,
    difficulty: 'medium' as const,
    category: 'lunch',
    ingredients: [
      { name: 'quinoa', amount: 1, unit: 'cup' },
      { name: 'sweet potato, cubed', amount: 1, unit: 'large' },
      { name: 'broccoli florets', amount: 2, unit: 'cups' },
      { name: 'chickpeas, drained and rinsed', amount: 15, unit: 'oz' },
      { name: 'avocado, sliced', amount: 1, unit: 'medium' },
      { name: 'kale, chopped', amount: 2, unit: 'cups' },
      { name: 'carrot, shredded', amount: 1, unit: 'large' },
      { name: 'tahini', amount: 0.25, unit: 'cup' },
      { name: 'lemon juice', amount: 2, unit: 'tbsp' },
      { name: 'maple syrup', amount: 1, unit: 'tbsp' },
      { name: 'garlic, minced', amount: 1, unit: 'clove' },
      { name: 'olive oil', amount: 3, unit: 'tbsp' },
      { name: 'cumin', amount: 1, unit: 'tsp' },
      { name: 'paprika', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'tsp' },
      { name: 'black pepper', amount: 0.5, unit: 'tsp' },
      { name: 'sesame seeds', amount: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Cook quinoa according to package directions.',
      'Toss sweet potato cubes with 1 tablespoon olive oil, cumin, paprika, salt, and pepper. Arrange on a baking sheet.',
      'On another baking sheet, toss chickpeas and broccoli with 1 tablespoon olive oil, salt, and pepper.',
      'Roast sweet potatoes for 25-30 minutes, and chickpeas and broccoli for 15-20 minutes, until tender and slightly crispy.',
      'In a small bowl, massage kale with 1 teaspoon olive oil and a pinch of salt until softened.',
      'For the sauce, whisk together tahini, lemon juice, maple syrup, garlic, 2 tablespoons water, and a pinch of salt. Add more water if needed to reach desired consistency.',
      'To assemble bowls, divide quinoa among 4 bowls. Arrange roasted vegetables, chickpeas, kale, carrot, and avocado on top.',
      'Drizzle with tahini sauce and sprinkle with sesame seeds before serving.'
    ],
    nutrition: {
      protein: 15,
      carbs: 58,
      fat: 20,
      fiber: 13,
      sugar: 9
    },
    notes: 'Feel free to customize with your favorite vegetables or proteins. These bowls are great for meal prep and will keep in the refrigerator for up to 4 days (store sauce separately and add avocado just before serving).'
  },
  {
    id: '6',
    title: 'Blueberry Pancakes',
    description: 'Fluffy, tender pancakes studded with juicy blueberries. A perfect weekend breakfast treat!',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 20,
    calories: 380,
    difficulty: 'easy' as const,
    category: 'breakfast',
    ingredients: [
      { name: 'all-purpose flour', amount: 2, unit: 'cups' },
      { name: 'baking powder', amount: 2, unit: 'tsp' },
      { name: 'baking soda', amount: 0.5, unit: 'tsp' },
      { name: 'salt', amount: 0.25, unit: 'tsp' },
      { name: 'granulated sugar', amount: 3, unit: 'tbsp' },
      { name: 'eggs', amount: 2, unit: 'large' },
      { name: 'milk', amount: 1.75, unit: 'cups' },
      { name: 'vanilla extract', amount: 1, unit: 'tsp' },
      { name: 'unsalted butter, melted', amount: 0.25, unit: 'cup' },
      { name: 'fresh blueberries', amount: 1.5, unit: 'cups' },
      { name: 'maple syrup for serving', amount: 0, unit: '' }
    ],
    instructions: [
      'In a large bowl, whisk together flour, baking powder, baking soda, salt, and sugar.',
      'In another bowl, beat the eggs, then add milk, vanilla extract, and melted butter. Whisk until combined.',
      'Pour the wet ingredients into the dry ingredients and stir just until combined. Some lumps are okay; do not overmix.',
      'Gently fold in 1 cup of blueberries.',
      'Heat a griddle or large non-stick skillet over medium heat. Lightly grease with butter or cooking spray.',
      'Pour 1/4 cup batter for each pancake onto the hot griddle.',
      'Sprinkle a few additional blueberries on top of each pancake.',
      'Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.',
      'Flip and cook until golden brown on the other side, about 2 minutes more.',
      'Serve warm with maple syrup.'
    ],
    nutrition: {
      protein: 9,
      carbs: 58,
      fat: 12,
      fiber: 2,
      sugar: 24
    },
    notes: 'For best results, do not overmix the batter; a few lumps are fine. If using frozen blueberries, do not thaw them before adding to the batter. These pancakes freeze well for up to 1 month - place cooled pancakes in a ziplock bag separated by parchment paper.'
  },
  {
    id: '7',
    title: 'Thai Green Curry with Chicken',
    description: 'A fragrant and spicy Thai curry with tender chicken, vegetables, and creamy coconut milk.',
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 35,
    calories: 480,
    difficulty: 'medium' as const,
    category: 'dinner',
    ingredients: [
      { name: 'boneless, skinless chicken thighs, cut into chunks', amount: 1.5, unit: 'lbs' },
      { name: 'coconut oil', amount: 2, unit: 'tbsp' },
      { name: 'green curry paste', amount: 3, unit: 'tbsp' },
      { name: 'coconut milk', amount: 14, unit: 'oz' },
      { name: 'chicken broth', amount: 0.5, unit: 'cup' },
      { name: 'fish sauce', amount: 2, unit: 'tbsp' },
      { name: 'brown sugar', amount: 1, unit: 'tbsp' },
      { name: 'bell pepper, sliced', amount: 1, unit: 'large' },
      { name: 'zucchini, sliced', amount: 1, unit: 'medium' },
      { name: 'snow peas', amount: 1, unit: 'cup' },
      { name: 'bamboo shoots', amount: 8, unit: 'oz' },
      { name: 'kaffir lime leaves', amount: 3, unit: '' },
      { name: 'Thai basil leaves', amount: 0.5, unit: 'cup' },
      { name: 'lime juice', amount: 2, unit: 'tbsp' },
      { name: 'jasmine rice, cooked', amount: 2, unit: 'cups' }
    ],
    instructions: [
      'Heat coconut oil in a large pot over medium heat.',
      'Add green curry paste and cook for 1-2 minutes until fragrant.',
      'Add chicken pieces and cook until the outside is no longer pink, about 5 minutes.',
      'Pour in coconut milk and chicken broth. Add kaffir lime leaves, fish sauce, and brown sugar.',
      'Bring to a simmer and cook for 10 minutes until chicken is cooked through.',
      'Add bell pepper, zucchini, snow peas, and bamboo shoots. Cook for another 5-7 minutes until vegetables are tender-crisp.',
      'Stir in Thai basil leaves and lime juice.',
      'Taste and adjust seasoning with more fish sauce or brown sugar if needed.',
      'Serve hot over jasmine rice.'
    ],
    nutrition: {
      protein: 28,
      carbs: 35,
      fat: 26,
      fiber: 3,
      sugar: 7
    },
    notes: 'For a spicier curry, add more curry paste or Thai chilies. You can substitute any vegetables you like - eggplant, carrots, and broccoli all work well. For a vegetarian version, replace chicken with firm tofu and use vegetable broth instead of chicken broth.'
  },
  {
    id: '8',
    title: 'Classic Chocolate Chip Cookies',
    description: 'Everyone\'s favorite cookies with crispy edges and chewy centers loaded with chocolate chips.',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    prepTime: 25,
    calories: 180,
    difficulty: 'easy' as const,
    category: 'dessert',
    ingredients: [
      { name: 'all-purpose flour', amount: 2.25, unit: 'cups' },
      { name: 'baking soda', amount: 1, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'tsp' },
      { name: 'unsalted butter, softened', amount: 1, unit: 'cup' },
      { name: 'brown sugar, packed', amount: 0.75, unit: 'cup' },
      { name: 'granulated sugar', amount: 0.5, unit: 'cup' },
      { name: 'eggs', amount: 2, unit: 'large' },
      { name: 'vanilla extract', amount: 2, unit: 'tsp' },
      { name: 'semisweet chocolate chips', amount: 2, unit: 'cups' },
      { name: 'chopped walnuts (optional)', amount: 1, unit: 'cup' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
      'In a medium bowl, whisk together flour, baking soda, and salt.',
      'In a large bowl, cream together butter, brown sugar, and granulated sugar until light and fluffy, about 3 minutes.',
      'Beat in eggs one at a time, then stir in vanilla extract.',
      'Gradually add the dry ingredients to the wet ingredients, mixing just until combined.',
      'Fold in chocolate chips and walnuts if using.',
      'Drop rounded tablespoons of dough onto the prepared baking sheets, spacing cookies about 2 inches apart.',
      'Bake for 9-11 minutes, until edges are golden but centers are still soft.',
      'Allow cookies to cool on baking sheet for 2 minutes, then transfer to wire racks to cool completely.'
    ],
    nutrition: {
      protein: 2,
      carbs: 24,
      fat: 10,
      fiber: 1,
      sugar: 15
    },
    notes: 'For softer cookies, slightly underbake them. For crispier cookies, bake 1-2 minutes longer. The dough can be refrigerated for up to 72 hours before baking, which actually improves the flavor! You can also freeze scooped dough balls for up to 3 months and bake them straight from frozen (add 1-2 minutes to baking time).'
  }
];

export const featuredRecipes = allRecipes.slice(0, 4);
export const savedRecipes = [allRecipes[1], allRecipes[3], allRecipes[5], allRecipes[7]];
export const recentlyViewedRecipes = [allRecipes[0], allRecipes[2], allRecipes[4]];