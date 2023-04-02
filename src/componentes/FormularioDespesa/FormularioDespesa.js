import './FormularioDespesa.css';
import { useState } from 'react';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import Botao from '../Botao/Botao';

const FormularioDespesa = (props) => {

    const aoSalvar = (event) => {
        event.preventDefault();
        props.aoSalvar({
            descricao,
            valor,
            grupo
        });
    }

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

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [grupo, setGrupo] = useState('');

    return (
        <Formulario titulo="Despesa" onSubmit={aoSalvar}>
            <CampoTexto
                valor={descricao}
                aoAlterado={valor => setDescricao(valor)}
                label="Descrição"
                obrigatorio={true}
                placeholder="Digite a descrição da despesa"
            />
            <CampoTexto
                valor={valor}
                aoAlterado={valor => setValor(valor)}
                label="Valor"
                placeholder="Digite o valor da despesa"
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

export default FormularioDespesa;