import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import Loading from "@/components/common/Loading";

const LogoutPage = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const performLogout = async () => {
      setIsLoading(true);
      setError(null);
      timeoutId = setTimeout(() => {
        if (isMounted) {
          setError(
            "El proceso de cierre de sesión ha tardado demasiado tiempo. Por favor, inténtelo de nuevo."
          );
          setIsLoading(false);
        }
      }, 10000);

      try {
        await logout();
        if (isMounted) {
          clearTimeout(timeoutId); 
          setIsLoading(false);
          router.push("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
        if (isMounted) {
          setError(
            "No se pudo cerrar sesión correctamente. Por favor, inténtelo de nuevo."
          );
          setIsLoading(false);
          router.push("/error");
        }
      }
    };

    performLogout();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId); 
    };
  }, [logout, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

export default LogoutPage;
