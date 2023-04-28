import './FormularioMeta.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import CampoData from '../CampoData/CampoData';
import Botao from '../Botao/Botao';

const FormularioMeta = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [nome, setNome] = useState('');
    const [motivo, setMotivo] = useState('');

    useEffect(() => {
        async function buscarMeta() {
            const response = await fetch(`http://localhost:8080/metas/${id}`);
            const metaJson = await response.json();
            setValor(metaJson.valor);
            setData(metaJson.data);
            setNome(metaJson.nome);
            setMotivo(metaJson.motivo);
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
                    motivo
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
    }

    const aoCancelar = () => {
        navigate('/meta');
    }

    return (
        <Formulario titulo="Metas" onSubmit={aoSalvar}>
            <CampoTexto
                valor={valor}
                aoAlterado={valor => setValor(valor)}
                label="Eu preciso de"
                obrigatorio={true}
                placeholder="Digite o valor necessário para alcançar a meta"
            />
            <CampoData
                valor={data}
                aoAlterado={valor => setData(valor)}
                obrigatorio={true}
                label="Até"
            />
            <CampoTexto
                valor={nome}
                aoAlterado={valor => setNome(valor)}
                label="Para"
                obrigatorio={true}
                placeholder="Digite o nome da meta"
            />
            <CampoTexto
                valor={motivo}
                aoAlterado={valor => setMotivo(valor)}
                label="Porque"
                obrigatorio={true}
                placeholder="Digite o motivo da meta"
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

export default FormularioMeta;