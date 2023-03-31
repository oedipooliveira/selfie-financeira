import { useState } from 'react';
import './FormularioGrupoConta.css';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import Botao from '../Botao/Botao';

const FormularioGrupoConta = () => {

    const grupos = [
        'Alimentação',
        'Moradia',
        'Educação',
        'Animal de Estimação',
        'Saúde',
        'Transporte',
        'Pessoa',
        'Lazer',
        'Serviços Financeiros',
        'Renda',
        'Renda Extra'
    ];

    const aoSalvar = (event) => {
        event.preventDefault();
        console.log('Form submetido => ', nome, descricao, grupo);
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
                itens={grupos}
            />
            <Botao>
                Salvar
            </Botao>
        </Formulario>
    );
}

export default FormularioGrupoConta;