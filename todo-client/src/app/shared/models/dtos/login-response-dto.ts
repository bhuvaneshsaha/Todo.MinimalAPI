import { User } from "../user";

export interface LoginResponseDto {
  token: string;
  user: User
}
