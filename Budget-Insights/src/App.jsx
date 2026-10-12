import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { FinanceProvider } from "./context/FinanceContext";

function App() {
  return (
    <FinanceProvider>
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
          <Route
            path="/settings"
            element={<Settings />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;