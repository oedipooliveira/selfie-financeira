import './Formulario.css';

const Formulario = (props) => {
    return (
        <section className="formulario">
            <form onSubmit={props.onSubmit}>
                <h2>{props.titulo}</h2>
                {props.children}
            </form>
        </section>
    );
}

export default Formulario;