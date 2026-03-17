/**
 * Health Tracker — script.js
 * Vanilla JS ES6+, SPA with mock data service layer
 *
 * Service layer pattern: functions prefixed with `api_` currently return
 * mock data but are structured to be replaced with fetch() calls.
 * Base URL placeholder: http://localhost:8080/
 */

/* =====================================================
   MOCK DATA SERVICE LAYER
   Replace these functions with fetch() for real backend
   ===================================================== */

/**
 * GET /api/deficits?userId={id}&date={date}
 * @returns {Array} list of nutrient deficits
 */
function api_getDeficits() {
  return [
    { id: 'iron',      name: 'Железо',    needs: 8,    got: 3,   unit: 'мг',  icon: 'fas fa-heartbeat', color: '#ef4444' },
    { id: 'vitD',      name: 'Витамин D', needs: 15,   got: 2,   unit: 'мкг', icon: 'fas fa-sun',       color: '#f59e0b' },
    { id: 'omega3',    name: 'Омега-3',   needs: 1.6,  got: 0.2, unit: 'г',   icon: 'fas fa-tint',      color: '#3b82f6' },
    { id: 'magnesium', name: 'Магний',    needs: 400,  got: 180, unit: 'мг',  icon: 'fas fa-bolt',      color: '#8b5cf6' },
  ];
}

/**
 * GET /api/products/search?name={query}&deficit={deficitId}
 * @param {string} deficitId
 * @returns {Array} list of ProductDto
 */
function api_getProducts(deficitId) {
  const all = {
    iron: [
      { id: 'p1', productName: 'Говядина вырезка', category: 'Мясо и рыба',
        nutrientAmount: 2.6, nutrientUnit: 'мг/100г', price: 580, priceUnit: 'кг',
        imageUrl: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=120&h=120&fit=crop',
        nutrients: { proteins: 22, fats: { saturated: 7, monounsaturated: 8, polyunsaturated: 0.5 },
                     carbohydrates: { dietaryFiber: 0, sugar: 0 },
                     minerals: { iron: 2.6, potassium: 330, magnesium: 22, calcium: 10, copper: 0.18, zinc: 5 } }
      },
      { id: 'p2', productName: 'Чечевица красная', category: 'Крупы и бобовые',
        nutrientAmount: 7.5, nutrientUnit: 'мг/100г', price: 120, priceUnit: 'кг',
        imageUrl: 'https://images.unsplash.com/photo-1515589654462-a9881e276b84?w=120&h=120&fit=crop',
        nutrients: { proteins: 9, minerals: { iron: 7.5 } }
      },
      { id: 'p3', productName: 'Шпинат свежий', category: 'Овощи и зелень',
        nutrientAmount: 2.7, nutrientUnit: 'мг/100г', price: 180, priceUnit: 'упак.',
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&h=120&fit=crop',
        nutrients: { proteins: 3, minerals: { iron: 2.7, magnesium: 87 } }
      },
      { id: 'p4', productName: 'Тыквенные семечки', category: 'Орехи и семена',
        nutrientAmount: 8.8, nutrientUnit: 'мг/100г', price: 290, priceUnit: '100г',
        imageUrl: 'https://images.unsplash.com/photo-1601058269785-f5b24131b7da?w=120&h=120&fit=crop',
        nutrients: { proteins: 19, minerals: { iron: 8.8, magnesium: 592 } }
      },
      { id: 'p5', productName: 'Гречка', category: 'Крупы и бобовые',
        nutrientAmount: 6.7, nutrientUnit: 'мг/100г', price: 80, priceUnit: '500г',
        imageUrl: 'https://images.unsplash.com/photo-1614275037996-180b0c5344d9?w=120&h=120&fit=crop',
        nutrients: { proteins: 13, minerals: { iron: 6.7, magnesium: 258 } }
      },
    ],
    vitD: [
      { id: 'p6', productName: 'Сёмга', category: 'Мясо и рыба',
        nutrientAmount: 11.0, nutrientUnit: 'мкг/100г', price: 1200, priceUnit: 'кг',
        imageUrl: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=120&h=120&fit=crop',
        nutrients: { proteins: 20, fats: { saturated: 3, monounsaturated: 6, polyunsaturated: 2.3 } }
      },
      { id: 'p7', productName: 'Яйца куриные', category: 'Молочные продукты',
        nutrientAmount: 2.2, nutrientUnit: 'мкг/100г', price: 120, priceUnit: '10 шт',
        imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=120&h=120&fit=crop',
        nutrients: { proteins: 13 }
      },
    ],
    omega3: [
      { id: 'p6', productName: 'Сёмга', category: 'Мясо и рыба',
        nutrientAmount: 2.3, nutrientUnit: 'г/100г', price: 1200, priceUnit: 'кг',
        imageUrl: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=120&h=120&fit=crop',
        nutrients: { proteins: 20, fats: { polyunsaturated: 2.3 } }
      },
      { id: 'p8', productName: 'Грецкие орехи', category: 'Орехи и семена',
        nutrientAmount: 2.5, nutrientUnit: 'г/100г', price: 450, priceUnit: '200г',
        imageUrl: 'https://images.unsplash.com/photo-1564149504298-00c351fd7f16?w=120&h=120&fit=crop',
        nutrients: { proteins: 15, fats: { polyunsaturated: 2.5 } }
      },
    ],
    magnesium: [
      { id: 'p4', productName: 'Тыквенные семечки', category: 'Орехи и семена',
        nutrientAmount: 592, nutrientUnit: 'мг/100г', price: 290, priceUnit: '100г',
        imageUrl: 'https://images.unsplash.com/photo-1601058269785-f5b24131b7da?w=120&h=120&fit=crop',
        nutrients: { minerals: { magnesium: 592 } }
      },
      { id: 'p3', productName: 'Шпинат свежий', category: 'Овощи и зелень',
        nutrientAmount: 87, nutrientUnit: 'мг/100г', price: 180, priceUnit: 'упак.',
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&h=120&fit=crop',
        nutrients: { minerals: { magnesium: 87 } }
      },
    ],
  };
  return all[deficitId] || [];
}

