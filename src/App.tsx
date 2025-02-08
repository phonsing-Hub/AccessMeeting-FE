
import { Routes, Route } from "react-router";
import { AuthLayout } from "./components/Layout/AuthLayout";
import { RootLayout } from "./components/Layout/RootLayout";
import { AuthProvider } from "./hooks/auth/Authprovider";
import Dashboard from "./components/page/Dashboard";
import Room from "./components/page/Room";
import LoginPage from "./components/page/Login";

export default function App() {


  return (
    <AuthProvider>
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rooms" element={<Room/>} />
        <Route path="/booking" element={<h1>booking</h1>} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
    </AuthProvider>
  );
}
