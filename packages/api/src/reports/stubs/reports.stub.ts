import { CreateReportInput } from "../dto/create-report.input";
import { Report } from "../entities/report.entity";

export const createReportInputStub = (): CreateReportInput => { 
    const r = new CreateReportInput()
    r.uid = "123456789"
    r.aanwezigen = ["123456789", "987654321"]
    r.vervanging = "naam vervanging"
    r.radioKindVerloren = "example radio kind verloren"
    r.radioInterventie = "example radio interventie"
    r.textInterventie = "example text interventie"
    r.radioOefening = "example radio oefening"
    r.textOefening = "example text oefening"
    r.radioMateriaal = "example radio materiaal"
    r.textMateriaal = "example text materiaal"
    r.extraInfo = "example info"
    r.status = false
    return r
}

export const reportStub = (): Report => {
    const r = new Report()
    r.uid = "123456789"
    r.aanwezigen = ["123456789", "987654321"]
    r.vervanging = "naam vervanging"
    r.radioKindVerloren = "example radio kind verloren"
    r.radioInterventie = "example radio interventie"
    r.textInterventie = "example text interventie"
    r.radioOefening = "example radio oefening"
    r.textOefening = "example text oefening"
    r.radioMateriaal = "example radio materiaal"
    r.textMateriaal = "example text materiaal"
    r.extraInfo = "example info"
    r.status = false
    return r
}