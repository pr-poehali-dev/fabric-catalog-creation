import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const FabricCategory = ({
  title,
  icon,
  count,
}: {
  title: string;
  icon: string;
  count: number;
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all hover:scale-105"
      onClick={() => navigate("/catalog")}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-muted-foreground">{count} видов</p>
          </div>
          <Icon name={icon} size={32} className="text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const navigate = useNavigate();

  const categories = [
    { title: "Хлопок", icon: "Leaf", count: 54 },
    { title: "Шёлк", icon: "Sparkles", count: 32 },
    { title: "Шерсть", icon: "FlameKindling", count: 47 },
    { title: "Лён", icon: "Shirt", count: 29 },
    { title: "Синтетика", icon: "Atom", count: 61 },
    { title: "Смесовые", icon: "Blend", count: 43 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
                Каталог тканей высокого качества
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Найдите идеальную ткань для вашего проекта из нашей обширной
                коллекции
              </p>
              <Button size="lg" onClick={() => navigate("/catalog")}>
                Перейти в каталог
                <Icon name="ArrowRight" className="ml-2" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1520694478166-daaaaec95b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
                alt="Ткани разных цветов и текстур"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center font-montserrat">
            Категории тканей
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <FabricCategory key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-muted py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center font-montserrat">
            Наши преимущества
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="BadgeCheck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Высокое качество</h3>
              <p className="text-muted-foreground">
                Все ткани проходят тщательный контроль качества
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                Доставка заказов в любую точку России
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Scissors" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Широкий ассортимент
              </h3>
              <p className="text-muted-foreground">
                Более 250 видов тканей для любых нужд
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action - Contact section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4 font-montserrat">
            Нужна консультация?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для получения подробной информации о тканях или
            оформления заказа
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href="tel:+71234567890"
              className="inline-flex items-center justify-center gap-2 bg-white border border-primary/20 hover:bg-primary/10 transition-colors rounded-lg px-6 py-3"
            >
              <Icon name="Phone" className="text-primary" />
              <span>+7 (123) 456-78-90</span>
            </a>

            <a
              href="mailto:info@tkanikatalog.ru"
              className="inline-flex items-center justify-center gap-2 bg-white border border-primary/20 hover:bg-primary/10 transition-colors rounded-lg px-6 py-3"
            >
              <Icon name="Mail" className="text-primary" />
              <span>info@tkanikatalog.ru</span>
            </a>

            <a
              href="https://t.me/tkanikatalog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border border-primary/20 hover:bg-primary/10 transition-colors rounded-lg px-6 py-3"
            >
              <Icon name="MessageSquare" className="text-primary" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
