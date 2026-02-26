import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react'; // 'act' viene de aquí
import { useConfirmationDialog } from './confirmation-dialog.hook';

    describe('useConfirmationDialog hook', () => {
    const mockItem = { id: '1', name: 'Elemento a borrar' };

    it('debe inicializarse con isOpen en false y un item vacío', () => {
        const { result } = renderHook(() => useConfirmationDialog());

        expect(result.current.isOpen).toBe(false);
        expect(result.current.itemToDelete.id).toBe('');
    });

    it('debe abrir el diálogo y establecer el item al llamar a onOpenDialog', () => {
        const { result } = renderHook(() => useConfirmationDialog());

        act(() => {
        result.current.onOpenDialog(mockItem);
        });

        expect(result.current.isOpen).toBe(true);
        expect(result.current.itemToDelete).toEqual(mockItem);
    });

    it('debe cerrar el diálogo al llamar a onClose', () => {
        const { result } = renderHook(() => useConfirmationDialog());

        act(() => {
        result.current.onOpenDialog(mockItem);
        result.current.onClose();
        });

        expect(result.current.isOpen).toBe(false);
    });

    it('debe resetear el item al llamar a onAccept', () => {
        const { result } = renderHook(() => useConfirmationDialog());

        act(() => {
        result.current.onOpenDialog(mockItem);
        result.current.onAccept();
        });

        expect(result.current.itemToDelete.id).toBe('');
    });
    });