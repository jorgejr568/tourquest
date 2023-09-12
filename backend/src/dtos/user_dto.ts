type UserData = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  constructor(private readonly data: UserData) {}

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
}

export type UserLoginRequest = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  user: Omit<User, "password">;
  token: string;
};
