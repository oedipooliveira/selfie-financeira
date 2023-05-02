import './FormularioMetaDeposito.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import CampoExibicao from '../CampoExibicao/CampoExibicao';
import Botao from '../Botao/Botao';
import FormataValorReal from '../../util/FormataValorReal';
import FormataData from '../../util/FormataData';

const FormularioMetaDeposito = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [nome, setNome] = useState('');
    const [motivo, setMotivo] = useState('');
    const [valorGuardado, setValorGuardado] = useState('');

    const [valorGuardadoOriginal, setValorGuardadoOriginal] = useState('');
    const [valorDepositar, setValorDepositar] = useState('');

    useEffect(() => {
        async function buscarMeta() {
            const response = await fetch(`http://localhost:8080/metas/${id}`);
            const metaJson = await response.json();
            setValor(metaJson.valor);
            setData(metaJson.data);
            setNome(metaJson.nome);
            setMotivo(metaJson.motivo);
            setValorGuardadoOriginal(metaJson.valorGuardado);
        }

        if (id) {
            buscarMeta();
        }
    }, [id]);

    const aoSalvar = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: (id != null ? "PUT" : "POST"),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    valor,
                    data,
                    nome,
                    motivo,
                    valorGuardado
                }
            )
        };

        fetch(`http://localhost:8080/metas/${id != null ? id : ''}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/meta');
            });

        setValor('');
        setData('');
        setNome('');
        setMotivo('');
        setValorDepositar('');
        setValorGuardado('');
    }

    const aoCancelar = () => {
        navigate('/meta');
    }

    const aoAlterarValorDepositar = (valor) => {
        setValorDepositar(valor);
        if (valor != null && !isNaN(valor)) {
            setValorGuardado(parseFloat(valorGuardadoOriginal) + parseFloat(valor));
        } else {
            setValorGuardado(valorGuardadoOriginal);
        }
    }

    return (
        <Formulario titulo="Depósito" onSubmit={aoSalvar}>
            <CampoExibicao valor={FormataValorReal(valor)} label="Eu preciso de" />
            <CampoExibicao valor={FormataData(data)} label="Até" />
            <CampoExibicao valor={nome} label="Para" />
            <CampoExibicao valor={motivo} label="Porque" />
            <CampoTexto
                valor={valorDepositar}
                aoAlterado={valor => aoAlterarValorDepositar(valor)}
                label="Valor à depositar"
                obrigatorio={true}
                placeholder="Digite o valor à depositar para alcançar a meta"
            />
            <div className="flexbox">
                <Botao aoClicar={aoCancelar} type="button" cor="blue">
                    <FaArrowLeft size={15} />
                </Botao>
                <Botao type="submit" largura="full">
                    Salvar
                </Botao>
            </div>
        </Formulario>
    );

}

export default FormularioMetaDeposito;