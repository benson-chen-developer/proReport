import { User } from "../Types/User";

type AuthResponse = {
    email: string;
    token: string;
};

export const registerUser = async (
    email: string,
    password: string
): Promise<User | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            console.error("Registration failed");
            return null;
        }

        const user = await res.json();
        return user;
    } catch (err) {
        console.error("Error registering user:", err);
        return null;
    }
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        const data = await res.json();
        return {
            email: data.email,
            token: data.token,
        };
    } catch (err) {
        throw new Error("Login failed");
    }
};
