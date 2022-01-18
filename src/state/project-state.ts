import { Project, ProjectStatus } from "../models/project";

type Listener = (items: Project[]) => void;

export class ProjectState {
  private listeners: Listener[] = [];
  private static instance: ProjectState;
  private projects: Project[] = [];

  private constructor() {}

  static getInstance(): ProjectState {
    if (this.instance == null) {
      return new ProjectState();
    }
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(title, description, people);
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((p) => p.id === projectId);
    if (project && project.projectStatus != newStatus) {
      project.projectStatus = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
