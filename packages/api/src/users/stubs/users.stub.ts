import { CreateUserInput } from "../dto/create-user.input";
import { User } from "../entities/user.entity";

export const createUserInputStub = (): CreateUserInput => { 
    const u = new CreateUserInput()
    u.uid = "123456789"
    u.name = "example name"
    u.surname = "example surname"
    u.photoURL = null
    u.email = "example email"
    u.phoneNumber = null
    u.birth = null
    u.birthplace = null
    u.city = null
    u.zipCode = null
    u.street = null
    u.numberOfHouse = null
    u.role = 200
    u.bathingPlace = "example bathing place"
    return u
}

export const userStub = (): User => {
    const u = new User()
    u.uid = "123456789"
    u.name = "example name"
    u.surname = "example surname"
    u.photoURL = null
    u.email = "example email"
    u.phoneNumber = null
    u.birth = null
    u.birthPlace = "example birthplace"
    u.city = null
    u.zipCode = null
    u.street = null
    u.numberOfHouse = null
    u.role = 200
    u.bathingPlace = "example bathing place"
    return u
}