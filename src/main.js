import './style.css';
import Swal from 'sweetalert2';

const inputEl = document.querySelector('input');
const btnEl = document.querySelector('button');
const preEl = document.querySelector('pre');

inputEl.addEventListener('keypress', () => {
  const inputLength = inputEl.value.length;

  if (inputLength === 5) {
    inputEl.value += '-';
  }
});

btnEl.addEventListener('click', async () => {
  const cep = inputEl.value;

  if (cep.length === 0) {
    Swal.fire({
      icon: 'error',
      text: 'Digite um CEP',
    });
    return null;
  }

  try {
    const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await result.json();
    if (data.erro) {
      throw new Error('CEP Inválido');
    }
    preEl.innerHTML = JSON.stringify(data, undefined, 1);
    return data;
  } catch (error) {
    inputEl.value = '';
    Swal.fire({
      icon: 'error',
      text: error.message,
    });
    return null;
  }
});
