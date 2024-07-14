import { useState } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const res_data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(res_data.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(res_data));

      //   update the auth context
      dispatch({ type: "LOGIN", payload: res_data });

      // update loading state
      setIsLoading(false);
    }
  };

  return { signin, error, isLoading };
};
