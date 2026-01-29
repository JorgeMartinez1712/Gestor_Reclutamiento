import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavigationLink from './NavigationLink';

const NavigationCluster = ({ cluster, isCollapsed }) => {
  const location = useLocation();
  const hasActiveItem = cluster.items.some((item) => location.pathname.startsWith(item.to));
  const [isExpanded, setIsExpanded] = useState(hasActiveItem);

  useEffect(() => {
    if (hasActiveItem) {
      setIsExpanded(true);
    }
  }, [hasActiveItem]);

  const handleToggle = () => {
    if (isCollapsed && hasActiveItem) {
      return;
    }
    setIsExpanded((prev) => !prev);
  };

  const accent = hasActiveItem ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 text-white/80';

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleToggle}
        className={`flex w-full items-center gap-3 rounded-3xl border px-3 py-2 transition-colors duration-200 ${
          isCollapsed ? 'justify-center' : ''
        } ${accent}`}
      >
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
            hasActiveItem ? 'bg-white/20 text-white' : 'bg-white/5 text-white/70'
          }`}
        >
          <i className={`${cluster.icon} text-lg`} />
        </span>
        {!isCollapsed && (
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold leading-tight">{cluster.title}</p>
            <p className="text-xs text-white/60">{cluster.summary}</p>
          </div>
        )}
        {!isCollapsed && cluster.meta && (
          <span className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-white/70">
            {cluster.meta}
          </span>
        )}
        {!isCollapsed && (
          <i className={`bi text-sm ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'} text-white/70`} />
        )}
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[560px]' : 'max-h-0'}`}>
        <ul className={`${isCollapsed ? 'flex flex-col items-center gap-3 py-3' : 'space-y-2 px-1 pt-3'}`}>
          {cluster.items.map((item) => (
            <NavigationLink key={item.to} {...item} isCollapsed={isCollapsed} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationCluster;
