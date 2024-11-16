import './App.css';
import Translator from './components/Translator';
import Logo from './Header.png'


function App() {
  return (
    <div className="App">

      <img src={Logo} alt="head"/>
      <Translator/>
      
    </div>
  );
}

export default App;
