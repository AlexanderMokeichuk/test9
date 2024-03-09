import Layout from "./component/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Categories from "./containet/Categories/Categories.tsx";
import Transactions from "./containet/Transactions/Transactions.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<Transactions />)} />
        <Route path={"/categories"} element={(<Categories />)} />
        <Route path={"*"} element={(<h1>Not found</h1>)} />
      </Routes>
    </Layout>
  );
}

export default App;
