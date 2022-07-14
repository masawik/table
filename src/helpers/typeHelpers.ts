export type Unpacked<T> = T extends (infer U)[] ? U : never

export type TStringOrNumber = string | number