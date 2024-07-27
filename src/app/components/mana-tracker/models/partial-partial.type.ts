export type PartialPartial<T1 extends object, T2 extends keyof T1> = {
  [K in keyof T1]: T1[K] extends T2 ? T1[K] | undefined : T1[K]
}

