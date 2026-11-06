import test from 'node:test';
import assert from 'node:assert/strict';
import { parseInventoryQuantities } from '../utils/inventory-validation.js';

test('accepts zero and decimal inventory quantities', () => {
  assert.deepEqual(parseInventoryQuantities('0', '0'), {
    valid: true,
    quantity: 0,
    minQuantity: 0
  });
  assert.deepEqual(parseInventoryQuantities('2.5', '1.25'), {
    valid: true,
    quantity: 2.5,
    minQuantity: 1.25
  });
});

test('defaults an empty minimum quantity to zero', () => {
  assert.deepEqual(parseInventoryQuantities('3', ''), {
    valid: true,
    quantity: 3,
    minQuantity: 0
  });
});

test('rejects missing, non-finite, and negative quantities', () => {
  for (const value of ['', ' ', 'abc', 'Infinity', '-0.1']) {
    assert.equal(parseInventoryQuantities(value, '0').valid, false, `quantity: ${value}`);
  }
});

test('rejects invalid or negative minimum quantities', () => {
  for (const value of ['abc', 'Infinity', '-1']) {
    assert.equal(parseInventoryQuantities('1', value).valid, false, `minimum: ${value}`);
  }
});
