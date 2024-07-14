import { EnvironmentModel } from './environment.model.js';

export interface ProjectModel {
  id: number;
  name: string;
  environments?: EnvironmentModel[];
}
