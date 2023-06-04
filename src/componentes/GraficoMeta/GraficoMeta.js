import './GraficoMeta.css';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TbTargetArrow } from 'react-icons/tb';
import { useState, useEffect } from 'react';

function GraficoMeta() {

    const [metas, setMetas] = useState([]);

    useEffect(() => {
        async function fetchMetas() {
            const requestOptions = {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                }
            };
            const response = await fetch('http://localhost:8080/metas', requestOptions);
            const metasJson = await response.json();
            setMetas(
                metasJson.map(meta => {
                    meta.percentualConcluido = (meta.valorGuardado * 100 / meta.valor).toFixed(2);
                    return meta;
                })
            );
        }
        fetchMetas();
    }, []);

    return (
        <div className='grafico'>
            <div className='titulo'>
                <span className='icone'>
                    <TbTargetArrow className='orange' />
                </span>
                <span>Gráfico de Metas</span>
            </div>
            <BarChart className='bar-chart' width={1200} height={300} data={metas} layout="vertical">
                <XAxis domain={[0, 100]} type="number" />
                <YAxis type="category" dataKey="nome" />
                <Bar dataKey="percentualConcluido" fill="#FFB347" layout="horizontal" />
            </BarChart>
        </div>
    );
}

export default GraficoMeta;