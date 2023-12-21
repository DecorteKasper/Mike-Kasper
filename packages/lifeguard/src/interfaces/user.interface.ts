// export enum Role {
//   ADMIN = 'ADMIN',
//   USER = 'USER',
// }

export interface Iuser {
  id: string
  uid: string
  name: string
  surname: string
  photoURL: string | null
  email: string | null
  phoneNumber: number | null
  bathingPlace: string | null
  accessPlatform: boolean | null
  birth: Date | null
  birthplace: string | null
  city: string | null
  zipCode: number | null
  street: string | null
  numberOfHouse: number | null
  role: number | null
  status: boolean | null
  createdAt: string | null
  updatedAt: string | null
}