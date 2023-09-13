import { BaseDTO } from "./_base_dto";
import { Checkpoint } from "./checkpoint_dto";

type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  checkpoints?: Checkpoint[];
};

export class User extends BaseDTO<UserData, Omit<UserData, "password">> {
  get id(): string {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
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

  toJSON(): Omit<UserData, "password"> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export type UserLoginRequest = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  user: User;
  token: string;
};

export type UserCreateRequest = {
  name: string;
  email: string;
  password: string;
};

export type UserCreateResponse = {
  user: User;
  token: string;
};
