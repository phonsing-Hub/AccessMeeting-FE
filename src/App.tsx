import { BrowserRouter, Routes, Route } from "react-router";
import { AuthLayout } from "./components/Layout/AuthLayout";
import { RootLayout } from "./components/Layout/RootLayout";
import Dashboard from "./components/page/Dashboard";
import LoginPage from "./components/page/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

