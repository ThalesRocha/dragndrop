import { Component } from "./base-component";
import { DragTarget } from "../models/drag-drop";
import { projectState } from "../state/project-state";
import { autobind } from "../decorators/autobind";
import { ProjectStatus, Project } from "../models/project";
import { ProjectItem } from "./project-item";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];

  constructor(private status: ProjectStatus) {
    super("project-list", "app", false, `${status}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(projectId, this.status);
  }

  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((p) => p.projectStatus === this.status);
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderProjects() {
    const listEl = this.element.querySelector(`#${this.status}-projects-list`) as HTMLUListElement;
    listEl.innerHTML = "";
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }

  renderContent() {
    const listId = `${this.status}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.status.toUpperCase() + " PROJECTS";
  }

  public addListItem(listItem: HTMLLIElement) {
    this.element.appendChild(listItem);
  }
}