/**
 * GET /api/recipes?deficitType={id}
 * @param {string} deficitId
 * @returns {Array} list of recipes
 */
function api_getRecipes(deficitId) {
  const all = {
    iron: [
      {
        id: 'r1', name: 'Говяжий стейк со шпинатом',
        time: 35, servings: 2,
        nutrientAmount: 4.5, nutrientUnit: 'мг на порцию', nutrientName: 'Железо',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-8111f4e7c703?w=400&h=200&fit=crop',
        ingredients: [
          { name: 'Говядина', amount: '200г', productId: 'p1' },
          { name: 'Шпинат', amount: '100г', productId: 'p3' },
          { name: 'Оливковое масло', amount: '1 ст.л.' },
          { name: 'Чеснок', amount: '2 зубчика' },
        ]
      },
      {
        id: 'r2', name: 'Чечевичный суп',
        time: 45, servings: 3,
        nutrientAmount: 6.2, nutrientUnit: 'мг на порцию', nutrientName: 'Железо',
        imageUrl: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=400&h=200&fit=crop',
        ingredients: [
          { name: 'Чечевица', amount: '150г', productId: 'p2' },
          { name: 'Морковь', amount: '1 шт' },
          { name: 'Лук', amount: '1 шт' },
          { name: 'Помидоры', amount: '200г' },
        ]
      },
    ],
    vitD: [
      {
        id: 'r3', name: 'Запечённая сёмга с лимоном',
        time: 25, servings: 2,
        nutrientAmount: 15.4, nutrientUnit: 'мкг на порцию', nutrientName: 'Витамин D',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=200&fit=crop',
        ingredients: [
          { name: 'Сёмга', amount: '300г', productId: 'p6' },
          { name: 'Лимон', amount: '1 шт' },
          { name: 'Укроп', amount: 'по вкусу' },
        ]
      },
    ],
    omega3: [
      {
        id: 'r4', name: 'Салат с сёмгой и грецкими орехами',
        time: 15, servings: 2,
        nutrientAmount: 3.2, nutrientUnit: 'г на порцию', nutrientName: 'Омега-3',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=200&fit=crop',
        ingredients: [
          { name: 'Сёмга', amount: '150г', productId: 'p6' },
          { name: 'Грецкие орехи', amount: '30г', productId: 'p8' },
          { name: 'Микрозелень', amount: '50г' },
        ]
      },
    ],
    magnesium: [
      {
        id: 'r5', name: 'Смузи с тыквенными семечками',
        time: 10, servings: 1,
        nutrientAmount: 180, nutrientUnit: 'мг на порцию', nutrientName: 'Магний',
        imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=200&fit=crop',
        ingredients: [
          { name: 'Тыквенные семечки', amount: '30г', productId: 'p4' },
          { name: 'Шпинат', amount: '50г', productId: 'p3' },
          { name: 'Банан', amount: '1 шт' },
        ]
      },
    ],
  };
  return all[deficitId] || [];
}

