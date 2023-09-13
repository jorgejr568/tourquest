import { BaseDTO } from "./_base";
import { Checkpoint } from "./checkpoint_dto";

type UserData = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  checkpoints?: Checkpoint[];
};

export class User extends BaseDTO<UserData> {
  get id(): string {
    return this.data.id;
  }

  get email(): string {
    return this.data.email;
  }

  get password(): string {
    return this.data.password;
  }

  get createdAt(): Date {
    return this.data.createdAt;
  }

  get updatedAt(): Date {
    return this.data.updatedAt;
  }

  get checkpoints() {
    return this.data.checkpoints;
  }
}

export type UserLoginRequest = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  user: Omit<UserData, "password">;
  token: string;
};
