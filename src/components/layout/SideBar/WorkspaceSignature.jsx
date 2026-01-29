import { Link } from 'react-router-dom';
import fullLogo from '/assets/logo.png';

const WorkspaceSignature = () => {
  return (
    <div className="px-6 pt-8 pb-4">
      <Link to="/" className="flex justify-center">
        <img src={fullLogo} alt="logo" className="h-12 w-auto object-contain" />
      </Link>
    </div>
  );
};

export default WorkspaceSignature;
