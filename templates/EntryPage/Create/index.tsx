import { useState } from "react";
import Field from "@/components/Field";

type CreateProps = {};

const Create = ({}: CreateProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submit action

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Signup successful, user ID:', data.userId);
                // Redirect the user or update the state as needed
            } else {
                console.error('Signup failed');
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
                note="At least 12 characters"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
            />
            <button className="btn-gradient w-full" type="submit">
                Join Synapse
            </button>
            <div className="mt-4 text-center text-small text-n-4">
                By creating an account, you agree to our Terms of Service and
                Privacy & Cookie Statement.
            </div>
        </form>
    );
};


export default Create;