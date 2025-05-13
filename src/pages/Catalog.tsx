
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

// Временные данные для демонстрации
const FABRICS = [
  {
    id: "1",
    name: "Хлопок Премиум",
    category: "Хлопок",
    price: 850,
    image: "https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=786&q=80",
    description: "Мягкий хлопок высокого качества для пошива одежды"
  },
  {
    id: "2",
    name: "Шёлк Натуральный",
    category: "Шёлк",
    price: 2800,
    image: "https://images.unsplash.com/photo-1620437064667-949239d3540e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description: "Гладкий и блестящий натуральный шёлк для изысканной одежды"
  },
  {
    id: "3",
    name: "Лён Классический",
    category: "Лён",
    price: 1200,
    image: "https://images.unsplash.com/photo-1596149615493-f0739de31c2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Натуральный лён для летней одежды и домашнего текстиля"
  },
  {
    id: "4",
    name: "Шерсть Мериноса",
    category: "Шерсть",
    price: 3200,
    image: "https://images.unsplash.com/photo-1598030550086-994c3878bea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Мягкая и тёплая шерсть мериноса для зимней одежды"
  },
  {
    id: "5",
    name: "Микрофибра",
    category: "Синтетика",
    price: 680,
    image: "https://images.unsplash.com/photo-1618089086953-c1b0c93c3a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    description: "Мягкая и прочная синтетическая ткань для различных целей"
  },
  {
    id: "6",
    name: "Деним",
    category: "Хлопок",
    price: 1500,
    image: "https://images.unsplash.com/photo-1596482150196-4e4baba35f2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    description: "Плотный хлопковый материал для джинсовой одежды"
  },
];

const CATEGORIES = ["Все", "Хлопок", "Шёлк", "Шерсть", "Лён", "Синтетика", "Смесовые"];

const FabricCard = ({ fabric }: { fabric: typeof FABRICS[0] }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={fabric.image} 
          alt={fabric.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
          {fabric.category}
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{fabric.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
          {fabric.description}
        </p>
        <p className="font-medium">{fabric.price} ₽/м</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/fabric/${fabric.id}`)}
        >
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
};

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("default");
  
  // Фильтрация и сортировка
  let filteredFabrics = [...FABRICS];
  
  // Фильтр по категории
  if (selectedCategory !== "Все") {
    filteredFabrics = filteredFabrics.filter(
      fabric => fabric.category === selectedCategory
    );
  }
  
  // Фильтр по поиску
  if (searchTerm) {
    filteredFabrics = filteredFabrics.filter(
      fabric => fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fabric.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Сортировка
  if (sortBy === "price-asc") {
    filteredFabrics.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredFabrics.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filteredFabrics.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Сайдбар с фильтрами */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Поиск</h2>
              <div className="relative">
                <Input
                  placeholder="Введите название..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
                <Icon 
                  name="Search" 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" 
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Категории</h2>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={category}
                      checked={selectedCategory === category} 
                      onCheckedChange={() => setSelectedCategory(category)}
                    />
                    <label 
                      htmlFor={category}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Сортировка</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сортировку" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Сначала дешевле</SelectItem>
                  <SelectItem value="price-desc">Сначала дороже</SelectItem>
                  <SelectItem value="name">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Основной контент */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Каталог тканей</h1>
            <p className="text-muted-foreground">
              {filteredFabrics.length} {filteredFabrics.length === 1 ? 'товар' : 
                filteredFabrics.length >= 2 && filteredFabrics.length <= 4 ? 'товара' : 'товаров'}
            </p>
          </div>
          
          {filteredFabrics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFabrics.map((fabric) => (
                <FabricCard key={fabric.id} fabric={fabric} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="SearchX" className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
