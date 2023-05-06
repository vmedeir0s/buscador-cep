import fetch from 'node-fetch';
import getAddressFromCep from './getAddressFromCep';

global.fetch = fetch;

describe('Quando a requisição é bem sucedida, ela retorna os dados esperados', () => {
  test('Deve retornar os dados quando passamos um cep válido', async () => {
    const address = await getAddressFromCep('01153-000');
    expect(address.cep).toBe('01153-000');
    expect(address.logradouro).toBe('Rua Vitorino Carmilo');
    expect(address.bairro).toBe('Barra Funda');
    expect(address.uf).toBe('SP');
  });

  test('Deve aceitar CEP com hífem ou sem hífem', async () => {
    let address = await getAddressFromCep('01153000');
    expect(address.cep).toBe('01153-000');

    address = await getAddressFromCep('01153-000');
    expect(address.cep).toBe('01153-000');
  });

  test('Deve lançar erro "Você precisa passar um CEP" quando passar cep vazio', async () => {
    const emptyCep = '';

    await expect(getAddressFromCep(emptyCep)).rejects.toThrow(
      new Error('Você precisa informar um CEP'),
    );
  });

  test('Deve lançar erro quando passar cep inválido', async () => {
    const invalidCep = 'XXXXX-XXX';
    const invalidCepLessDigits = '00000-00';
    const invalidCepMoreDigits = '00000-0000';

    await expect(getAddressFromCep(invalidCep)).rejects.toThrow();
    await expect(getAddressFromCep(invalidCepLessDigits)).rejects.toThrow();
    await expect(getAddressFromCep(invalidCepMoreDigits)).rejects.toThrow();
  });
});
