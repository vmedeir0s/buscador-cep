export default async function getAddressFromCep(cep) {
  if (!cep) throw new Error('Você precisa informar um CEP');

  const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await result.json();
  return data;
}
