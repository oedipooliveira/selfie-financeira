import './Botao.css';

const Botao = (props) => {
    return (
        <button onClick={props.aoClicar} className="botao">
            {props.children}
        </button>
    );
}

export default Botao;