/**
 * GET /api/recommendations?userId={id}
 */
function api_getRecommendations() {
  return [
    { icon: '💧', title: 'Пейте больше воды', text: 'Вы выпили 1.2л из 2.5л. Добавьте ещё 2-3 стакана.' },
    { icon: '🌙', title: 'Режим сна', text: 'Спите 7–9 часов. Сегодня вы спали 6.5ч.' },
    { icon: '🥗', title: 'Добавьте железо', text: 'Съешьте чечевицу или говядину для восполнения дефицита.' },
  ];
}

/**
 * GET /api/meals?userId={id}&date={date}
 */
function api_getMeals() {
  return [
    { type: 'BREAKFAST', label: 'Завтрак', icon: '🍳', items: 'Овсянка, Яблоко', kcal: 245 },
    { type: 'LUNCH',     label: 'Обед',    icon: '🥗', items: 'Куриная грудка, Гречка, Салат', kcal: 520 },
    { type: 'DINNER',    label: 'Ужин',    icon: '🍽️', items: 'Творог, Орехи', kcal: 380 },
    { type: 'SNACK',     label: 'Перекус', icon: '🍎', items: 'Яблоко, Протеиновый батончик', kcal: 305 },
  ];
}

/**
 * GET /api/shopping-list?userId={id}
 */
function api_getShoppingList() {
  return [
    { id: 's1',  name: 'Говядина вырезка',   category: 'meat',  icon: '🥩', weight: '500г',  price: 290 },
    { id: 's2',  name: 'Сёмга',              category: 'meat',  icon: '🐟', weight: '400г',  price: 480 },
    { id: 's3',  name: 'Шпинат свежий',      category: 'veg',   icon: '🥬', weight: '200г',  price: 180 },
    { id: 's4',  name: 'Брокколи',           category: 'veg',   icon: '🥦', weight: '500г',  price: 120 },
    { id: 's5',  name: 'Морковь',            category: 'veg',   icon: '🥕', weight: '1кг',   price: 60  },
    { id: 's6',  name: 'Чечевица красная',   category: 'grain', icon: '🫘', weight: '500г',  price: 120 },
    { id: 's7',  name: 'Гречка',             category: 'grain', icon: '🌾', weight: '500г',  price: 80  },
    { id: 's8',  name: 'Овсянка',            category: 'grain', icon: '🌾', weight: '500г',  price: 90  },
    { id: 's9',  name: 'Творог 5%',          category: 'dairy', icon: '🧀', weight: '500г',  price: 180 },
    { id: 's10', name: 'Яйца куриные',       category: 'dairy', icon: '🥚', weight: '10 шт', price: 120 },
    { id: 's11', name: 'Тыквенные семечки',  category: 'nuts',  icon: '🌻', weight: '200г',  price: 145 },
  ];
}

/**
 * POST /api/meals
 * Simulates saving a meal entry
 * @param {Object} mealData
 */
function api_saveMeal(mealData) {
  console.log('[API] POST /api/meals', mealData);
  return { id: crypto.randomUUID(), ...mealData, createdAt: new Date().toISOString() };
}

/* =====================================================
   APP STATE
   ===================================================== */
