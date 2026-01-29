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
            ? 'border-white/40 bg-white/10 text-white'
            : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
        } ${isCollapsed ? 'justify-center w-12 h-12' : ''}`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-2xl ${
            isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
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
