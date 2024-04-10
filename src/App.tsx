import { Provider } from "react-redux";
import PokemonList from "./components/PokemonList";
import { store } from "./store/store";
import ToastMessage from "./components/Toast";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<PokemonList />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
          </Routes>
        </BrowserRouter>
        <ToastMessage />
      </Provider>
    </>
  );
};

export default App;
