import { Link, useLocation } from 'react-router-dom';

const NavigationLink = ({ to, icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 rounded-2xl border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
          isActive
            ? 'border-brand-primary bg-glass-card text-text-base'
            : 'border-glass-border bg-transparent text-text-muted hover:border-brand-secondary hover:text-text-base'
        } ${isCollapsed ? 'justify-center w-12 h-12' : ''}`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-2xl ${
            isActive
              ? 'bg-brand-primary-soft text-brand-primary'
              : 'bg-glass-card text-text-muted'
          }`}
        >
          <i className={`${icon} text-base`} />
        </span>
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </Link>
    </li>
  );
};

export default NavigationLink;
