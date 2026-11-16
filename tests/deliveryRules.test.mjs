import assert from 'node:assert/strict';
import test from 'node:test';
import { validateDeliveryQuantity } from '../src/domain/deliveryRules.ts';

test('aceita a quantidade mínima e calcula o saldo restante', () => {
  assert.deepEqual(validateDeliveryQuantity('1', 5), {
    valid: true,
    quantity: 1,
    remainingStock: 4,
  });
});

test('aceita a quantidade máxima igual ao saldo disponível', () => {
  assert.deepEqual(validateDeliveryQuantity('5', 5), {
    valid: true,
    quantity: 5,
    remainingStock: 0,
  });
});

for (const input of ['', '0', '-1', '1.5']) {
  test(`rejeita quantidade inválida ${JSON.stringify(input)}`, () => {
    const result = validateDeliveryQuantity(input, 5);
    assert.equal(result.valid, false);
    if (!result.valid) assert.equal(result.reason, 'invalid-quantity');
  });
}

test('rejeita quantidade maior que o saldo do item', () => {
  const result = validateDeliveryQuantity('4', 3);
  assert.deepEqual(result, {
    valid: false,
    reason: 'insufficient-stock',
    message: 'O saldo demonstrativo é de 3 unidades. Reduza a quantidade para continuar.',
  });
});

for (const availableStock of [-1, 1.5, Number.NaN]) {
  test(`rejeita saldo demonstrativo inválido ${String(availableStock)}`, () => {
    assert.deepEqual(validateDeliveryQuantity('1', availableStock), {
      valid: false,
      reason: 'invalid-stock',
      message: 'O saldo demonstrativo deste item está indisponível.',
    });
  });
}

test('trata saldo zero como válido, porém insuficiente para uma entrega positiva', () => {
  assert.deepEqual(validateDeliveryQuantity('1', 0), {
    valid: false,
    reason: 'insufficient-stock',
    message: 'O saldo demonstrativo é de 0 unidades. Reduza a quantidade para continuar.',
  });
});
