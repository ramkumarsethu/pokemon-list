import { Provider } from 'react-redux';
import PokemonList from './components/PokemonList';
import { store } from './store/store';
import ToastMessage from './components/Toast';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PokemonList></PokemonList>
        <ToastMessage />
      </Provider>
    </>
  );
};

export default App;
