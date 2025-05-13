import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

// Временные данные для демонстрации
const FABRICS = [
  {
    id: "1",
    name: "Хлопок Премиум",
    category: "Хлопок",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=786&q=80",
    description: "Мягкий хлопок высокого качества для пошива одежды",
    details: {
      width: "150 см",
      weight: "240 г/м²",
      composition: "100% хлопок",
      origin: "Россия",
      careInstructions:
        "Машинная стирка при 30°C, не отбеливать, средний нагрев при глажке",
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
    image:
      "https://images.unsplash.com/photo-1620437064667-949239d3540e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description: "Гладкий и блестящий натуральный шёлк для изысканной одежды",
    details: {
      width: "135 см",
      weight: "75 г/м²",
      composition: "100% натуральный шёлк",
      origin: "Китай",
      careInstructions:
        "Ручная стирка, не отбеливать, не отжимать, сушить в расправленном виде",
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
  {
    id: "3",
    name: "Лён Классический",
    category: "Лён",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1596149615493-f0739de31c2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Натуральный лён для летней одежды и домашнего текстиля",
    details: {
      width: "150 см",
      weight: "170 г/м²",
      composition: "100% лён",
      origin: "Беларусь",
      careInstructions:
        "Машинная стирка при 40°C, не отбеливать, высокая температура глажки",
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
    image:
      "https://images.unsplash.com/photo-1598030550086-994c3878bea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Мягкая и тёплая шерсть мериноса для зимней одежды",
    details: {
      width: "140 см",
      weight: "300 г/м²",
      composition: "100% шерсть мериноса",
      origin: "Австралия",
      careInstructions:
        "Ручная стирка в холодной воде, сушить в расправленном виде",
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
  {
    id: "5",
    name: "Микрофибра",
    category: "Синтетика",
    price: 680,
    image:
      "https://images.unsplash.com/photo-1618089086953-c1b0c93c3a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Мягкая и прочная синтетическая ткань для различных целей",
    details: {
      width: "150 см",
      weight: "220 г/м²",
      composition: "100% полиэстер",
      origin: "Россия",
      careInstructions:
        "Машинная стирка при 30°C, не использовать отбеливатель",
    },
    features: [
      "Прочность",
      "Легкость в уходе",
      "Устойчивость к загрязнениям",
      "Быстрое высыхание",
    ],
    applications: [
      "Спортивная одежда",
      "Домашний текстиль",
      "Мебельная обивка",
      "Полотенца и салфетки",
    ],
  },
  {
    id: "6",
    name: "Деним",
    category: "Хлопок",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1596482150196-4e4baba35f2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description: "Плотный хлопковый материал для джинсовой одежды",
    details: {
      width: "150 см",
      weight: "350 г/м²",
      composition: "100% хлопок",
      origin: "Италия",
      careInstructions:
        "Машинная стирка при 30°C, стирать с изнаночной стороны",
    },
    features: [
      "Высокая прочность",
      "Износостойкость",
      "Хорошая воздухопроницаемость",
      "Со временем становится мягче",
    ],
    applications: [
      "Джинсы и брюки",
      "Куртки и жилеты",
      "Юбки",
      "Сумки и аксессуары",
    ],
  },
];

const FabricDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Найти ткань по ID
  const fabric = FABRICS.find((f) => f.id === id);

  // Если ткань не найдена
  if (!fabric) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12 text-center">
        <Icon
          name="FileQuestion"
          className="mx-auto h-16 w-16 text-muted-foreground mb-4"
        />
        <h1 className="text-2xl font-bold mb-4">Ткань не найдена</h1>
        <p className="text-muted-foreground mb-6">
          К сожалению, запрашиваемая ткань не существует или была удалена.
        </p>
        <Button onClick={() => navigate("/catalog")}>
          Вернуться в каталог
        </Button>
      </div>
    );
  }

  // Рекомендуемые ткани (просто показываем другие ткани из той же категории)
  const recommendations = FABRICS.filter(
    (f) => f.category === fabric.category && f.id !== fabric.id,
  ).slice(0, 3);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Хлебные крошки */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/catalog?category=${fabric.category}`}>
              {fabric.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="font-medium">{fabric.name}</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Основная информация о ткани */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Изображение */}
        <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
          <img
            src={fabric.image}
            alt={fabric.name}
            className="w-full h-full max-h-[500px] object-cover"
          />
        </div>

        {/* Детали товара */}
        <div>
          <div className="mb-2">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm">
              {fabric.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{fabric.name}</h1>
          <p className="text-muted-foreground mb-6">{fabric.description}</p>

          <div className="mb-6">
            <span className="text-3xl font-semibold">{fabric.price} ₽/м</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Ширина</span>
              <span>{fabric.details.width}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Плотность</span>
              <span>{fabric.details.weight}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Состав</span>
              <span>{fabric.details.composition}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Страна производства</span>
              <span>{fabric.details.origin}</span>
            </div>
          </div>

          {/* Контактная информация для заказа */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Icon name="PhoneCall" className="mr-2 h-5 w-5 text-primary" />
              Оформить заказ
            </h3>
            <p className="text-sm mb-3">
              Для заказа этой ткани, пожалуйста, свяжитесь с нами любым удобным
              способом:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Icon name="Phone" className="mr-2 h-4 w-4 text-primary" />
                <a href="tel:+71234567890" className="hover:underline">
                  +7 (123) 456-78-90
                </a>
              </div>
              <div className="flex items-center">
                <Icon name="Mail" className="mr-2 h-4 w-4 text-primary" />
                <a
                  href="mailto:info@tkanikatalog.ru"
                  className="hover:underline"
                >
                  info@tkanikatalog.ru
                </a>
              </div>
              <div className="flex items-center">
                <Icon
                  name="MessageSquare"
                  className="mr-2 h-4 w-4 text-primary"
                />
                <a
                  href="https://t.me/tkanikatalog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Telegram
                </a>
              </div>
              <div className="flex items-center">
                <Icon
                  name="MessageCircle"
                  className="mr-2 h-4 w-4 text-primary"
                />
                <a
                  href="https://wa.me/71234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" size="lg">
              <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
              Купить
            </Button>
            <Button variant="outline" size="lg">
              <Icon name="Heart" className="mr-2 h-5 w-5" />В избранное
            </Button>
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="details">Подробная информация</TabsTrigger>
          <TabsTrigger value="features">Характеристики</TabsTrigger>
          <TabsTrigger value="applications">Применение</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">О ткани</h2>
          <p className="text-muted-foreground mb-4">
            {fabric.description} Это качественный материал, который отлично
            подойдет для различных проектов. Ниже приведены инструкции по уходу
            и дополнительная информация.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Инструкции по уходу
          </h3>
          <p className="text-muted-foreground">
            {fabric.details.careInstructions}
          </p>
        </TabsContent>

        <TabsContent value="features" className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Основные характеристики
          </h2>
          <ul className="space-y-2">
            {fabric.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Icon
                  name="CheckCircle"
                  className="h-5 w-5 text-primary mr-2"
                />
                {feature}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent
          value="applications"
          className="bg-muted/30 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Применение</h2>
          <p className="text-muted-foreground mb-4">
            Данная ткань может быть использована для различных целей, включая:
          </p>
          <ul className="space-y-2">
            {fabric.applications.map((app, index) => (
              <li key={index} className="flex items-center">
                <Icon name="ArrowRight" className="h-5 w-5 text-primary mr-2" />
                {app}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      {/* Рекомендуемые ткани */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Похожие ткани</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Card
                key={rec.id}
                className="overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{rec.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                    {rec.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{rec.price} ₽/м</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/fabric/${rec.id}`)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FabricDetail;
