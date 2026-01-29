import Modal from 'react-modal';
import PropTypes from 'prop-types';

const CustomModal = ({ isOpen, onClose, children, title }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] px-4"
      className="w-full max-w-[90%] md:max-w-2xl lg:max-w-4xl rounded-2xl border border-glass-border bg-glass-card backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,6,23,0.65)] p-6 relative z-[70]"
    >
      <div className="flex items-center justify-between pb-4 border-b border-glass-border/60">
        {title && <h2 className="text-xl font-semibold text-text-base">{title}</h2>}
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-base bi bi-x text-2xl transition-colors"
          aria-label="Cerrar"
        >
        </button>
      </div>
      <div className="mt-4 max-h-[80vh] overflow-y-auto text-text-base">
        {children}
      </div>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default CustomModal;