import { Provider } from "react-redux";
import { store } from "./store/store";
import ToastMessage from "./components/Toast";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonContainer from "./components/PokemonContainer";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<PokemonContainer />} />
            <Route path="/pokemon-list" element={<PokemonContainer />} />
          </Routes>
        </BrowserRouter>
        <ToastMessage />
      </Provider>
    </>
  );
};

export default App;
