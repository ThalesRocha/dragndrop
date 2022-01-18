export enum ProjectStatus {
  ACTIVE = "active",
  FINISHED = "finished",
}

export class Project {
  private _projectStatus: ProjectStatus;
  private _id: string;

  constructor(private _description: string, private _title: string, private _people: number) {
    this._id = Math.random().toString();
    this._projectStatus = ProjectStatus.ACTIVE;
  }

  public get projectStatus(): ProjectStatus {
    return this._projectStatus;
  }
  public set projectStatus(value: ProjectStatus) {
    this._projectStatus = value;
  }

  public get id(): string {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get description() {
    return this._description;
  }

  public get people() {
    return this._people;
  }
}
