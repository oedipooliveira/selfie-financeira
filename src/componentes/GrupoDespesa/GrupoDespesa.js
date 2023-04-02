import './GrupoDespesa.css';
import Despesa from '../Despesa/Despesa';

const GrupoDespesa = (props) => {
    const cssSection = { backgroundColor: props.corSecundaria };
    const cssH3 = { borderColor: props.corPrimaria };

    return (
        (props.despesas.length > 0) && <section className="grupo" style={cssSection}>
            <h3 style={cssH3}>{props.nome}</h3>
            <div className="despesas">
                {props.despesas.map(despesa => <Despesa key={despesa.descricao} descricao={despesa.descricao} valor={despesa.valor} corDeFundo={props.corPrimaria} />)}
            </div>
        </section>
    )
}

export default GrupoDespesa