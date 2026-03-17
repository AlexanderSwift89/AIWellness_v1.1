# Health Tracker — Инструкция по развёртыванию

## Описание проекта

**Health Tracker** — мобильное веб-приложение для персонализированного трекера здоровья и питания. Реализовано на чистом HTML/CSS/JavaScript (ES6+), без фреймворков.

### 4 экрана приложения

| Экран | Описание |
|-------|----------|
| **Дашборд** | Калории, макронутриенты, текущие дефициты, рекомендации, приёмы пищи |
| **Чат** | Ввод питания и активности на естественном языке, быстрые кнопки |
| **Продукты и рецепты** | Список продуктов и рецептов для устранения дефицитов |
| **Список покупок** | Редактируемый список с группировкой по категориям и итоговой суммой |

Все данные загружаются из мок-объектов JavaScript. Структура функций соответствует будущему REST API.

---

## Технологический стек

| Технология | Назначение |
|------------|------------|
| **HTML5** | Семантическая разметка, мобильный viewport |
| **CSS3** | Адаптивный дизайн, Flexbox/Grid, CSS-переменные, анимации |
| **JavaScript ES6+** | Логика приложения, управление состоянием, SPA-навигация |
| **Font Awesome 6** | Иконки (CDN) |
| **Google Fonts** | Шрифт Inter (CDN) |
| **Vite** | Dev-сервер и статический хостинг (только для Replit / локальной разработки) |

---

## Способ 1 — Открытие без сервера

1. Скачайте или клонируйте репозиторий
2. Откройте файл `index.html` в браузере

> ⚠️ Некоторые браузеры ограничивают `fetch()` при открытии через `file://`.
> Для полной функциональности рекомендуется Способ 2 (локальный сервер).

---

## Способ 2 — Локальный статический сервер

Используйте любой HTTP-сервер. Примеры:

### Python (встроен в систему)

```bash
# Python 3
python3 -m http.server 3000
```

Откройте: [http://localhost:3000](http://localhost:3000)

### Node.js (npx serve)

```bash
npx serve .
```

Откройте: [http://localhost:3000](http://localhost:3000)

### Live Server (VS Code)

Установите расширение **Live Server** → ПКМ на `index.html` → *Open with Live Server*

---

## Способ 3 — Запуск через Vite (для разработки)

Требует: **Node.js 18+** и **pnpm 8+**

### Установка pnpm (если не установлен)

```bash
npm install -g pnpm
```

### Установка зависимостей и запуск

```bash
# Из корня монорепозитория
pnpm install

# Запуск dev-сервера Health Tracker
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/health-tracker run dev
```

Откройте: [http://localhost:3000](http://localhost:3000)

---

## Структура файлов

```
artifacts/health-tracker/
├── index.html          # Главная страница — HTML-разметка всех 4 экранов
├── style.css           # Все стили (мобильный-first, CSS-переменные)
├── script.js           # Вся логика: навигация, сервисный слой, чат, шопинг-лист
├── vite.config.ts      # Конфигурация Vite-dev-сервера (только для разработки)
└── package.json        # Манифест пакета (dev-зависимости)
```

---

## Сервисный слой (мок-данные)

Все функции данных находятся в начале файла `script.js` и имеют префикс `api_`. Они структурированы так, чтобы легко заменить мок-данные на реальные HTTP-запросы:

```javascript
// ─── Сейчас (мок-данные) ───────────────────────────────────────────
function api_getDeficits() {
  return [
    { id: 'iron', name: 'Железо', needs: 8, got: 3, unit: 'мг', ... },
    ...
  ];
}

// ─── После подключения бэкенда ─────────────────────────────────────
async function api_getDeficits() {
  const res = await fetch('http://localhost:8080/api/deficits?userId=user-123');
  return res.json();
}
```

### Базовый URL бэкенда

```
http://localhost:8080/
```

---

## API-эндпоинты (для будущей интеграции)

| Метод | Эндпоинт | Функция в script.js | Описание |
|-------|----------|---------------------|----------|
| GET | `/api/deficits?userId={id}&date={date}` | `api_getDeficits()` | Текущие дефициты нутриентов |
| GET | `/api/products/search?deficit={id}` | `api_getProducts(deficitId)` | Продукты для устранения дефицита |
| GET | `/api/recipes?deficitType={id}` | `api_getRecipes(deficitId)` | Рецепты для устранения дефицита |
| GET | `/api/recommendations?userId={id}` | `api_getRecommendations()` | Персональные рекомендации |
| GET | `/api/meals?userId={id}&date={date}` | `api_getMeals()` | Приёмы пищи за день |
| GET | `/api/shopping-list?userId={id}` | `api_getShoppingList()` | Список покупок |
| POST | `/api/meals` | `api_saveMeal(data)` | Сохранение приёма пищи (чат) |

---

## Совместимость

- ✅ Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- ✅ Мобильные браузеры (iOS Safari, Android Chrome)
- ✅ Оптимизировано для ширины **375px–414px** (iPhone)
- ✅ Корректно отображается на десктопе (центрированная мобильная рамка)

### Рекомендуемые настройки DevTools

Откройте DevTools (F12) → Toggle Device Toolbar → выберите **iPhone 14 Pro** (393 × 852 px)

---

## Вопросы и поддержка

Репозиторий: [https://github.com/AlexanderSwift89/AIWellness_v1.1](https://github.com/AlexanderSwift89/AIWellness_v1.1)
