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

  const accent = hasActiveItem
    ? 'border-brand-primary bg-glass-card text-text-base'
    : 'border-glass-border text-text-muted';

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
            hasActiveItem
              ? 'bg-brand-primary-soft text-brand-primary'
              : 'bg-glass-card text-text-muted'
          }`}
        >
          <i className={`${cluster.icon} text-lg`} />
        </span>
        {!isCollapsed && (
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold leading-tight">{cluster.title}</p>
            <p className="text-xs text-text-muted">{cluster.summary}</p>
          </div>
        )}
        {!isCollapsed && cluster.meta && (
          <span className="rounded-full border border-glass-border px-2 py-0.5 text-[11px] text-text-muted">
            {cluster.meta}
          </span>
        )}
        {!isCollapsed && (
          <i className={`bi text-sm ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'} text-text-muted`} />
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
