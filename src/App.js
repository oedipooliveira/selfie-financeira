import { useState } from 'react';
import Header from './componentes/Header/Header';
import FormularioGrupoConta from './componentes/FormularioGrupoConta/FormularioGrupoConta';

function App() {

    const [grupos, setGrupos] = useState([]);

    const aoSalvar = (grupo) => {
        setGrupos(...grupos, grupo);
    }

    return (
        <div className="App">
            <Header></Header>
            <FormularioGrupoConta aoSalvar={grupo => aoSalvar(grupo)}></FormularioGrupoConta>
        </div>
    );

}

export default App;
