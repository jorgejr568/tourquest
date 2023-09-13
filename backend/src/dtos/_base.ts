export abstract class BaseDTO<T> {
  constructor(protected readonly data: T) {}

  toJSON(): T {
    return this.data;
  }
}
