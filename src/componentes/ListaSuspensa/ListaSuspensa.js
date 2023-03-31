import './ListaSuspensa.css';

const ListaSuspensa = (props) => {
    const aoDigitado = (event) => {
        props.aoAlterado(event.target.value);
    }

    return (
        <div className="lista-suspensa">
            <label>{props.label}</label>
            <select value={props.valor} onChange={aoDigitado} required={props.obrigatorio}>
                {props.itens.map(item => <option key={item}>{item}</option>)}
            </select>
        </div>
    );
}

export default ListaSuspensa;