const nameRegex: RegExp = /^[a-z ,.'-]+$/i

export type Dependent = {
  name: string
  age: number
  added: Date
}
export class Patient {
  constructor(
    private name: string,
    private age: number,
    private dependents: Dependent[]
  ) {
    if (age < 0) {
      throw new Error('Age cannot be a negative number')
    }
    if (!nameRegex.test(name)) {
      throw new Error("Make sure that you've passed correct name")
    }
    //There could be also validation in case of number of dependents is more than 5 but i'm not sure if that's
    //more a requirement or constraint
  }
  getMostRecentDependent() {
    if (this.dependents.length > 0)
      return this.dependents.reduce((a, b) => (a.added > b.added ? a : b))
    console.log('WARN - No dependents available, returning []')
    return []
  }
  getMostRecentAdultDependent() {
    return this.getAdultDependents().reduce((a, b) =>
      a.added > b.added ? a : b
    )
  }
  private getAdultDependents() {
    return this.dependents.filter((a) => a.age > 18)
  }
  private getUnderAgeDependents() {
    return this.dependents.filter((a) => a.age <= 18)
  }
  private getFirstName(name = this.name) {
    return name.substring(0, this.name.indexOf(' '))
  }
  private getSurname(name = this.name) {
    return name.substring(this.name.indexOf(' ') + 1, this.name.length)
  }
  getUnderageDependent() {
    let report = `${this.getFirstName()}, ${this.getSurname()} - `
    this.getUnderAgeDependents().forEach((dependent, i) => {
      let dependentPart = `${dependent.name.substring(
        0,
        dependent.name.indexOf(' ')
      )}(${dependent.age})`
      report += dependentPart
      if (i !== this.getUnderAgeDependents().length - 1) {
        report += ', '
      }
    })

    return report
  }
}

// This function could go to some other class but as this is just an example i've left it here
export function printUnderageReport(patient: Patient[]) {
  if (patient.length == 0) {
    throw Error('Please provide patients to print report')
  }
  patient.forEach((p) => {
    console.log(p.getUnderageDependent())
  })
}
