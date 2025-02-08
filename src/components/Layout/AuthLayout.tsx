import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

export function AuthLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      return;
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <main className="bg-muted">
      <Outlet />
    </main>
  );
}
