"use client";

import { useActionState, useEffect } from "react";
import loginAction from "./action";
import { LoginFormState } from "@/lib/types";
import InputField from "@/ui/input-field";
import { useSearchParams } from "next/navigation";

const initialState: LoginFormState = {
	data: {
		username: "",
		password: "",
	},
};

export default function LoginForm() {
    const searchParams = useSearchParams()
    if (searchParams.has("message")) {
        initialState.error = {
            general: {
                errors: [searchParams.get("message")!]
            }
        }
    }
	const [formState, formAction, pending] = useActionState<LoginFormState, FormData>(loginAction, initialState);

	useEffect(() => console.log(formState), [formState]);

	return (
		<form action={formAction}>
			<InputField type="text" name="username" label="Brugernavn" value={formState.data?.username} status={formState.error?.username?.errors} />
			<InputField type="password" name="password" label="Adgangskode" value={formState.data?.password} status={formState.error?.password?.errors} />
            {formState.error?.general && (
                <p>
                    {formState.error.general.errors.map((message, index) => (
                        <span key={message + index} className="text-red-500">{message}</span>
                    ))}
                </p>
            )}
			<button
				type="submit"
				disabled={pending}
				className={`border bg-blue-900 text-white px-4 py-2 rounded-md disabled:cursor-not-allowed cursor-pointer disabled:bg-gray-300 disabled:text-black transition-bg transition-text duration-200`}
			>
				Log ind
			</button>
		</form>
	);
}