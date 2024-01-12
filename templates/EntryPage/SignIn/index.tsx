import { useState } from "react";
import Field from "@/components/Field";

type SignInProps = {};

const SignIn = ({}: SignInProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submit action
    
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful, token:', data.token);
                localStorage.setItem('token', data.token); // Store the token
                window.location.href = '/dashboard'; // Redirect the user to the dashboard
            } else {
                console.error('Login failed');
                // Handle errors, show messages to the user as needed
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle errors, show messages to the user as needed
        }
    };
    

    return (
        <form action="" onSubmit={handleSubmit}>
            <Field
                className="mb-3.5"
                label="Email"
                placeholder="Enter email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
            />
            <Field
                className="mb-8"
                label="Password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
            />
            <button className="btn-gradient w-full" type="submit">
                Sign in
            </button>
        </form>
    );
};

export default SignIn;