// Read more about this pattern at: https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling
// This code found at the same previous URL
// Article by: Khalil Stemmler apud Bruno Vegreville

export class Left<L, A> {
  readonly value: L

  constructor (value: L) {
    this.value = value
  }

  isLeft (): this is Left<L, A> {
    return true
  }

  isRight (): this is Right<L, A> {
    return false
  }
}

export class Right<L, A> {
  readonly value: A

  constructor (value: A) {
    this.value = value
  }

  isLeft (): this is Left<L, A> {
    return false
  }

  isRight (): this is Right<L, A> {
    return true
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left<L, A>(l)
}

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}
