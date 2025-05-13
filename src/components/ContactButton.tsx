
import { Button, ButtonProps } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import Icon from "@/components/ui/icon";

interface ContactButtonProps extends ButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

const ContactButton = ({ 
  variant = "default", 
  size = "default", 
  showLabel = true,
  className,
  ...props
}: ContactButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className={className} {...props}>
          <Icon name="HeadphonesIcon" className="h-4 w-4 mr-2" />
          {showLabel && "Связаться"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center">
              <Icon name="HeadphonesIcon" className="h-4 w-4 mr-2 text-primary" />
              Свяжитесь с нами
            </h4>
            <p className="text-sm text-muted-foreground">
              Выберите удобный способ связи для заказа или консультации
            </p>
          </div>
          <div className="grid gap-2">
            <a 
              href="tel:+71234567890" 
              className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Icon name="Phone" className="mr-2 h-4 w-4 text-primary" />
              <span>+7 (123) 456-78-90</span>
            </a>
            <a 
              href="mailto:info@tkanikatalog.ru" 
              className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Icon name="Mail" className="mr-2 h-4 w-4 text-primary" />
              <span>info@tkanikatalog.ru</span>
            </a>
            <a 
              href="https://t.me/tkanikatalog" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Icon name="MessageSquare" className="mr-2 h-4 w-4 text-primary" />
              <span>Telegram</span>
            </a>
            <a 
              href="https://wa.me/71234567890" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Icon name="MessageCircle" className="mr-2 h-4 w-4 text-primary" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ContactButton;
