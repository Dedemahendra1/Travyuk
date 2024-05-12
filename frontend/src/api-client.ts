import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export  const register = async (formdata: RegisterFormData) => {
    const response =  await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type' : 'application/json',},
        body: JSON.stringify(formdata)
    })

    const responseBody = await response.json()

    if(!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signIn = async (formdata: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  })

  const body = await response.json();
  if(!response.ok) {
    throw new Error(body.message)
  }
  return body;
}

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if(!response.ok) {
    throw new Error("Error During Sign Out")
  }
}


export const createHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/add-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};
