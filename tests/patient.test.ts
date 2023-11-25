import { describe, expect, jest, test } from '@jest/globals'
import { Patient, printUnderageReport } from '../src/Patient'
import {dependentA, dependentB, dependentC, dependentD, dependentE} from "./dependents.testdata";

//2 tests per function feels like there's much more cases to cover.
//In real world when there would more tests there would be probably in separated files for clarity
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
    // I could also write the print function to return string, and test it that way but I thought this would
    // be a good example for mocking
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
