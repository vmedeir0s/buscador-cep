import Swal from 'sweetalert2';
import getAddressFromCep from './getAddressFromCep';
import './style.css';

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

  try {
    const addressData = await getAddressFromCep(cep);
    preEl.innerHTML = JSON.stringify(addressData, undefined, 1);
    return null;
  } catch (error) {
    inputEl.value = '';
    Swal.fire({
      icon: 'error',
      text: error.message,
    });
    return null;
  }
});
