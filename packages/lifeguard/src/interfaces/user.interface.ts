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
  email: string
  phoneNumber: number
  bathingPlace: string
  accessPlatform: boolean
  birth: Date
  birthplace: string
  city: string
  zipCode: number
  street: string
  numberOfHouse: number
  role: number
  status: boolean
  createdAt: string
  updatedAt: string
}