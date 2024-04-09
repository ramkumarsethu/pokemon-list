import { Provider } from 'react-redux';
import PokemonList from './components/PokemonList';
import { store } from './store/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PokemonList></PokemonList>
      </Provider>
    </>
  );
};

export default App;