const state = {
  currentScreen: 'dashboard',
  currentDeficit: null,
  currentTab: 'products',
  cart: [],       // items added from products screen
  shopping: [],   // shopping list items
  chatMessages: [],
};

/* =====================================================
   NAVIGATION
   ===================================================== */
function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.bottom-nav__item').forEach(b => b.classList.remove('bottom-nav__item--active'));

  const screen = document.getElementById(`screen-${screenId}`);
  const navBtn = document.getElementById(`nav-${screenId}`);
  if (screen) screen.classList.add('active');
  if (navBtn) navBtn.classList.add('bottom-nav__item--active');

  state.currentScreen = screenId;

  if (screenId === 'shopping') renderShoppingList();
  if (screenId === 'products') renderProductsScreen();
  if (screenId === 'dashboard') renderDashboard();
}

function openProductsForDeficit(deficitId) {
  state.currentDeficit = deficitId;
  state.currentTab = 'products';
  navigateTo('products');
}

/* =====================================================
   DASHBOARD
   ===================================================== */
function renderDashboard() {
  renderDeficits();
  renderRecommendations();
  renderMeals();
}

function renderDeficits() {
  const deficits = api_getDeficits();
  const el = document.getElementById('deficit-list');
  el.innerHTML = deficits.map(d => {
    const pct = Math.round((d.got / d.needs) * 100);
    return `
      <div class="deficit-item">
        <div class="deficit-item__top">
          <div class="deficit-item__left">
            <div class="deficit-item__icon" style="background:${d.color}">
              <i class="${d.icon}"></i>
            </div>
            <div>
              <div class="deficit-item__name">${d.name}</div>
              <div class="deficit-item__gap">Не хватает ${formatNum(d.needs - d.got)}${d.unit}</div>
            </div>
          </div>
          <button class="btn-fix" onclick="openProductsForDeficit('${d.id}')">
            <i class="fas fa-magic" style="margin-right:4px;font-size:10px"></i>Исправить
          </button>
        </div>
        <div class="deficit-item__progress-row">
          <div class="progress-bar deficit-item__bar">
            <div class="progress-bar__fill" style="width:${pct}%;background:${d.color}"></div>
          </div>
          <span class="deficit-item__nums">${formatNum(d.got)}/${formatNum(d.needs)}</span>
        </div>
      </div>`;
  }).join('');
}

function renderRecommendations() {
  const recs = api_getRecommendations();
  const el = document.getElementById('recommendation-list');
  el.innerHTML = recs.map(r => `
    <div class="recommendation-item">
      <div class="recommendation-item__icon">${r.icon}</div>
      <div>
        <div class="recommendation-item__title">${r.title}</div>
        <div class="recommendation-item__text">${r.text}</div>
      </div>
    </div>`).join('');
}

function renderMeals() {
  const meals = api_getMeals();
  const el = document.getElementById('meals-list');
  el.innerHTML = meals.map(m => `
    <div class="meal-item">
      <div class="meal-item__left">
        <div class="meal-item__icon">${m.icon}</div>
        <div>
          <div class="meal-item__name">${m.label}</div>
          <div class="meal-item__items">${m.items}</div>
        </div>
      </div>
      <div class="meal-item__kcal">${m.kcal} ккал</div>
    </div>`).join('');
}

/* =====================================================
   PRODUCTS & RECIPES
   ===================================================== */
function renderProductsScreen() {
  const deficits = api_getDeficits();
  const d = deficits.find(x => x.id === state.currentDeficit);

  const titleEl = document.getElementById('products-title');
  const subtitleEl = document.getElementById('products-subtitle');
  const addAllBtn = document.getElementById('add-all-btn');

  if (d) {
    titleEl.textContent = `Продукты: ${d.name}`;
    subtitleEl.textContent = `Дефицит ${formatNum(d.needs - d.got)}${d.unit}`;
    addAllBtn.style.display = '';
  } else {
    titleEl.textContent = 'Продукты и рецепты';
    subtitleEl.textContent = 'Для устранения дефицитов';
    addAllBtn.style.display = 'none';
  }

  switchTab(state.currentTab);
}

