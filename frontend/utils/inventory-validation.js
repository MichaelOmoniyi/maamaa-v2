export function parseInventoryQuantities(quantityValue, minimumValue) {
  const quantityText = String(quantityValue ?? '').trim();
  if (!quantityText) {
    return { valid: false, error: 'Enter a quantity.' };
  }

  const quantity = Number(quantityText);
  if (!Number.isFinite(quantity) || quantity < 0) {
    return { valid: false, error: 'Quantity must be a finite number of zero or more.' };
  }

  const minimumText = String(minimumValue ?? '').trim();
  const minQuantity = minimumText ? Number(minimumText) : 0;
  if (!Number.isFinite(minQuantity) || minQuantity < 0) {
    return { valid: false, error: 'Minimum quantity must be a finite number of zero or more.' };
  }

  return { valid: true, quantity, minQuantity };
}
