const userTokenKey = "CashGuard__UserToken"; // Local Storage Key

// Handle login
export const handleLogin = async (
  formData: { email: string; password: string },
  onLogin: () => void,
  navigate: (path: string) => void
) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login error");

    setToken(data.token);
    onLogin();
    navigate("/");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Token methods
export const setToken = (token: string) => {
  localStorage.setItem(userTokenKey, token);
};

export const getToken = () => {
  return localStorage.getItem(userTokenKey);
};

export const removeToken = () => {
  localStorage.removeItem(userTokenKey);
};

export const checkIfLoggedIn = () => {
  return !!getToken();
};
