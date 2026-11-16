export type DeliveryQuantityResult =
  | { valid: true; quantity: number; remainingStock: number }
  | {
      valid: false;
      reason: 'invalid-quantity' | 'insufficient-stock' | 'invalid-stock';
      message: string;
    };

export function validateDeliveryQuantity(
  input: string,
  availableStock: number,
): DeliveryQuantityResult {
  const quantity = Number(input);

  if (!Number.isInteger(quantity) || quantity < 1) {
    return {
      valid: false,
      reason: 'invalid-quantity',
      message: 'Informe uma quantidade inteira maior que zero.',
    };
  }

  if (!Number.isInteger(availableStock) || availableStock < 0) {
    return {
      valid: false,
      reason: 'invalid-stock',
      message: 'O saldo demonstrativo deste item está indisponível.',
    };
  }

  if (quantity > availableStock) {
    const unit = availableStock === 1 ? 'unidade' : 'unidades';
    return {
      valid: false,
      reason: 'insufficient-stock',
      message: `O saldo demonstrativo é de ${availableStock} ${unit}. Reduza a quantidade para continuar.`,
    };
  }

  return {
    valid: true,
    quantity,
    remainingStock: availableStock - quantity,
  };
}
