import './Despesa.css'

const Despesa = ({descricao, valor, corDeFundo}) => {
    const cssCabecalho = {backgroundColor: corDeFundo};
    return (
        <div className="despesa">
            <div className="cabecalho" style={cssCabecalho}>
                <img src="https://github.com/oedipooliveira.png" alt="Imagem representando a despesa"/>
            </div>
            <div className="rodape">
                <h4>{descricao}</h4>
                <h5>{valor}</h5>
            </div>
        </div>
    );
}

export default Despesa;