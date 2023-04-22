import './FormularioGrupoConta.css';
import { useState } from 'react';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';

const FormularioGrupo = (props) => {

    const aoSalvar = (event) => {
        event.preventDefault();
        props.aoSalvar({
            nome
        });
    }

    const [nome, setNome] = useState('');

    return (
        <Formulario titulo="Grupos" onSubmit={aoSalvar}>
            <CampoTexto
                valor={nome}
                aoAlterado={valor => setNome(valor)}
                label="Nome"
                obrigatorio={true}
                placeholder="Digite o nome do grupo"
            />
            <Botao>
                Salvar
            </Botao>
        </Formulario>
    );
}

export default FormularioGrupo;