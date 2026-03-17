import { useLocation } from 'wouter';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Bell, Flame, Activity, Droplet, Moon, ChevronRight } from 'lucide-react';
import { MOCK_DEFICITS } from '@/services/mockData';
import { useApp } from '@/context/AppContext';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { setActiveDeficitId } = useApp();

  const handleFixDeficit = (id: string) => {
    setActiveDeficitId(id);
    setLocation('/products');
  };

  const today = format(new Date(), 'd MMMM, EEEE', { locale: ru });
  
  // Progress calculations
  const caloriesTarget = 2000;
  const caloriesConsumed = 1450;
  const caloriesPercent = (caloriesConsumed / caloriesTarget) * 100;
  
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (caloriesPercent / 100) * circumference;

  return (
    <div className="flex flex-col gap-6 p-6 pb-12">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}images/avatar.png`} 
            alt="User" 
            className="w-14 h-14 rounded-2xl object-cover shadow-lg shadow-primary/20 border-2 border-background"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground leading-tight tracking-tight">Привет, Алекс!</h1>
            <p className="text-sm font-medium text-muted-foreground capitalize">{today}</p>
          </div>
        </div>
        <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-card border border-border/50 text-foreground shadow-sm hover:shadow-md transition-all">
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background"></span>
          </div>
        </button>
      </header>

      {/* Main Stats Card */}
      <div className="bg-gradient-to-br from-primary to-emerald-400 rounded-[2rem] p-6 text-primary-foreground shadow-xl shadow-primary/30 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-primary-foreground/80 font-medium text-sm mb-1 uppercase tracking-wider">Калории</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-bold">{caloriesConsumed}</span>
              <span className="text-primary-foreground/80 font-medium">/ {caloriesTarget}</span>
            </div>
            <span className="text-primary-foreground/90 font-medium text-sm mt-1 bg-black/10 px-3 py-1 rounded-full inline-flex w-max">
              Осталось 550 ккал
            </span>
          </div>

          {/* Radial Progress */}
          <div className="relative flex items-center justify-center">
            <svg width="140" height="140" className="transform -rotate-90 drop-shadow-md">
              <circle cx="70" cy="70" r={radius} className="stroke-black/10" strokeWidth="12" fill="none" />
              <circle 
                cx="70" 
                cy="70" 
                r={radius} 
                className="stroke-white" 
                strokeWidth="12" 
                fill="none" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" 
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <Flame className="w-8 h-8 text-white fill-white/20" />
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="mt-8 grid grid-cols-3 gap-4 relative z-10">
          <div className="flex flex-col gap-2 bg-black/10 p-3 rounded-2xl">
            <div className="flex justify-between text-xs font-semibold">
              <span>Белки</span>
              <span>65/90г</span>
            </div>
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-black/10 p-3 rounded-2xl">
            <div className="flex justify-between text-xs font-semibold">
              <span>Жиры</span>
              <span>45/65г</span>
            </div>
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '69%' }}></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-black/10 p-3 rounded-2xl">
            <div className="flex justify-between text-xs font-semibold">
              <span>Углеводы</span>
              <span>180/250г</span>
            </div>
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Deficits Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-foreground">Текущие дефициты</h2>
        <div className="flex flex-col gap-3">
          {MOCK_DEFICITS.map((deficit) => {
            const percent = Math.min((deficit.got / deficit.needs) * 100, 100);
            const amountDeficit = Math.round((deficit.needs - deficit.got) * 10) / 10;
            
            return (
              <div key={deficit.id} className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${deficit.color} shadow-inner`}>
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{deficit.name}</h3>
                      <p className="text-xs font-medium text-muted-foreground">Не хватает {amountDeficit}{deficit.unit}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFixDeficit(deficit.id)}
                    className="px-4 py-2 bg-primary/10 text-primary font-bold text-sm rounded-xl hover:bg-primary/20 transition-colors flex items-center gap-1 active:scale-95"
                  >
                    Исправить
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${deficit.color} rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-foreground min-w-[60px] text-right">
                    {deficit.got}/{deficit.needs}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Logs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm flex flex-col gap-3 items-start cursor-pointer hover:border-primary/30 transition-colors">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
            <Droplet className="w-6 h-6 fill-blue-500/20" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Вода</h4>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">1.2 / 2.5 л</p>
          </div>
        </div>
        <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm flex flex-col gap-3 items-start cursor-pointer hover:border-primary/30 transition-colors">
          <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
            <Moon className="w-6 h-6 fill-indigo-500/20" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Сон</h4>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">7ч 15м</p>
          </div>
        </div>
      </div>
      
      {/* Meals History */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-foreground">Приемы пищи</h2>
          <button className="text-sm font-semibold text-primary flex items-center hover:underline">
            Все <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        
        <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-display font-bold">🍳</div>
              <div>
                <h4 className="font-bold text-foreground">Завтрак</h4>
                <p className="text-sm text-muted-foreground truncate max-w-[180px]">Овсянка на молоке, яблоко</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground text-lg">245</div>
              <div className="text-xs text-muted-foreground">ккал</div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-display font-bold">🥗</div>
              <div>
                <h4 className="font-bold text-foreground">Обед</h4>
                <p className="text-sm text-muted-foreground truncate max-w-[180px]">Куриная грудка, гречка, салат</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground text-lg">420</div>
              <div className="text-xs text-muted-foreground">ккал</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
