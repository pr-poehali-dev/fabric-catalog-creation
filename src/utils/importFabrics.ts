
import { Fabric } from '@/data/fabrics';

/**
 * Функция для импорта данных о тканях из CSV или Excel файла
 * В будущем можно расширить для работы с разными форматами
 * 
 * @param file Файл в формате CSV или Excel с данными о тканях
 * @returns Promise с массивом объектов Fabric
 */
export async function importFabricsFromFile(file: File): Promise<Fabric[]> {
  // Это упрощенная реализация для CSV файла
  // Для полной поддержки Excel потребуются дополнительные библиотеки, например xlsx
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          reject(new Error('Не удалось прочитать файл'));
          return;
        }
        
        const csvData = event.target.result as string;
        const lines = csvData.split('\n');
        
        // Пропускаем заголовок
        const headers = lines[0].split(',');
        
        const fabrics: Fabric[] = [];
        
        // Начинаем с 1, чтобы пропустить заголовок
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue; // Пропускаем пустые строки
          
          const data = lines[i].split(',');
          
          // Создаем базовую структуру ткани
          const fabric: Fabric = {
            id: String(i), // Генерируем ID
            name: data[0] || 'Название не указано',
            category: data[1] || 'Категория не указана',
            price: parseFloat(data[2]) || 0,
            image: data[3] || 'https://images.unsplash.com/photo-1620437064667-949239d3540e', // Заглушка
            description: data[4] || 'Описание отсутствует',
            details: {
              width: data[5] || 'Не указано',
              weight: data[6] || 'Не указано',
              composition: data[7] || 'Не указано',
              origin: data[8] || 'Не указано',
              careInstructions: data[9] || 'Не указано',
            },
            features: [
              data[10] || '',
              data[11] || '',
              data[12] || '',
              data[13] || '',
            ].filter(Boolean), // Удаляем пустые строки
            applications: [
              data[14] || '',
              data[15] || '',
              data[16] || '',
              data[17] || '',
            ].filter(Boolean), // Удаляем пустые строки
          };
          
          fabrics.push(fabric);
        }
        
        resolve(fabrics);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Ошибка при чтении файла'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Пример форматирования данных для CSV файла:
 * 
 * название,категория,цена,ссылка_на_изображение,описание,ширина,плотность,состав,происхождение,уход,особенность1,особенность2,особенность3,особенность4,применение1,применение2,применение3,применение4
 * Хлопок Премиум,Хлопок,850,https://example.com/image1.jpg,Мягкий хлопок,150 см,240 г/м²,100% хлопок,Россия,Машинная стирка при 30°C,Высокая прочность,Гипоаллергенность,Воздухопроницаемость,Долговечность,Пошив повседневной одежды,Рубашки,Детская одежда,Домашний текстиль
 */

/**
 * Функция для экспорта данных о тканях в CSV файл
 * @param fabrics Массив объектов Fabric для экспорта
 * @returns Строка в формате CSV
 */
export function exportFabricsToCSV(fabrics: Fabric[]): string {
  // Заголовок CSV
  const csvHeader = 'название,категория,цена,ссылка_на_изображение,описание,ширина,плотность,состав,происхождение,уход,особенность1,особенность2,особенность3,особенность4,применение1,применение2,применение3,применение4\n';
  
  // Преобразуем каждую ткань в строку CSV
  const csvRows = fabrics.map(fabric => {
    const features = [...fabric.features, '', '', '', ''].slice(0, 4); // Заполняем до 4 элементов
    const applications = [...fabric.applications, '', '', '', ''].slice(0, 4); // Заполняем до 4 элементов
    
    return [
      fabric.name,
      fabric.category,
      fabric.price,
      fabric.image,
      fabric.description,
      fabric.details.width,
      fabric.details.weight,
      fabric.details.composition,
      fabric.details.origin,
      fabric.details.careInstructions,
      ...features,
      ...applications
    ].join(',');
  });
  
  // Объединяем все строки в одну строку CSV
  return csvHeader + csvRows.join('\n');
}
