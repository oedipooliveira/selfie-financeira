import './GrupoDespesa.css';
import Despesa from '../Despesa/Despesa';

const GrupoDespesa = ({corSecundaria, corPrimaria, despesas, nome, aoDeletar}) => {
    const cssSection = { backgroundColor: corSecundaria };
    const cssH3 = { borderColor: corPrimaria };

    return (
        (despesas.length > 0) && <section className="grupo" style={cssSection}>
            <h3 style={cssH3}>{nome}</h3>
            <div className="despesas">
                {despesas.map((despesa, indice) => {
                    return <Despesa key={indice} descricao={despesa.descricao} valor={despesa.valor} corDeFundo={corPrimaria} aoDeletar={aoDeletar} />;
                })}
            </div>
        </section>
    )
}

export default GrupoDespesa