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

  public toInt(): number {
    return parseInt(this.n, this.base);
  }
}
