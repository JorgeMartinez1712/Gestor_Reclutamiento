import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import useProfile from '../../hooks/useProfile';
import { FaSpinner } from 'react-icons/fa';

const glassPanel = 'rounded-3xl border border-glass-border bg-glass-card backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,6,23,0.65)]';

const ProfileForm = ({ onSaveSuccess, onEmailSendSuccess }) => {
  const { user, updateUser } = useAuth();
  const { updateProfile, sendPasswordResetEmail, loading, error, emailLoading, getUserTypeName } = useProfile();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone_number: user?.phone_number || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [sendEmailError, setSendEmailError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone_number: user.phone_number || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSaveError(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSaveError(null);
    if (user) {
      setFormData({
        name: user.name || '',
        phone_number: user.phone_number || '',
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No disponible';
    return new Date(date).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError(null);
    try {
      const dataToUpdate = {
        name: formData.name,
        phone_number: formData.phone_number,
      };

      const updatedUserFromApi = await updateProfile(dataToUpdate);
      updateUser(updatedUserFromApi);
      setIsEditing(false);
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (err) {
      setSaveError(error || 'Error al guardar la información del perfil.');
    }
  };

  const handleSendPasswordResetEmail = async () => {
    setSendEmailError(null);
    try {
      if (user?.email) {
        await sendPasswordResetEmail(user.email);
        if (onEmailSendSuccess) {
          onEmailSendSuccess();
        }
      } else {
        setSendEmailError('El email del usuario no está disponible.');
      }
    } catch (err) {
      setSendEmailError(err.message || 'Error al enviar el correo de restablecimiento de contraseña.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`${glassPanel} flex flex-col items-center text-center p-8`}>
        <div className="w-32 h-32 rounded-full border-4 border-brand-primary/40 overflow-hidden mb-4">
          <img
            src={user?.profile_photo_url} 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold">{user?.name || 'Usuario'}</h2>
        <p className="text-text-muted mt-1">{user?.email || 'Sin correo'}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 w-full">
          <div className="rounded-full border border-brand-secondary/40 px-4 py-1 text-xs uppercase tracking-[0.2em] text-text-muted">
            Miembro desde {formatDate(user?.created_at)}
          </div>
          <div className="rounded-full border border-glass-border/60 px-4 py-1 text-xs uppercase tracking-[0.2em] text-text-muted">
            Última actualización {formatDate(user?.updated_at)}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${glassPanel} p-6`}>
            <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Detalles de contacto</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-glass-border/60">
                <span className="text-text-muted">Correo</span>
                <span className="font-medium">{user?.email || 'No especificado'}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-text-muted">Teléfono</span>
                <span className="font-medium">{user?.phone_number || 'No especificado'}</span>
              </div>
            </div>
          </div>
          <div className={`${glassPanel} p-6`}>
            <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Información de la cuenta</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-glass-border/60">
                <span className="text-text-muted">Tipo de usuario</span>
                <span className="font-medium">{getUserTypeName(user?.user_type_id)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-glass-border/60">
                <span className="text-text-muted">Miembro desde</span>
                <span className="font-medium">{formatDate(user?.created_at)}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-text-muted">Última actualización</span>
                <span className="font-medium">{formatDate(user?.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${glassPanel} p-6`}>
          <div className="flex flex-col gap-1 mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Gestión de perfil</p>
            <h3 className="text-2xl font-semibold">Editar información</h3>
            <p className="text-text-muted">Actualiza tu nombre y número de contacto o envía un correo para restablecer tu contraseña.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-2xl border border-glass-border/60 bg-transparent px-4 py-3 text-text-base placeholder:text-text-muted transition focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary ${isEditing ? 'bg-glass-card/40' : 'pointer-events-none bg-glass-card/20 opacity-70'}`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone_number" className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Número de Teléfono</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full rounded-2xl border border-glass-border/60 bg-transparent px-4 py-3 text-text-base placeholder:text-text-muted transition focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary ${isEditing ? 'bg-glass-card/40' : 'pointer-events-none bg-glass-card/20 opacity-70'}`}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold transition-colors ${loading ? 'bg-brand-primary/40 text-white/70 cursor-not-allowed' : 'bg-brand-primary text-white hover:bg-brand-secondary'}`}
                  >
                    {loading ? 'Guardando…' : 'Guardar'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    disabled={loading}
                    className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold border border-glass-border text-text-base transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-transparent hover:bg-glass-card/40'}`}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold bg-brand-primary text-white hover:bg-brand-secondary transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={handleSendPasswordResetEmail}
                    disabled={emailLoading}
                    className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold border border-brand-primary text-brand-primary transition-colors ${emailLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-primary/10'}`}
                  >
                    {emailLoading ? <FaSpinner className="animate-spin" /> : 'Cambiar Contraseña'}
                  </button>
                </>
              )}
            </div>
          </form>

          {(saveError || sendEmailError) && (
            <div className="mt-6 rounded-2xl border border-status-error bg-status-error-soft px-4 py-3 text-sm text-status-error" role="alert">
              {saveError || sendEmailError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;