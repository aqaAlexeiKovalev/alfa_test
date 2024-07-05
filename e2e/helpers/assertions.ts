import {expect} from '@playwright/test';

export class Assertions {
  static expectToEqual(result: any, expectedResult: any, errorMessage?: string): void {
    try {
      expect(result).toEqual(expectedResult);
    } catch {
      throw Error(errorMessage);
    }
  }

  static expectToInclude(result: any, expectedResult: any, errorMessage?: string): void {
    try {
      expect(result).toEqual(expect.stringContaining(expectedResult));
    } catch {
      throw Error(errorMessage);
    }
  }

  static expectToBeTrue(result: boolean, errorMessage?: string): void {
    try {
      expect(result).toBeTruthy();
    } catch {
      throw Error(errorMessage);
    }
  }
}
