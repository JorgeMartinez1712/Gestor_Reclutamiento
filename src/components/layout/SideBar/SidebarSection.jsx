import { Link, useLocation } from 'react-router-dom';

const SidebarSection = ({ title, description, items }) => {
    const location = useLocation();

    const isActive = (path, exact) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <section className="mt-10 first:mt-8">
            <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">{title}</p>
                {description && <p className="mt-2 text-sm text-white/80">{description}</p>}
            </div>
            <div className="mt-4 space-y-2">
                {items.map((item) => {
                    const active = isActive(item.to, item.exact);
                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-200 ${
                                active
                                    ? 'border-white/30 bg-white text-slate-900 shadow-lg shadow-black/20'
                                    : 'border-white/5 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10'
                            }`}
                        >
                            <span
                                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                                    active ? 'bg-slate-900/5 text-slate-900' : 'bg-white/10 text-white'
                                }`}
                            >
                                <i className={`bi ${item.icon} text-lg`}></i>
                            </span>
                            <div className="flex flex-1 flex-col">
                                <span className={`text-sm font-semibold ${active ? 'text-slate-900' : 'text-white'}`}>
                                    {item.label}
                                </span>
                                {item.helper && <span className="text-xs text-white/60">{item.helper}</span>}
                            </div>
                            {item.pill && (
                                <span
                                    className={`text-[10px] uppercase tracking-wide rounded-full px-2 py-1 ${
                                        active ? 'bg-slate-900/10 text-slate-900' : 'bg-white/10 text-white/70'
                                    }`}
                                >
                                    {item.pill}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default SidebarSection;