export class Task {
  id!: string
  title!: string
  description!: string
  dueDate!: Date
  status!: boolean | number
  appUserId!: string
  appUser: any

  constructor(id: string, title: string, description: string, dueDate: Date, status: boolean | number, appUserId: string, appUser: any) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.appUserId = appUserId;
    this.appUser = appUser;
  }

  get isOverdueAndStillPending(): boolean {
    return (this.status === 0 || this.status === false) && (new Date(this.dueDate).getTime() < Date.now());
  }

  get dueDays() {
    return Math.floor((new Date(this.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  }

}
