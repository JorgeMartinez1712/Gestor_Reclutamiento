const Footer = () => {
  return (
    <footer className="border-t border-gray-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4 text-xs text-gray-500">
        <span className="tracking-[0.35em] uppercase">CONTROL DE RECLUTAMIENTO</span>
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Reclutamiento. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;