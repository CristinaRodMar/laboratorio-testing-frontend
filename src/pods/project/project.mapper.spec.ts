import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('project.mapper specs', () => {
    it('should return an empty project when the input is null', () => {
        // Arrange
        const project: any = null;

        // Act
        const result = mapProjectFromApiToVm(project);

        // Assert
        expect(result.id).toBe('');
        expect(result.name).toBe('');
        expect(result.externalId).toBe('');
        expect(result.comments).toBe('');
        expect(result.isActive).toBe(false);
        expect(result.employees).toEqual([]);
    });

    it('should return an empty project when the input is undefined', () => {
        // Arrange
        const project: any = undefined;

        // Act
        const result = mapProjectFromApiToVm(project);

        // Assert
        expect(result.id).toBe('');
        expect(result.employees).toEqual([]);
    });

    it('should map a valid project from API to VM', () => {
        // Arrange
        const project: apiModel.Project = {
        id: '1',
        name: 'Proyecto de Prueba',
        externalId: 'EXT-99',
        comments: 'Comentario de prueba',
        isActive: true,
        employees: [
            {
            id: '101',
            employeeName: 'Juan Perez',
            isAssigned: true,
            },
        ],
        };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    const expectedResult: viewModel.Project = {
        id: '1',
        name: 'Proyecto de Prueba',
        externalId: 'EXT-99',
        comments: 'Comentario de prueba',
        isActive: true,
        employees: [
            {
            id: '101',
            employeeName: 'Juan Perez',
            isAssigned: true,
            },
        ],
        };

    expect(result).toEqual(expectedResult);
    });

    it('should handle missing optional fields (externalId, comments) by returning empty strings', () => {
    // Arrange
    const project: apiModel.Project = {
        id: '2',
        name: 'Proyecto sin opcionales',
        isActive: false,
        employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result.externalId).toBe('');
    expect(result.comments).toBe('');
    });

    it('should handle employees as undefined or null by returning an empty array', () => {
    // Arrange
    const project: any = {
        id: '3',
        name: 'Proyecto sin lista',
        isActive: true,
        employees: null,
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result.employees).toEqual([]);
    expect(Array.isArray(result.employees)).toBe(true);
    });

    it('should map employees correctly and ensure isAssigned is boolean', () => {
    // Arrange
    const project: apiModel.Project = {
        id: '4',
        name: 'Test Employees',
        isActive: true,
        employees: [
        {
            id: '1',
            employeeName: 'Maria',
            isAssigned: undefined, // Caso donde la API no lo envía
            },
        ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result.employees[0].isAssigned).toBe(false);
    expect(result.employees[0].employeeName).toBe('Maria');
    });
});