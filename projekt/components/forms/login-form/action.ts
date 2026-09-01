"use server";

import { authorizeUser } from "@/lib/dal/token";
import { AuthResponse, LoginData, LoginFormState } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const loginSchema = z.object({
	username: z.string().min(4, "Dit brugernavn skal være større end 3 tegn"),
	password: z.string().min(4, "Din adgangskode skal være større end 3 tegn"),
});

export async function createTokenCookie(response: AuthResponse) {
	if (!response.success) return;
	const cookieStore = await cookies();

	cookieStore.set("FD_AUTH_TOKEN", response.result.token,
		{
			expires: new Date(response.result.validUntil),
			httpOnly: true,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		}
	);
}

export default async function loginAction(previousState: LoginFormState, formData: FormData) {
	const { username, password } = Object.fromEntries(formData) as LoginData;

	const validated = loginSchema.safeParse({ username, password });

	if (!validated.success) return {
		data: {
			username: username,
			password: password,
		},
		error: z.treeifyError(validated.error).properties,
	};

	const isUserAuthorized = await authorizeUser({ username: validated.data.username, password: validated.data.password });

	if (!isUserAuthorized.success) return {
        data:{
            username: validated.data.username,
            password: validated.data.password,
        },
		error: {
			general: {
				errors: [isUserAuthorized.message]
			}
		}
	}

	await createTokenCookie(isUserAuthorized);
	redirect("/dashboard");
}