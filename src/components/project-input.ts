import { Component } from "./base-component";
import { Validatable, validate } from "../util/validation";
import { projectState } from "../state/project-state";
import { autobind } from "../decorators/autobind";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.configure();

    this.titleInputElement = document.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = document.querySelector("#description") as HTMLInputElement;
    this.peopleInputElement = document.querySelector("#people") as HTMLInputElement;
  }

  private gatheruserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;

    const titleValidatable: Validatable = { value: enteredTitle, required: true };
    const descriptionValidatable: Validatable = { value: enteredDescription, required: true, minLength: 5 };
    const peopleValidatable: Validatable = { value: enteredPeople, required: true, min: 1 };

    if (validate(titleValidatable) && validate(descriptionValidatable) && validate(peopleValidatable)) {
      return [enteredTitle, enteredDescription, enteredPeople];
    }

    return alert("invalid input, pleasy try again!!!");
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatheruserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInput();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent(): void {}

  private clearInput() {
    this.peopleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.titleInputElement.value = "";
  }
}
