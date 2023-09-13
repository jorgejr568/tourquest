export abstract class BaseDTO<T, J = T> {
  constructor(protected readonly data: T) {}

  toJSON(): J {
    return this.data as unknown as J;
  }
}
