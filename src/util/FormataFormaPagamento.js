import formasPagamento from './FormasPagamento.js';

function FormataFormaPagamento(key) {
  for (let i = 0; i < formasPagamento.length; i++) {
    if (formasPagamento[i].key === key) {
      return formasPagamento[i].value;
    }
  }
  return null;
}

export default FormataFormaPagamento;