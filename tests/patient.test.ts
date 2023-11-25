import { describe, expect, jest, test } from '@jest/globals'
import { Patient, printUnderageReport } from '../src/Patient'

const dependentA = {
  name: 'Jane Smith',
  age: 36,
  added: new Date('2019-01-16'),
}
const dependentB = {
  name: 'Joe Smith',
  age: 12,
  added: new Date('2019-01-16'),
}
const dependentC = {
  name: 'Sally Smith',
  age: 10,
  added: new Date('2020-10-12'),
}
const dependentD = {
  name: 'Levi Smith',
  age: 43,
  added: new Date('2021-01-16'),
}
const dependentE = {
  name: 'Gary Smith',
  age: 43,
  added: new Date('2021-01-16'),
}

describe('Patient class tests', () => {
  test('Patient init - should not let create Patient with age under 0', () => {
    expect(() => new Patient('John Kovalski', -43, [])).toThrow(
      'Age cannot be a negative number'
    )
  })
  test('Patient init - should not let create Patient without name', () => {
    expect(() => new Patient('', 20, [])).toThrow(
      "Make sure that you've passed correct name"
    )
  })

  test('Patient getMostRecentDependent - should return most recent dependent', () => {
    const patient: Patient = new Patient('John Smith', 40, [
      dependentA,
      dependentB,
      dependentC,
    ])
    expect(patient.getMostRecentDependent()).toBe(dependentC)
  })
  test('Patient getMostRecentDependent - should return empty array when there are no dependents', () => {
    const patient: Patient = new Patient('John Smith', 40, [])
    expect(patient.getMostRecentDependent()).toStrictEqual([])
  })

  test('Patient getMostRecentAdultDependent - should return most recent adult dependent', () => {
    const patient: Patient = new Patient('John Smith', 40, [
      dependentA,
      dependentB,
      dependentC,
      dependentD,
    ])
    expect(patient.getMostRecentAdultDependent()).toBe(dependentD)
  })
  test('Patient getMostRecentAdultDependent - for 2 dependents with same added date array position should be decisive ', () => {
    const patient: Patient = new Patient('John Smith', 40, [
      dependentA,
      dependentB,
      dependentC,
      dependentD,
      dependentE,
    ])
    expect(patient.getMostRecentAdultDependent()).toBe(dependentE)
  })

  test('printUnderageReport - should call console.log with correct values', () => {
    console.log = jest.fn()
    const patientA: Patient = new Patient('John Smith', 40, [
      dependentA,
      dependentB,
    ])
    const patientB: Patient = new Patient('Gary Smith', 40, [
      dependentC,
      dependentC,
      dependentD,
    ])

    printUnderageReport([patientA, patientB])

    expect((console.log as jest.Mock).mock.calls[0][0]).toBe(
      'John, Smith - Joe(12)'
    )
    expect((console.log as jest.Mock).mock.calls[1][0]).toBe(
      'Gary, Smith - Sally(10), Sally(10)'
    )
  })
  test('printUnderageReport - when called without any patient should throw error ', () => {
    expect(() => printUnderageReport([])).toThrowError(
      'Please provide patients to print report'
    )
  })
})
