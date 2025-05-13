
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { importFabricsFromFile, exportFabricsToCSV } from "@/utils/importFabrics";
import { FABRICS, CATEGORIES, Fabric } from "@/data/fabrics";
import { toast } from "@/components/ui/use-toast";

const AdminPage = () => {
  const [fabrics, setFabrics] = useState<Fabric[]>(FABRICS);
  const [isImporting, setIsImporting] = useState(false);
  const [isAddingFabric, setIsAddingFabric] = useState(false);
  const [editingFabric, setEditingFabric] = useState<Fabric | null>(null);
  
  // Состояние для новой ткани
  const emptyFabric: Fabric = {
    id: String(fabrics.length + 1),
    name: "",
    category: "",
    price: 0,
    image: "",
    description: "",
    details: {
      width: "",
      weight: "",
      composition: "",
      origin: "",
      careInstructions: "",
    },
    features: ["", "", "", ""],
    applications: ["", "", "", ""],
  };
  
  const [newFabric, setNewFabric] = useState<Fabric>(emptyFabric);
  
  // Обработчик загрузки файла
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    
    try {
      const importedFabrics = await importFabricsFromFile(file);
      setFabrics([...fabrics, ...importedFabrics]);
      toast({
        title: "Успешно импортировано",
        description: `Добавлено ${importedFabrics.length} тканей`,
      });
    } catch (error) {
      console.error("Ошибка при импорте:", error);
      toast({
        title: "Ошибка импорта",
        description: "Не удалось импортировать данные. Проверьте формат файла.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  // Обработчик экспорта файла
  const handleExport = () => {
    const csvContent = exportFabricsToCSV(fabrics);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tkani-catalog.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Обработчик добавления новой ткани
  const handleAddFabric = () => {
    // Валидация
    if (!newFabric.name || !newFabric.category || newFabric.price <= 0) {
      toast({
        title: "Ошибка добавления",
        description: "Пожалуйста, заполните обязательные поля (название, категория, цена)",
        variant: "destructive",
      });
      return;
    }
    
    // Фильтруем пустые элементы в массивах
    const features = newFabric.features.filter(f => f.trim() !== '');
    const applications = newFabric.applications.filter(a => a.trim() !== '');
    
    // Создаем новую ткань с отфильтрованными массивами
    const fabricToAdd = {
      ...newFabric,
      id: String(fabrics.length + 1), // Генерируем новый ID
      features,
      applications,
    };
    
    // Добавляем ткань в массив
    setFabrics([...fabrics, fabricToAdd]);
    
    // Сбрасываем форму
    setNewFabric(emptyFabric);
    setIsAddingFabric(false);
    
    toast({
      title: "Ткань добавлена",
      description: `Ткань "${fabricToAdd.name}" успешно добавлена в каталог`,
    });
  };
  
  // Обработчик редактирования ткани
  const handleEditFabric = () => {
    if (!editingFabric) return;
    
    // Валидация
    if (!editingFabric.name || !editingFabric.category || editingFabric.price <= 0) {
      toast({
        title: "Ошибка редактирования",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    // Фильтруем пустые элементы в массивах
    const features = editingFabric.features.filter(f => f.trim() !== '');
    const applications = editingFabric.applications.filter(a => a.trim() !== '');
    
    // Обновляем ткань с отфильтрованными массивами
    const updatedFabrics = fabrics.map(fabric => 
      fabric.id === editingFabric.id ? { ...editingFabric, features, applications } : fabric
    );
    
    setFabrics(updatedFabrics);
    setEditingFabric(null);
    
    toast({
      title: "Ткань обновлена",
      description: `Ткань "${editingFabric.name}" успешно обновлена`,
    });
  };
  
  // Обработчик удаления ткани
  const handleDeleteFabric = (id: string) => {
    const updatedFabrics = fabrics.filter(fabric => fabric.id !== id);
    setFabrics(updatedFabrics);
    
    toast({
      title: "Ткань удалена",
      description: "Ткань успешно удалена из каталога",
    });
  };
  
  // Функция обновления поля в новой или редактируемой ткани
  const updateFabricField = (
    target: "new" | "edit",
    field: string,
    value: string | number
  ) => {
    if (target === "new") {
      if (field.includes(".")) {
        // Для вложенных полей (например, details.width)
        const [parent, child] = field.split(".");
        setNewFabric({
          ...newFabric,
          [parent]: {
            ...newFabric[parent as keyof typeof newFabric],
            [child]: value,
          },
        });
      } else {
        // Для обычных полей
        setNewFabric({
          ...newFabric,
          [field]: value,
        });
      }
    } else if (target === "edit" && editingFabric) {
      if (field.includes(".")) {
        // Для вложенных полей
        const [parent, child] = field.split(".");
        setEditingFabric({
          ...editingFabric,
          [parent]: {
            ...editingFabric[parent as keyof typeof editingFabric],
            [child]: value,
          },
        });
      } else {
        // Для обычных полей
        setEditingFabric({
          ...editingFabric,
          [field]: value,
        });
      }
    }
  };
  
  // Функция обновления массива в новой или редактируемой ткани
  const updateFabricArray = (
    target: "new" | "edit",
    array: "features" | "applications",
    index: number,
    value: string
  ) => {
    if (target === "new") {
      const updatedArray = [...newFabric[array]];
      updatedArray[index] = value;
      setNewFabric({
        ...newFabric,
        [array]: updatedArray,
      });
    } else if (target === "edit" && editingFabric) {
      const updatedArray = [...editingFabric[array]];
      updatedArray[index] = value;
      setEditingFabric({
        ...editingFabric,
        [array]: updatedArray,
      });
    }
  };
  
  // Компонент формы для добавления/редактирования ткани
  const FabricForm = ({ target }: { target: "new" | "edit" }) => {
    const fabric = target === "new" ? newFabric : editingFabric;
    if (!fabric) return null;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${target}-name`}>Название ткани *</Label>
            <Input
              id={`${target}-name`}
              value={fabric.name}
              onChange={(e) => updateFabricField(target, "name", e.target.value)}
              placeholder="Например: Хлопок Премиум"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${target}-category`}>Категория *</Label>
            <Select
              value={fabric.category}
              onValueChange={(value) => updateFabricField(target, "category", value)}
            >
              <SelectTrigger id={`${target}-category`}>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter(cat => cat !== 'Все').map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
                <SelectItem value="Другое">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${target}-price`}>Цена за метр (₽) *</Label>
            <Input
              id={`${target}-price`}
              type="number"
              value={fabric.price}
              onChange={(e) => updateFabricField(target, "price", Number(e.target.value))}
              min="0"
              step="10"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${target}-image`}>Ссылка на изображение</Label>
            <Input
              id={`${target}-image`}
              value={fabric.image}
              onChange={(e) => updateFabricField(target, "image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`${target}-description`}>Описание</Label>
          <Textarea
            id={`${target}-description`}
            value={fabric.description}
            onChange={(e) => updateFabricField(target, "description", e.target.value)}
            placeholder="Опишите ткань, ее особенности и назначение"
            rows={3}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Характеристики ткани</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${target}-width`}>Ширина</Label>
              <Input
                id={`${target}-width`}
                value={fabric.details.width}
                onChange={(e) => updateFabricField(target, "details.width", e.target.value)}
                placeholder="Например: 150 см"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`${target}-weight`}>Плотность</Label>
              <Input
                id={`${target}-weight`}
                value={fabric.details.weight}
                onChange={(e) => updateFabricField(target, "details.weight", e.target.value)}
                placeholder="Например: 240 г/м²"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`${target}-composition`}>Состав</Label>
              <Input
                id={`${target}-composition`}
                value={fabric.details.composition}
                onChange={(e) => updateFabricField(target, "details.composition", e.target.value)}
                placeholder="Например: 100% хлопок"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`${target}-origin`}>Страна производства</Label>
              <Input
                id={`${target}-origin`}
                value={fabric.details.origin}
                onChange={(e) => updateFabricField(target, "details.origin", e.target.value)}
                placeholder="Например: Россия"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${target}-care`}>Инструкции по уходу</Label>
            <Textarea
              id={`${target}-care`}
              value={fabric.details.careInstructions}
              onChange={(e) => updateFabricField(target, "details.careInstructions", e.target.value)}
              placeholder="Машинная стирка при 30°C, не отбеливать..."
              rows={2}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Особенности</h3>
            {fabric.features.map((feature, index) => (
              <div key={`feature-${index}`} className="flex items-center gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFabricArray(target, "features", index, e.target.value)}
                  placeholder={`Особенность ${index + 1}`}
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Применение</h3>
            {fabric.applications.map((application, index) => (
              <div key={`application-${index}`} className="flex items-center gap-2">
                <Input
                  value={application}
                  onChange={(e) => updateFabricArray(target, "applications", index, e.target.value)}
                  placeholder={`Применение ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
        <p className="text-muted-foreground">
          Управление каталогом тканей: добавление, редактирование, импорт и экспорт данных
        </p>
      </header>
      
      <Tabs defaultValue="fabrics">
        <TabsList className="mb-6">
          <TabsTrigger value="fabrics">Ткани в каталоге</TabsTrigger>
          <TabsTrigger value="import">Импорт/Экспорт</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fabrics" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Список тканей ({fabrics.length})</h2>
            <Dialog open={isAddingFabric} onOpenChange={setIsAddingFabric}>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить ткань
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Добавить новую ткань</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о новой ткани. Поля, отмеченные звездочкой (*), обязательны для заполнения.
                  </DialogDescription>
                </DialogHeader>
                
                <FabricForm target="new" />
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingFabric(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddFabric}>
                    Добавить ткань
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fabrics.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Нет тканей в каталоге. Добавьте новые ткани или импортируйте данные.
                    </TableCell>
                  </TableRow>
                ) : (
                  fabrics.map((fabric) => (
                    <TableRow key={fabric.id}>
                      <TableCell className="font-medium">{fabric.id}</TableCell>
                      <TableCell>{fabric.name}</TableCell>
                      <TableCell>{fabric.category}</TableCell>
                      <TableCell>{fabric.price} ₽/м</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog
                          open={editingFabric?.id === fabric.id}
                          onOpenChange={(open) => {
                            if (!open) setEditingFabric(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingFabric(fabric)}
                            >
                              <Icon name="Pencil" className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Редактировать ткань</DialogTitle>
                              <DialogDescription>
                                Внесите изменения в информацию о ткани.
                              </DialogDescription>
                            </DialogHeader>
                            
                            <FabricForm target="edit" />
                            
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setEditingFabric(null)}
                              >
                                Отмена
                              </Button>
                              <Button onClick={handleEditFabric}>
                                Сохранить изменения
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            >
                              <Icon name="Trash" className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Подтвердите удаление</DialogTitle>
                              <DialogDescription>
                                Вы уверены, что хотите удалить ткань "{fabric.name}"? Это действие нельзя будет отменить.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Отмена</Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteFabric(fabric.id)}
                              >
                                Удалить
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="import" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Импорт данных</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Загрузите CSV файл с данными о тканях. Файл должен иметь заголовок и соответствовать формату:
              </p>
              <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
                название,категория,цена,ссылка_на_изображение,описание,ширина,плотность,состав,происхождение,уход,особенность1,особенность2,особенность3,особенность4,применение1,применение2,применение3,применение4
              </div>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  disabled={isImporting}
                />
                <Button disabled={isImporting}>
                  {isImporting ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Импорт...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" className="mr-2 h-4 w-4" />
                      Импортировать
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Экспорт данных</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Экспортируйте все данные о тканях в CSV файл для резервного копирования или редактирования.
              </p>
              <Button onClick={handleExport}>
                <Icon name="Download" className="mr-2 h-4 w-4" />
                Экспортировать данные
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
