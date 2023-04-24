import './FormularioGrupo.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Formulario from '../Formulario/Formulario';
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../Botao/Botao';

const FormularioGrupo = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');

    useEffect(() => {
        async function buscarGrupo() {
            const response = await fetch(`http://localhost:8080/grupos/${id}`);
            const grupoJson = await response.json();
            setNome(grupoJson.nome);
        }

        if (id) {
            buscarGrupo();
        }
    }, [id]);

    const aoSalvar = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: (id != null ? "PUT" : "POST"),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    nome
                }
            )
        };

        fetch(`http://localhost:8080/grupos/${id != null ? id : ''}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/grupo');
            });

        setNome('');
    }

    const aoCancelar = () => {
        navigate('/grupo');
    }

    return (
        <Formulario titulo="Grupos" onSubmit={aoSalvar}>
            <CampoTexto
                valor={nome}
                aoAlterado={valor => setNome(valor)}
                label="Nome"
                obrigatorio={true}
                placeholder="Digite o nome do grupo"
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

export default FormularioGrupo;