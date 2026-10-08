import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budgets";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />
          <Route
            path="/budgets"
            element={<Budget />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;