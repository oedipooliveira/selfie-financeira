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
        console.log('Form submetido');
    }

    return (
        <Formulario titulo="Grupo de contas" onSubmit={aoSalvar}>
            <CampoTexto label="Nome" obrigatorio={true} placeholder="Digite o nome do grupo"></CampoTexto>
            <CampoTexto label="Descrição" placeholder="Digite a descrição do grupo"></CampoTexto>
            <ListaSuspensa label="Grupo" itens={grupos}></ListaSuspensa>
            <Botao>
                Salvar
            </Botao>
        </Formulario>
    );
}

export default FormularioGrupoConta;