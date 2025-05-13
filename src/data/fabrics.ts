
// Структура данных о тканях
export interface Fabric {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  details: {
    width: string;
    weight: string;
    composition: string;
    origin: string;
    careInstructions: string;
  };
  features: string[];
  applications: string[];
}

// Массив с данными о тканях
// Здесь вы можете добавить свои ткани, заменив эти тестовые данные
export const FABRICS: Fabric[] = [
  {
    id: "1",
    name: "Хлопок Премиум",
    category: "Хлопок",
    price: 850,
    image: "https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=786&q=80",
    description: "Мягкий хлопок высокого качества для пошива одежды",
    details: {
      width: "150 см",
      weight: "240 г/м²",
      composition: "100% хлопок",
      origin: "Россия",
      careInstructions: "Машинная стирка при 30°C, не отбеливать, средний нагрев при глажке",
    },
    features: [
      "Высокая прочность",
      "Гипоаллергенность",
      "Воздухопроницаемость",
      "Долговечность",
    ],
    applications: [
      "Пошив повседневной одежды",
      "Рубашки, блузки, платья",
      "Детская одежда",
      "Домашний текстиль",
    ],
  },
  {
    id: "2",
    name: "Шёлк Натуральный",
    category: "Шёлк",
    price: 2800,
    image: "https://images.unsplash.com/photo-1620437064667-949239d3540e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description: "Гладкий и блестящий натуральный шёлк для изысканной одежды",
    details: {
      width: "135 см",
      weight: "75 г/м²",
      composition: "100% натуральный шёлк",
      origin: "Китай",
      careInstructions: "Ручная стирка, не отбеливать, не отжимать, сушить в расправленном виде",
    },
    features: [
      "Природный блеск",
      "Высокая прочность",
      "Гипоаллергенность",
      "Терморегуляция",
    ],
    applications: [
      "Вечерние наряды",
      "Блузки и платья",
      "Постельное белье",
      "Шарфы и платки",
    ],
  },
  
  // Добавьте здесь ваши ткани по такому же формату
  // {
  //   id: "ваш-id", // Уникальный идентификатор, например "7", "8", и т.д.
  //   name: "Название ткани",
  //   category: "Категория ткани", // Например, "Хлопок", "Шёлк", и т.п.
  //   price: 1000, // Цена за метр
  //   image: "ссылка на изображение", // Можно использовать локальные изображения или внешние ссылки
  //   description: "Краткое описание ткани",
  //   details: {
  //     width: "Ширина ткани, например 150 см",
  //     weight: "Плотность, например 240 г/м²",
  //     composition: "Состав ткани",
  //     origin: "Страна производства",
  //     careInstructions: "Инструкции по уходу",
  //   },
  //   features: [
  //     "Особенность 1",
  //     "Особенность 2",
  //     "Особенность 3",
  //     "Особенность 4",
  //   ],
  //   applications: [
  //     "Применение 1",
  //     "Применение 2",
  //     "Применение 3",
  //     "Применение 4",
  //   ],
  // },
  
  // Остальные примеры
  {
    id: "3",
    name: "Лён Классический",
    category: "Лён",
    price: 1200,
    image: "https://images.unsplash.com/photo-1596149615493-f0739de31c2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Натуральный лён для летней одежды и домашнего текстиля",
    details: {
      width: "150 см",
      weight: "170 г/м²",
      composition: "100% лён",
      origin: "Беларусь",
      careInstructions: "Машинная стирка при 40°C, не отбеливать, высокая температура глажки",
    },
    features: [
      "Высокая прочность",
      "Экологичность",
      "Воздухопроницаемость",
      "Антибактериальные свойства",
    ],
    applications: [
      "Летняя одежда",
      "Скатерти и салфетки",
      "Полотенца",
      "Постельное белье",
    ],
  },
  {
    id: "4",
    name: "Шерсть Мериноса",
    category: "Шерсть",
    price: 3200,
    image: "https://images.unsplash.com/photo-1598030550086-994c3878bea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Мягкая и тёплая шерсть мериноса для зимней одежды",
    details: {
      width: "140 см",
      weight: "300 г/м²",
      composition: "100% шерсть мериноса",
      origin: "Австралия",
      careInstructions: "Ручная стирка в холодной воде, сушить в расправленном виде",
    },
    features: [
      "Мягкость",
      "Терморегуляция",
      "Не вызывает раздражения",
      "Отводит влагу",
    ],
    applications: [
      "Верхняя одежда",
      "Пальто и жакеты",
      "Свитера, кардиганы",
      "Шарфы и шапки",
    ],
  },
];

// Список всех категорий тканей
export const CATEGORIES: string[] = ["Все", ...Array.from(new Set(FABRICS.map(fabric => fabric.category)))];
