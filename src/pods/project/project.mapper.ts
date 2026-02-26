import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

export const mapProjectFromApiToVm = (
  project: apiModel.Project
): viewModel.Project => {
  // 1. Manejo de nulidad para evitar el TypeError
  if (!project) {
    return createEmptyProject();
  }

  return {
    ...project,
    // 2. Manejo de campos opcionales para que el test de Assertion devuelva '' en lugar de undefined
    externalId: project.externalId || '',
    comments: project.comments || '',
    // 3. Manejo seguro de la lista de empleados
    employees: Array.isArray(project.employees)
      ? project.employees.map(mapEmployeeFromApiToVm)
      : [],
  };
};

const mapEmployeeFromApiToVm = (
  employee: apiModel.EmployeeSummary //
): viewModel.EmployeeSummary => ({
  ...employee,
  isAssigned: Boolean(employee.isAssigned),
});

const createEmptyProject = (): viewModel.Project => ({
  id: '',
  name: '',
  externalId: '',
  comments: '',
  isActive: false,
  employees: [],
});