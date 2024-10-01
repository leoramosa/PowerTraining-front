import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde react-dom/client
import ButtonPrimary from '@/components/buttons/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from '@/components/buttons/ButtonSecondary/ButtonSecondary';

const MySwal = withReactContent(Swal);

interface ButtonConfig {
  text: string;
  action: () => Promise<void> | void; // Acción a realizar al hacer clic en el botón
  isConfirm?: boolean; // Si es el botón de confirmación
}

interface GenericAlertProps {
  title: string;
  text: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  buttons: ButtonConfig[];
}

const showGenericAlert = async ({
  title,
  text,
  icon = 'info',
  buttons,
}: GenericAlertProps) => {
  const confirmButton = buttons.find((btn) => btn.isConfirm);
  const cancelButton = buttons.find((btn) => !btn.isConfirm);

  const result = await MySwal.fire({
    title,
    text,
    icon,
    showCancelButton: false, 
    showConfirmButton: false, // Cambia esto a false para ocultar el botón de cancelación
    html: `
      <div id="alert-buttons" style="display: flex; justify-content: center;">
        <div id="button-secondary"></div>
        <div id="button-primary"></div>
      </div>
    `,
    didOpen: () => {
      const primaryButton = document.getElementById('button-primary');
      const secondaryButton = document.getElementById('button-secondary');

      if (primaryButton && confirmButton) {
        const root = ReactDOM.createRoot(primaryButton); // Crea la raíz para el botón primario
        root.render(
          <ButtonPrimary 
            text={confirmButton.text} 
            onClick={async () => {
              await confirmButton.action(); // Ejecuta la acción de confirmación
              MySwal.close(); // Cierra el modal después de ejecutar la acción
            }} 
          />
        );
      }

      if (secondaryButton && cancelButton) {
        const root = ReactDOM.createRoot(secondaryButton); // Crea la raíz para el botón secundario
        root.render(
          <ButtonSecondary 
            text={cancelButton.text} 
            onClick={() => {
              cancelButton.action && cancelButton.action(); // Ejecuta la acción de cancelación
              MySwal.close(); // Cierra el modal
            }} 
          />
        );
      }
    },
  });

  // Elimina este bloque si ya estás manejando el cierre en el didOpen
  if (result.isConfirmed && confirmButton) {
    await confirmButton.action(); // Ejecuta la acción del botón de confirmación si se presionó
  }
};


export default showGenericAlert;
