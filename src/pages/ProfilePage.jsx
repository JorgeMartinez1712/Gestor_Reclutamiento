import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileForm from '../components/Profile/ProfileForm';
import { FaSpinner } from 'react-icons/fa';
import SuccessNotification from '../components/common/SuccessNotification';

const ProfilePage = () => {
  const { user, authLoading, isAuthenticated } = useAuth();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showEmailSuccessNotification, setShowEmailSuccessNotification] = useState(false);

  const handleProfileSaveSuccess = () => {
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };

  const handleEmailSendSuccess = () => {
    setShowEmailSuccessNotification(true);
    setTimeout(() => {
      setShowEmailSuccessNotification(false);
    }, 3000);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-app-bg">
        <FaSpinner className="animate-spin text-brand-primary text-4xl" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <div className="text-center text-status-error mt-10 text-xl font-semibold">Debes iniciar sesión para ver esta página.</div>;
  }

  return (
    <div className="min-h-screen bg-app-bg text-text-base px-6 py-8 lg:px-12 space-y-8">
      <SuccessNotification
        isOpen={showSuccessNotification}
        message="¡Perfil actualizado exitosamente!"
      />
      <SuccessNotification
        isOpen={showEmailSuccessNotification}
        message="¡Correo de restablecimiento enviado exitosamente!"
      />

      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Cuenta</p>
          <h1 className="text-3xl font-semibold">Mi Perfil</h1>
          <p className="text-text-muted">Gestiona tu información personal y las credenciales de acceso.</p>
        </div>

        <ProfileForm onSaveSuccess={handleProfileSaveSuccess} onEmailSendSuccess={handleEmailSendSuccess} />
      </div>
    </div>
  );
};

export default ProfilePage;