function switchTab(tabName) {
  state.currentTab = tabName;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
  const activeTab = document.getElementById(`tab-${tabName}`);
  if (activeTab) activeTab.classList.add('tab--active');

  const content = document.getElementById('products-content');

  if (tabName === 'products') {
    renderProducts(content);
  } else {
    renderRecipes(content);
  }
}

function renderProducts(container) {
  const deficitId = state.currentDeficit || 'iron';
  const products = api_getProducts(deficitId);

  if (!products.length) {
    container.innerHTML = `
      <div class="products-empty">
        <div class="products-empty__icon">🛒</div>
        <div class="products-empty__title">Продукты не найдены</div>
        <div class="products-empty__text">Выберите дефицит на дашборде и нажмите «Исправить»</div>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="products-actions">
      <button class="btn-add-all" onclick="addAllToCart()">
        <i class="fas fa-cart-plus"></i> Добавить все в список покупок
      </button>
    </div>
    <div class="product-list">
      ${products.map(p => renderProductCard(p)).join('')}
    </div>
    <div class="screen__spacer"></div>`;
}

function renderProductCard(p) {
  const inCart = state.cart.find(c => c.id === p.id);
  return `
    <div class="product-card" id="pcard-${p.id}">
      <img class="product-card__img" src="${p.imageUrl}" alt="${p.productName}" loading="lazy">
      <div class="product-card__info">
        <div class="product-card__name">${p.productName}</div>
        <div class="product-card__nutrient">
          <i class="fas fa-leaf" style="font-size:10px"></i> ${p.nutrientAmount} ${p.nutrientUnit}
        </div>
        <div class="product-card__price">₽ ${p.price} / ${p.priceUnit}</div>
      </div>
      <button class="btn-add ${inCart ? 'added' : ''}"
              onclick="addProductToCart('${p.id}')"
              title="${inCart ? 'Добавлено' : 'Добавить в список покупок'}">
        ${inCart ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>'}
      </button>
    </div>`;
}

function renderRecipes(container) {
  const deficitId = state.currentDeficit || 'iron';
  const recipes = api_getRecipes(deficitId);

  if (!recipes.length) {
    container.innerHTML = `
      <div class="products-empty">
        <div class="products-empty__icon">👨‍🍳</div>
        <div class="products-empty__title">Рецепты не найдены</div>
        <div class="products-empty__text">Для данного дефицита рецепты пока не добавлены</div>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="recipe-list">
      ${recipes.map(r => `
        <div class="recipe-card">
          <img class="recipe-card__img" src="${r.imageUrl}" alt="${r.name}" loading="lazy">
          <div class="recipe-card__body">
            <div class="recipe-card__top">
              <div class="recipe-card__name">${r.name}</div>
            </div>
            <div class="recipe-card__meta">
              <div class="recipe-card__badge">
                <i class="fas fa-clock"></i> ${r.time} мин
              </div>
              <div class="recipe-card__badge">
                <i class="fas fa-leaf"></i> ${r.nutrientName}: ${r.nutrientAmount} ${r.nutrientUnit}
              </div>
            </div>
            <div class="recipe-card__ingredients">
              <div class="recipe-card__ingredients-title">Ингредиенты</div>
              <div class="recipe-card__ingredient-list">
                ${r.ingredients.map(i => `<span class="recipe-card__ingredient">${i.name} ${i.amount}</span>`).join('')}
              </div>
            </div>
            <button class="btn-recipe-add" onclick="addRecipeToCart('${r.id}', '${deficitId}')">
              <i class="fas fa-cart-plus"></i> Добавить ингредиенты в список
            </button>
          </div>
        </div>`).join('')}
    </div>
    <div class="screen__spacer"></div>`;
}

/* =====================================================
   CART / SHOPPING LIST MANAGEMENT
   ===================================================== */
function addProductToCart(productId) {
  const deficitId = state.currentDeficit || 'iron';
  const products = api_getProducts(deficitId);
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.shopping.find(s => s.id === `cart-${productId}`);
  if (existing) {
    showToast(`${product.productName} уже в списке`);
    return;
  }

  state.shopping.push({
    id: `cart-${productId}`,
    name: product.productName,
    category: categoryFromProduct(product),
    icon: iconFromCategory(product.category),
    weight: '200г',
    price: Math.round(product.price * 0.2),
    checked: false,
  });

  updateCartBadge();
  showToast(`${product.productName} добавлен в список покупок`);

  // Re-render the card
  const card = document.getElementById(`pcard-${productId}`);
  if (card) {
    card.querySelector('.btn-add').classList.add('added');
    card.querySelector('.btn-add').innerHTML = '<i class="fas fa-check"></i>';
  }
}

function addAllToCart() {
  const deficitId = state.currentDeficit || 'iron';
  const products = api_getProducts(deficitId);
  let added = 0;
  products.forEach(p => {
    const exists = state.shopping.find(s => s.id === `cart-${p.id}`);
    if (!exists) {
      state.shopping.push({
        id: `cart-${p.id}`,
        name: p.productName,
        category: categoryFromProduct(p),
        icon: iconFromCategory(p.category),
        weight: '200г',
        price: Math.round(p.price * 0.2),
        checked: false,
      });
      added++;
    }
  });
  updateCartBadge();
  showToast(added > 0 ? `Добавлено ${added} товаров в список` : 'Все товары уже в списке');
  renderProductsScreen();
}

function addRecipeToCart(recipeId, deficitId) {
  const recipes = api_getRecipes(deficitId);
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  let added = 0;
  recipe.ingredients.forEach(ing => {
    if (!ing.productId) return;
    const exists = state.shopping.find(s => s.id === `cart-${ing.productId}`);
    if (exists) return;

    const products = api_getProducts(deficitId);
    const p = products.find(x => x.id === ing.productId);
    if (!p) return;

    state.shopping.push({
      id: `cart-${ing.productId}`,
      name: p.productName,
      category: categoryFromProduct(p),
      icon: iconFromCategory(p.category),
      weight: ing.amount,
      price: Math.round(p.price * 0.15),
      checked: false,
    });
    added++;
  });

  updateCartBadge();
  showToast(added > 0 ? `Добавлено ${added} ингредиентов` : 'Ингредиенты уже в списке');
}

function categoryFromProduct(p) {
  const map = {
    'Мясо и рыба': 'meat', 'Овощи и зелень': 'veg',
    'Крупы и бобовые': 'grain', 'Молочные продукты': 'dairy',
    'Орехи и семена': 'nuts',
  };
  return map[p.category] || 'other';
}

function iconFromCategory(categoryLabel) {
  const map = {
    'Мясо и рыба': '🥩', 'Овощи и зелень': '🥬',
    'Крупы и бобовые': '🌾', 'Молочные продукты': '🧀',
    'Орехи и семена': '🌰',
  };
  return map[categoryLabel] || '🛒';
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = state.shopping.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? '' : 'none';
}

/* =====================================================
   SHOPPING LIST SCREEN
   ===================================================== */
function renderShoppingList() {
  // Merge API initial list + cart items (first render)
  if (state.shopping.length === 0) {
    state.shopping = api_getShoppingList().map(i => ({ ...i, checked: false }));
    updateCartBadge();
  }

  const container = document.getElementById('shopping-list-content');

  if (!state.shopping.length) {
    container.innerHTML = `
      <div class="shopping-empty">
        <div class="shopping-empty__icon">🛒</div>
        <div class="shopping-empty__title">Список пуст</div>
        <div class="shopping-empty__text">Добавьте товары из раздела «Продукты» или через кнопку «Исправить» на дашборде</div>
      </div>`;
    updateTotal();
    return;
  }

  const groups = {
    meat:  { label: 'Мясо и рыба',       icon: '🥩', items: [] },
    veg:   { label: 'Овощи и зелень',    icon: '🥬', items: [] },
    grain: { label: 'Крупы и бобовые',   icon: '🌾', items: [] },
    dairy: { label: 'Молочные продукты', icon: '🧀', items: [] },
    nuts:  { label: 'Орехи и семена',    icon: '🌰', items: [] },
    other: { label: 'Другое',            icon: '🛒', items: [] },
  };

  state.shopping.forEach(item => {
    const g = groups[item.category] || groups.other;
    g.items.push(item);
  });

  let html = '';
  for (const [, group] of Object.entries(groups)) {
    if (!group.items.length) continue;
    html += `
      <div class="shopping-group">
        <div class="shopping-group__header">
          <span class="shopping-group__icon">${group.icon}</span>
          <span class="shopping-group__name">${group.label}</span>
          <span class="shopping-group__count">${group.items.length} поз.</span>
        </div>
        <div class="shopping-items">
          ${group.items.map(item => `
            <div class="shopping-item ${item.checked ? 'checked' : ''}" id="sitem-${item.id}">
              <div class="shopping-item__check" onclick="toggleShoppingItem('${item.id}')">
                ${item.checked ? '<i class="fas fa-check"></i>' : ''}
              </div>
              <div class="shopping-item__info">
                <div class="shopping-item__name">${item.name}</div>
                <div class="shopping-item__weight">${item.weight}</div>
              </div>
              <div class="shopping-item__price">₽ ${item.price}</div>
              <button class="shopping-item__delete" onclick="deleteShoppingItem('${item.id}')" title="Удалить">
                <i class="fas fa-times"></i>
              </button>
            </div>`).join('')}
        </div>
      </div>`;
  }

  container.innerHTML = html + '<div class="screen__spacer"></div>';
  updateTotal();
}

function toggleShoppingItem(itemId) {
  const item = state.shopping.find(s => s.id === itemId);
  if (!item) return;
  item.checked = !item.checked;

  const el = document.getElementById(`sitem-${itemId}`);
  if (!el) return;
  el.classList.toggle('checked', item.checked);
  const checkEl = el.querySelector('.shopping-item__check');
  checkEl.innerHTML = item.checked ? '<i class="fas fa-check"></i>' : '';
  updateTotal();
}

function deleteShoppingItem(itemId) {
  state.shopping = state.shopping.filter(s => s.id !== itemId);
  updateCartBadge();
  renderShoppingList();
}

function updateTotal() {
  const total = state.shopping
    .filter(s => !s.checked)
    .reduce((sum, s) => sum + s.price, 0);
  const el = document.getElementById('shopping-total');
  if (el) el.textContent = `₽ ${total.toLocaleString('ru-RU')}`;
}

function clearShoppingList() {
  if (!confirm('Очистить весь список покупок?')) return;
  state.shopping = [];
  updateCartBadge();
  renderShoppingList();
  showToast('Список очищен');
}

function shareShoppingList() {
  if (!state.shopping.length) { showToast('Список пуст'); return; }
  const text = state.shopping
    .map(s => `• ${s.name} (${s.weight}) — ₽${s.price}`)
    .join('\n');
  const total = state.shopping.reduce((sum, s) => sum + s.price, 0);
  const full = `Список покупок на неделю:\n${text}\n\nИтого: ₽${total.toLocaleString('ru-RU')}`;

  if (navigator.share) {
    navigator.share({ title: 'Список покупок', text: full });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(full).then(() => showToast('Список скопирован в буфер обмена'));
  } else {
    showToast('Список скопирован');
  }
}

/* =====================================================
   CHAT
   ===================================================== */
const BOT_RESPONSES = {
  завтрак:    (msg) => `Понял, записал завтрак! Расскажите подробнее — что вы ели?`,
  обед:       (msg) => `Записываю обед. Что именно вы съели? Укажите продукты и порции.`,
  ужин:       (msg) => `Записываю ужин. Что было на ужин? Можно просто перечислить продукты.`,
  вода:       (msg) => `Записал! Выпили ещё 250мл воды. Сегодня: 1.45л из 2.5л. Отлично, ещё чуть-чуть! 💧`,
  сон:        (msg) => `Записал время сна. Хорошего отдыха! Рекомендуется 7–9 часов. 🌙`,
  зарядку:    (msg) => `Отлично! Записал тренировку. Физическая активность помогает усваивать нутриенты. 🏃`,
  активность: (msg) => `Записал физическую активность. Продолжайте в том же духе! 💪`,
  овсянку:    (msg) => parseFood(msg),
  яблоко:     (msg) => parseFood(msg),
  курицу:     (msg) => parseFood(msg),
  говядину:   (msg) => parseFood(msg),
  default:    (msg) => parseFood(msg),
};

function parseFood(msg) {
  return `Проанализировал ваш рацион. Примерные данные:
🔸 Белки: ~${rnd(15, 30)}г
🔸 Жиры: ~${rnd(5, 20)}г  
🔸 Углеводы: ~${rnd(20, 60)}г
🔸 Калории: ~${rnd(150, 500)} ккал

Записал в дневник питания! Чтобы получить точные данные, укажите граммовку продуктов.`;
}

function rnd(a, b) { return Math.floor(Math.random() * (b - a) + a); }

function getBotResponse(msg) {
  const lower = msg.toLowerCase();
  for (const [key, fn] of Object.entries(BOT_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) return fn(msg);
  }
  return BOT_RESPONSES.default(msg);
}

function initChat() {
  const initial = [
    { role: 'bot', text: 'Привет! 👋 Я ваш персональный ассистент по здоровью и питанию. Расскажите, что вы съели сегодня, или воспользуйтесь быстрыми кнопками ниже.' },
    { role: 'user', text: 'Съел овсянку на молоке и яблоко на завтрак' },
    { role: 'bot', text: 'Отлично! Записал завтрак:\n🥣 Овсянка на молоке (150г) — 150 ккал\n🍎 Яблоко (180г) — 95 ккал\n\nИтого: 245 ккал | Белки: 6г | Жиры: 4г | Углеводы: 48г' },
    { role: 'user', text: 'Выпил 2 стакана воды' },
    { role: 'bot', text: 'Записал: +500мл воды. 💧\nСегодня выпито: 1.2л из 2.5л' },
  ];
  state.chatMessages = initial;
  renderChatMessages();
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  container.innerHTML = state.chatMessages.map(renderChatMsg).join('');
  container.scrollTop = container.scrollHeight;
}

function renderChatMsg(msg) {
  const isBot = msg.role === 'bot';
  const text = msg.text.replace(/\n/g, '<br>');
  const time = msg.time || formatTime(new Date());
  return `
    <div class="chat-msg chat-msg--${msg.role}">
      <div class="chat-msg__avatar">
        ${isBot ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'}
      </div>
      <div>
        <div class="chat-msg__bubble">${text}</div>
        <span class="chat-msg__time">${time}</span>
      </div>
    </div>`;
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const time = formatTime(new Date());
  state.chatMessages.push({ role: 'user', text, time });
  input.value = '';

  const container = document.getElementById('chat-messages');
  container.innerHTML = state.chatMessages.map(renderChatMsg).join('');
  container.scrollTop = container.scrollHeight;

  // Simulate API call: POST /api/meals
  api_saveMeal({ userId: 'user-123', rawText: text, timestamp: new Date().toISOString() });

  // Typing indicator
  const typingId = 'typing-' + Date.now();
  container.innerHTML += `
    <div class="chat-msg chat-msg--bot" id="${typingId}">
      <div class="chat-msg__avatar"><i class="fas fa-robot"></i></div>
      <div class="chat-msg__bubble">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>`;
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    const botText = getBotResponse(text);
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    state.chatMessages.push({ role: 'bot', text: botText, time: formatTime(new Date()) });
    container.innerHTML = state.chatMessages.map(renderChatMsg).join('');
    container.scrollTop = container.scrollHeight;
  }, 1000 + Math.random() * 800);
}

function sendQuickMessage(text) {
  const input = document.getElementById('chat-input');
  input.value = text;
  sendChatMessage();
}

function clearChat() {
  if (!confirm('Очистить историю чата?')) return;
  state.chatMessages = [];
  initChat();
}

/* =====================================================
   TOAST
   ===================================================== */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* =====================================================
   UTILS
   ===================================================== */
function formatNum(n) {
  return Number.isInteger(n) ? n.toString() : parseFloat(n.toFixed(1)).toString();
}

function formatTime(date) {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' });
}

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current-date').textContent = formatDate(new Date());
  initChat();
  renderDashboard();
});
