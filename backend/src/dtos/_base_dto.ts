type T_Extend = {
  [key: string]: any;
};

export abstract class BaseDTO<T extends T_Extend, J = T> {
  constructor(protected readonly data: T) {}

  toJSON(): J {
    return Object.fromEntries(
      Object.entries(this.data).map(([key, value]) => {
        if (value instanceof BaseDTO) {
          return [key, value.toJSON()];
        }

        return [key, value];
      }),
    ) as unknown as J;
  }
}
