import { useState } from 'react';
import './FormularioGrupoConta.css';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import Botao from '../Botao/Botao';

const FormularioGrupoConta = (props) => {
    const aoSalvar = (event) => {
        event.preventDefault();
        props.aoSalvar({
            nome,
            descricao,
            grupo
        });
    }

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [grupo, setGrupo] = useState('');

    return (
        <Formulario titulo="Grupo de contas" onSubmit={aoSalvar}>
            <CampoTexto
                valor={nome}
                aoAlterado={valor => setNome(valor)}
                label="Nome"
                obrigatorio={true}
                placeholder="Digite o nome do grupo"
            />
            <CampoTexto
                valor={descricao}
                aoAlterado={valor => setDescricao(valor)}
                label="Descrição"
                placeholder="Digite a descrição do grupo"
            />
            <ListaSuspensa
                valor={grupo}
                aoAlterado={valor => setGrupo(valor)}
                label="Grupo"
                itens={props.grupos}
            />
            <Botao>
                Salvar
            </Botao>
        </Formulario>
    );
}

export default FormularioGrupoConta;