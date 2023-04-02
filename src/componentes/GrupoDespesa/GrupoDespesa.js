import './GrupoDespesa.css'

const GrupoDespesa = (props) => {
    const cssSection = { backgroundColor: props.corSecundaria };
    const cssH3 = { borderColor: props.corPrimaria };

    return (
        <section className="grupo" style={cssSection}>
            <h3 style={cssH3}>{props.nome}</h3>
        </section>
    )
}

export default GrupoDespesa