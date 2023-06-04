export interface TaskDto {
  id: string
  title: string
  description: string
  dueDate: Date
  status: boolean | number
  appUserId: string
  appUser: any
}
