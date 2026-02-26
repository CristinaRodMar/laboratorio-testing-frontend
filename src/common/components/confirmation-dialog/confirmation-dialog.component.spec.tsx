import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
    const defaultProps = {
        isOpen: true,
        onAccept: vi.fn(),
        onClose: vi.fn(),
        title: 'Test Title',
        labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('debe renderizar el título y el contenido correctamente', () => {
        render(
        <ConfirmationDialogComponent {...defaultProps}>
            <span>Mensaje de prueba</span>
        </ConfirmationDialogComponent>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Mensaje de prueba')).toBeInTheDocument();
    });

    it('debe llamar a onClose cuando se pulsa el botón de cerrar', () => {
        render(
        <ConfirmationDialogComponent {...defaultProps}>
            Contenido
        </ConfirmationDialogComponent>
        );

        const closeBtn = screen.getByText(defaultProps.labels.closeButton);
        fireEvent.click(closeBtn);

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('debe llamar a onAccept y onClose cuando se pulsa el botón de aceptar', () => {
        render(
        <ConfirmationDialogComponent {...defaultProps}>
            Contenido
        </ConfirmationDialogComponent>
        );

        const acceptBtn = screen.getByText(defaultProps.labels.acceptButton);
        fireEvent.click(acceptBtn);

        // El componente ejecuta onAccept() y luego onClose() en handleAccept
        expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('no debe mostrarse si isOpen es false', () => {
        render(
        <ConfirmationDialogComponent {...defaultProps} isOpen={false}>
            Contenido
        </ConfirmationDialogComponent>
        );

        expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });
});