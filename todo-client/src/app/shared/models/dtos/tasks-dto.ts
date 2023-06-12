export interface TaskDto {
  id: string
  title: string
  description: string
  dueDate: Date
  status: boolean | number
  appUserId: string
  appUser: any
}

export interface AddTaskDto {
  title: string
  description: string
  dueDate: Date
}

export interface UpdateTaskDto {
  id: string
  title: string
  description: string
  dueDate: string
}
