import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Plus, Coffee, Moon, Droplet, Activity } from 'lucide-react';
import { format } from 'date-fns';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'bot',
    text: 'Привет! Я помогу отслеживать ваше питание. Что вы съели сегодня?',
    time: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'Съел овсянку на молоке и яблоко на завтрак',
    time: new Date(Date.now() - 1000 * 60 * 59)
  },
  {
    id: 'm3',
    sender: 'bot',
    text: 'Отлично! Записал завтрак:\n🥣 Овсянка (150г) - 150 ккал\n🍎 Яблоко (180г) - 95 ккал\n\nИтого: 245 ккал, Белки: 6г, Жиры: 4г, Углеводы: 48г',
    time: new Date(Date.now() - 1000 * 60 * 58)
  }
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      let botText = 'Понял, записал! 👍';
      
      if (userMessage.text.toLowerCase().includes('вод')) {
        botText = 'Записал: +250мл воды. Сегодня выпито: 1.45л из 2.5л 💧';
      } else if (userMessage.text.toLowerCase().includes('кофе') || userMessage.text.toLowerCase().includes('чай')) {
        botText = 'Записал. Не забудьте выпить стакан воды, так как кофеин обезвоживает ☕';
      } else if (userMessage.text.toLowerCase().includes('сон') || userMessage.text.toLowerCase().includes('спал')) {
        botText = 'Отметил сон. Качественный отдых очень важен для восстановления! 🌙';
      } else if (userMessage.text.length > 10) {
        botText = 'Добавил этот прием пищи. Примерно 320 ккал. Отличный баланс БЖУ! 🥗';
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botText,
        time: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div className="flex flex-col h-full bg-muted/30 relative">
      {/* Header */}
      <header className="absolute top-0 w-full z-10 bg-background/90 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={`${import.meta.env.BASE_URL}images/bot-avatar.png`} 
              alt="Bot" 
              className="w-12 h-12 rounded-full border border-border shadow-sm object-cover bg-white"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"></span>
          </div>
          <div>
            <h1 className="font-bold text-foreground text-lg">HealthBot</h1>
            <p className="text-xs text-emerald-600 font-medium">Онлайн</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-24 pb-32 no-scrollbar">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              Сегодня
            </span>
          </div>

          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div key={msg.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-[85%] ${isBot ? 'self-start' : 'self-end'}`}>
                <div className={`p-4 rounded-3xl relative shadow-sm ${
                  isBot 
                    ? 'bg-card border border-border/60 text-foreground rounded-tl-sm' 
                    : 'bg-primary text-primary-foreground rounded-tr-sm shadow-primary/20'
                }`}>
                  <p className="text-[15px] whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[11px] text-muted-foreground mt-1.5 px-2 font-medium">
                  {format(msg.time, 'HH:mm')}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex flex-col items-start self-start max-w-[85%]">
              <div className="p-4 rounded-3xl bg-card border border-border/60 rounded-tl-sm shadow-sm flex gap-1.5 items-center h-12">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-background border-t border-border/50 p-4 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-20">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 pb-1 -mx-4 px-4">
          <button onClick={() => handleQuickAction('Завтрак: ')} className="flex items-center gap-1.5 whitespace-nowrap bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
            <Coffee className="w-4 h-4 text-orange-500" /> Завтрак
          </button>
          <button onClick={() => handleQuickAction('Обед: ')} className="flex items-center gap-1.5 whitespace-nowrap bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
            <Activity className="w-4 h-4 text-emerald-500" /> Обед
          </button>
          <button onClick={() => handleQuickAction('Выпил стакан воды')} className="flex items-center gap-1.5 whitespace-nowrap bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
            <Droplet className="w-4 h-4 text-blue-500" /> Вода
          </button>
          <button onClick={() => handleQuickAction('Сон: ')} className="flex items-center gap-1.5 whitespace-nowrap bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
            <Moon className="w-4 h-4 text-indigo-500" /> Сон
          </button>
        </div>

        <div className="flex items-end gap-2 bg-muted/50 border border-border p-1.5 rounded-[1.5rem] focus-within:bg-background focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <button className="p-3 text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <Plus className="w-6 h-6" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Что вы съели?"
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-3 text-[15px] text-foreground placeholder:text-muted-foreground outline-none no-scrollbar"
            rows={1}
          />
          <div className="flex gap-1 shrink-0 items-center h-11 pr-1">
            {!input.trim() ? (
              <>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button 
                onClick={handleSend}
                className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-xl shadow-md shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
