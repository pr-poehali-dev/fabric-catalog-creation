import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import ContactButton from "@/components/ContactButton";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto max-w-6xl py-4 px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Scissors" className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl font-montserrat">
                ТканиКаталог
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Каталог
              </Link>
              <Link
                to="/admin"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Icon name="Settings" className="h-4 w-4 inline mr-1" />
                Управление
              </Link>
              <Button variant="outline">
                <Icon name="Search" className="h-4 w-4 mr-2" />
                Поиск
              </Button>
              <ContactButton variant="primary" />
            </nav>

            <div className="flex md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-muted py-12 mt-auto">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Scissors" className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl font-montserrat">
                  ТканиКаталог
                </span>
              </div>
              <p className="text-muted-foreground">
                Ваш надежный партнер для выбора качественных тканей для любых
                проектов.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Навигация</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Каталог
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  info@tkanikatalog.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  +7 (123) 456-78-90
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} ТканиКаталог. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
