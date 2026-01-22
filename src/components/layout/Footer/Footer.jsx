const Footer = ({ isSidebarOpen, isCollapsed }) => {
  return (
    <footer
      className={`bg-bg  transition-all duration-300 ${
        isSidebarOpen && !isCollapsed ? 'ml-64' : isCollapsed ? 'ml-16' : 'ml-0'
      }`}
    >
      <div className="container mx-auto p-3 flex justify-end items-center">
        <div className="text-right">
          <p className="text-sm text-oscuro">
            © {new Date().getFullYear()} Administrador. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;