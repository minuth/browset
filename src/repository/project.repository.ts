import { ProjectModel } from '../model/project.model.js';

export interface ProjectRepository {
  findByKey(key: string): Promise<ProjectModel>;
}
