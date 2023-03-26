import Header from './componentes/Header/Header';
import CampoTexto from './componentes/CampoTexto/CampoTexto';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <CampoTexto label="Nome" placeholder="Digite o seu nome"></CampoTexto>
      <CampoTexto label="Cargo" placeholder="Digite o seu cargo"></CampoTexto>
      <CampoTexto label="Imagem" placeholder="Digite a sua imagem"></CampoTexto>
    </div>
  );
}

export default App;
