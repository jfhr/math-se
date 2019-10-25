export function convert(n: number): NumberRepresentationWithFromBase;
export function convert(n: string): NumberRepresentation;

export function convert(n) {
  if (typeof n === 'string') {
    return new NumberRepresentation(n);
  } else if (typeof n === 'number') {
    return new NumberRepresentationWithFromBase(n.toString(), 10);
  }
}

class NumberRepresentation {
  constructor(private n: string) {
  }

  public fromBase(base: number): NumberRepresentationWithFromBase {
    return new NumberRepresentationWithFromBase(this.n, base);
  }
}

class NumberRepresentationWithFromBase {
  constructor(private n: string, private base: number) {
  }

  public toBase(base: number): string {
    const i = parseInt(this.n, this.base);
    return i.toString(base);
  }

  public toNumber(): number {
    return parseInt(this.n, this.base);
  }
}

export function sum(...values: string[]) {
  return new NumberRepresentationSum(values);
}

class NumberRepresentationSum {
  constructor(private values: string[]) {
  }

  public withBase(base: number): string {
    let s = 0;
    for (const value of this.values) {
      const n = convert(value).fromBase(base).toNumber();
      if (!isNaN(n)) {
        s += n;
      }
    }
    return convert(s).toBase(base);
  }
}
