import { CreateCheckInput } from "../dto/create-check.input";
import { Check } from "../entities/check.entity";

export const CreateCheckInputStub = (): CreateCheckInput => { 
    const c = new CreateCheckInput()
    c.checkMonths = true
    c.checkHolidays = true
    c.accessPlatform = true
    return c
}

export const checkStub = (): Check => {
    const c = new Check()
    c.checkMonths = true
    c.checkHolidays = true
    c.accessPlatform = true
    return c
}