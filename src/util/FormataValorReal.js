function FormataValorReal(valor) {
    if (valor != null && !isNaN(valor)) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    } else {
        return '';
    }
}

export default FormataValorReal;