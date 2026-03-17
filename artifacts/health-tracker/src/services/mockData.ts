export type Deficit = {
  id: string;
  name: string;
  needs: number;
  got: number;
  unit: string;
  color: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  nutrientAmount: number;
  nutrientUnit: string;
  price: number;
  priceUnit: string;
  imageUrl: string;
};

export type Recipe = {
  id: string;
  name: string;
  time: number;
  nutrientAmount: number;
  nutrientUnit: string;
  ingredients: Array<{ name: string; amount: string }>;
  imageUrl: string;
};

export type CartItem = Product & {
  cartId: string;
  checked: boolean;
};

export const MOCK_DEFICITS: Deficit[] = [
  { id: 'iron', name: 'Железо', needs: 8, got: 3, unit: 'мг', color: 'bg-red-500' },
  { id: 'vitD', name: 'Витамин D', needs: 15, got: 2, unit: 'мкг', color: 'bg-yellow-400' },
  { id: 'omega3', name: 'Омега-3', needs: 1.6, got: 0.2, unit: 'г', color: 'bg-blue-500' },
  { id: 'magnesium', name: 'Магний', needs: 400, got: 180, unit: 'мг', color: 'bg-purple-500' }
];

export const MOCK_PRODUCTS: Record<string, Product[]> = {
  'iron': [
    { id: 'p1', name: 'Говядина вырезка', category: 'Мясо и рыба', nutrientAmount: 2.6, nutrientUnit: 'мг/100г', price: 580, priceUnit: 'кг', imageUrl: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=200&h=200&fit=crop' },
    { id: 'p2', name: 'Чечевица красная', category: 'Крупы и бобовые', nutrientAmount: 7.5, nutrientUnit: 'мг/100г', price: 120, priceUnit: 'кг', imageUrl: 'https://images.unsplash.com/photo-1515589654462-a9881e276b84?w=200&h=200&fit=crop' },
    { id: 'p3', name: 'Шпинат свежий', category: 'Овощи и зелень', nutrientAmount: 2.7, nutrientUnit: 'мг/100г', price: 180, priceUnit: 'упак.', imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop' },
    { id: 'p4', name: 'Тыквенные семечки', category: 'Орехи и семена', nutrientAmount: 8.8, nutrientUnit: 'мг/100г', price: 290, priceUnit: '100г', imageUrl: 'https://images.unsplash.com/photo-1601058269785-f5b24131b7da?w=200&h=200&fit=crop' },
    { id: 'p5', name: 'Гречка', category: 'Крупы и бобовые', nutrientAmount: 6.7, nutrientUnit: 'мг/100г', price: 80, priceUnit: '500г', imageUrl: 'https://images.unsplash.com/photo-1614275037996-180b0c5344d9?w=200&h=200&fit=crop' },
  ],
  'vitD': [
    { id: 'p6', name: 'Семга', category: 'Мясо и рыба', nutrientAmount: 11.0, nutrientUnit: 'мкг/100г', price: 1200, priceUnit: 'кг', imageUrl: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=200&h=200&fit=crop' },
    { id: 'p7', name: 'Яйца куриные', category: 'Молочные продукты', nutrientAmount: 2.2, nutrientUnit: 'мкг/100г', price: 120, priceUnit: '10шт', imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop' },
  ],
  'omega3': [
    { id: 'p6', name: 'Семга', category: 'Мясо и рыба', nutrientAmount: 2.3, nutrientUnit: 'г/100г', price: 1200, priceUnit: 'кг', imageUrl: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=200&h=200&fit=crop' },
    { id: 'p8', name: 'Грецкие орехи', category: 'Орехи и семена', nutrientAmount: 2.5, nutrientUnit: 'г/100г', price: 450, priceUnit: '200г', imageUrl: 'https://images.unsplash.com/photo-1564149504298-00c351fd7f16?w=200&h=200&fit=crop' },
  ],
  'magnesium': [
    { id: 'p4', name: 'Тыквенные семечки', category: 'Орехи и семена', nutrientAmount: 592, nutrientUnit: 'мг/100г', price: 290, priceUnit: '100г', imageUrl: 'https://images.unsplash.com/photo-1601058269785-f5b24131b7da?w=200&h=200&fit=crop' },
    { id: 'p3', name: 'Шпинат свежий', category: 'Овощи и зелень', nutrientAmount: 87, nutrientUnit: 'мг/100г', price: 180, priceUnit: 'упак.', imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop' },
  ]
};

export const MOCK_RECIPES: Record<string, Recipe[]> = {
  'iron': [
    {
      id: 'r1',
      name: 'Говяжий стейк со шпинатом',
      time: 35,
      nutrientAmount: 4.5,
      nutrientUnit: 'мг на порцию',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-8111f4e7c703?w=400&h=300&fit=crop',
      ingredients: [
        { name: 'Говядина', amount: '200г' },
        { name: 'Шпинат', amount: '100г' },
        { name: 'Оливковое масло', amount: '1 ст.л.' },
        { name: 'Чеснок', amount: '2 зубчика' }
      ]
    },
    {
      id: 'r2',
      name: 'Чечевичный суп',
      time: 45,
      nutrientAmount: 6.2,
      nutrientUnit: 'мг на порцию',
      imageUrl: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=400&h=300&fit=crop',
      ingredients: [
        { name: 'Чечевица', amount: '150г' },
        { name: 'Морковь', amount: '1 шт' },
        { name: 'Лук', amount: '1 шт' },
        { name: 'Помидоры', amount: '200г' }
      ]
    }
  ]
};
