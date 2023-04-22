function FormataData(valor) {
    let data = new Date(valor); // converter para objeto Date
    let dia = data.getUTCDate().toString().padStart(2, '0'); // extrair o dia
    let mes = (data.getUTCMonth() + 1).toString().padStart(2, '0'); // extrair o mês
    let ano = data.getUTCFullYear(); // extrair o ano
    let dataFormatada = `${dia}/${mes}/${ano}`; // formatar a data
    return dataFormatada;
}

export default FormataData;