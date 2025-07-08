/**
 * Data Validation Scripts for learner10x.com
 * 
 * This file contains scripts and functions for validating data post-migration
 * as part of Phase 1, Task 1.7: Data Migration & Integration Strategy (#60).
 * The goal is to ensure data completeness, accuracy, and consistency after migration.
 */

/**
 * Validation Functions
 * 
 * These functions will be used to check various aspects of the migrated data.
 */

/**
 * Check for data completeness
 * Ensures that all expected records are present after migration.
 * @param data The migrated data set to validate
 * @param expectedCount The expected number of records
 * @returns An object with validation result
 */
export function checkCompleteness(data: any[], expectedCount: number): { valid: boolean; message: string } {
  const actualCount = data.length;
  if (actualCount === expectedCount) {
    return { valid: true, message: `Data completeness check passed. Expected and found ${expectedCount} records.` };
  } else {
    return { valid: false, message: `Data completeness check failed. Expected ${expectedCount} records, but found ${actualCount}.` };
  }
}

/**
 * Check for data accuracy
 * Validates that key fields in the data match expected values or patterns.
 * @param data The migrated data set to validate
 * @param fieldRules An object defining rules for key fields (e.g., regex patterns or expected values)
 * @returns An object with validation result
 */
export function checkAccuracy(data: any[], fieldRules: { [key: string]: RegExp | any }): { valid: boolean; message: string; errors: string[] } {
  const errors: string[] = [];
  let valid = true;

  data.forEach((record, index) => {
    for (const [field, rule] of Object.entries(fieldRules)) {
      const value = record[field];
      if (rule instanceof RegExp) {
        if (!rule.test(value)) {
          valid = false;
          errors.push(`Record ${index}: Field '${field}' value '${value}' does not match pattern ${rule}.`);
        }
      } else {
        if (value !== rule) {
          valid = false;
          errors.push(`Record ${index}: Field '${field}' value '${value}' does not match expected value '${rule}'.`);
        }
      }
    }
  });

  return {
    valid,
    message: valid ? 'Data accuracy check passed for all records.' : 'Data accuracy check failed. See errors for details.',
    errors
  };
}

/**
 * Check for data consistency
 * Ensures referential integrity and relationships between data entities.
 * @param primaryData The primary data set (e.g., users)
 * @param relatedData The related data set (e.g., user profiles)
 * @param primaryKey The key in primary data linking to related data
 * @param foreignKey The key in related data linking to primary data
 * @returns An object with validation result
 */
export function checkConsistency(
  primaryData: any[],
  relatedData: any[],
  primaryKey: string,
  foreignKey: string
): { valid: boolean; message: string; errors: string[] } {
  const errors: string[] = [];
  let valid = true;
  const primaryIds = new Set(primaryData.map(record => record[primaryKey]));

  relatedData.forEach((record, index) => {
    const fkValue = record[foreignKey];
    if (!primaryIds.has(fkValue)) {
      valid = false;
      errors.push(`Record ${index}: Foreign key '${foreignKey}' value '${fkValue}' does not exist in primary data set.`);
    }
  });

  return {
    valid,
    message: valid ? 'Data consistency check passed for all relationships.' : 'Data consistency check failed. See errors for details.',
    errors
  };
}

/**
 * Data Integrity Checks
 * 
 * These functions ensure ongoing data integrity through constraints and validations.
 */

/**
 * Calculate checksum for critical data
 * Used to verify data has not been corrupted during migration.
 * @param data The data to calculate checksum for
 * @returns A checksum string
 */
export function calculateChecksum(data: any): string {
  const stringified = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < stringified.length; i++) {
    const char = stringified.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(16);
}

/**
 * Validation Test Runner
 * 
 * Runs a suite of validation tests on migrated data and aggregates results.
 * @param testSuite An object containing data sets and validation parameters
 * @returns A comprehensive validation report
 */
export function runValidationTests(testSuite: {
  completeness: { data: any[]; expectedCount: number };
  accuracy: { data: any[]; fieldRules: { [key: string]: RegExp | any } };
  consistency: { primaryData: any[]; relatedData: any[]; primaryKey: string; foreignKey: string };
}): {
  overallValid: boolean;
  completenessResult: { valid: boolean; message: string };
  accuracyResult: { valid: boolean; message: string; errors: string[] };
  consistencyResult: { valid: boolean; message: string; errors: string[] };
} {
  const completenessResult = checkCompleteness(testSuite.completeness.data, testSuite.completeness.expectedCount);
  const accuracyResult = checkAccuracy(testSuite.accuracy.data, testSuite.accuracy.fieldRules);
  const consistencyResult = checkConsistency(
    testSuite.consistency.primaryData,
    testSuite.consistency.relatedData,
    testSuite.consistency.primaryKey,
    testSuite.consistency.foreignKey
  );

  return {
    overallValid: completenessResult.valid && accuracyResult.valid && consistencyResult.valid,
    completenessResult,
    accuracyResult,
    consistencyResult
  };
}

/**
 * Example Usage
 * 
 * const testSuite = {
 *   completeness: { data: migratedUsers, expectedCount: 1000 },
 *   accuracy: { data: migratedUsers, fieldRules: { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } },
 *   consistency: { primaryData: migratedUsers, relatedData: migratedProfiles, primaryKey: 'id', foreignKey: 'userId' }
 * };
 * const report = runValidationTests(testSuite);
 * console.log(report);
 */

/**
 * Next Steps for Data Validation
 * 
 * - Identify specific data sets and expected counts for completeness checks.
 * - Define field rules for accuracy validation based on data schema.
 * - Map out relationships between data entities for consistency checks.
 * - Integrate validation tests into migration workflow for automated execution.
 * - Set up logging and alerting for validation failures during migration.
 */
