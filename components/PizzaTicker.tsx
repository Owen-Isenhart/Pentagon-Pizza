import React, { useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Pizza } from 'lucide-react';

interface PizzaPlace {
  name: string;
  distance: number;
  status: string; 
}


const getStatusDetails = (status: string) => {
  switch (status) {
    case 'very good':
      return {
        colorClass: 'text-green',
        icon: <ArrowUpRight className="h-4 w-4" />,
        change: 'Not Busy',
      };
    case 'good':
      return {
        colorClass: 'text-green',
        icon: <ArrowUpRight className="h-4 w-4" />,
        change: 'Slow',
      };
    case 'moderate':
      return {
        colorClass: 'text-yellow',
        icon: <Minus className="h-4 w-4" />,
        change: 'Slightly Busy',
      };
    case 'bad':
      return {
        colorClass: 'text-red',
        icon: <ArrowDownRight className="h-4 w-4" />,
        change: 'Busy',
      };
    case 'very bad':
      return {
        colorClass: 'text-red',
        icon: <ArrowDownRight className="h-4 w-4" />,
        change: 'Very Busy',
      };
    default: 
      return {
        colorClass: 'text-gray-500',
        icon: <Pizza className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />,
        change: '--',
      };
  }
};

const TickerItem = ({ item }: { item: PizzaPlace }) => {
  const { colorClass, icon, change } = getStatusDetails(item.status);
  const tickerName = () => {
    switch (item.name) {
      case 'Domino\'s Pizza':
        return 'DPZ';
      case 'District Pizza Palace':
        return 'DPP';
      case 'Extreme Pizza':
        return 'EXP';
      case 'We, The Pizza':
        return 'WTP';
      case 'Papa John\'s Pizza':
        return 'PZZA';
      case 'Califorina Pizza':
        return 'CPKI';
      default:
        return 'PZZA';
    };
  }
  return (
    <div className="flex items-center space-x-4 text-sm whitespace-nowrap">
      <span className="font-semibold font-oswald text-white tracking-wide">{tickerName()}</span>
      <div className={`font-oswald flex items-center space-x-1 ${colorClass}`}>
        {icon}
        <span>({change})</span>
      </div>
    </div>
  );
};

interface PizzaTickerProps {
  data: PizzaPlace[];
}

const PizzaTicker: React.FC<PizzaTickerProps> = ({ data }) => {
  const displayData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    let duplicatedData = [...data];
    while (duplicatedData.length > 0 && duplicatedData.length < 10) {
      duplicatedData = [...duplicatedData, ...data];
    }
    return duplicatedData;
  }, [data]);
  
  const animationDuration = `${displayData.length * 5}s`;

  // fixed this with AI, animation refused to work but gemini pulled off this masterclass
  
  // FIX: Inject the animation styles directly into the document head.
  // This is more robust than <style jsx> and works in any React environment.
  useEffect(() => {
    const styleId = 'pizza-ticker-animation';
    let style = document.getElementById(styleId);

    // If the style tag doesn't exist, create it.
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    
    // Define the animation keyframes and class.
    style.innerHTML = `
      @keyframes scroll-x {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .animate-scroll-x {
        animation: scroll-x ${animationDuration} linear infinite;
      }
    `;
    
    // Cleanup: remove the style tag when the component unmounts.
    return () => {
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
            styleElement.remove();
        }
    };
  }, [animationDuration]); // Rerun if the animation duration changes.


  if (displayData.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 w-full bg-background border-b border-t border-outline h-12 flex items-center overflow-hidden font-sans z-100">
      <div className="group flex items-center w-full h-full">
        <div className="flex animate-scroll-x group-hover:paused space-x-12 pl-12">
          {displayData.map((item, index) => (
            <TickerItem key={`item-${index}`} item={item} />
          ))}
          {displayData.map((item, index) => (
            <TickerItem key={`clone-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaTicker;
