import "server-only";
import { AuthResponse, LoginData } from "../types";

export async function authorizeUser({ username, password }: LoginData): Promise<AuthResponse> {
	const { AUTH_URI } = process.env;
	try {
		const response = await fetch(`${AUTH_URI}/token`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				username, password
			}),
		});

		console.log(response.status)

		switch (response.status) {
			case 401:
				throw new Error("AUTH_FAILED");
			case 500:
				throw new Error("API_ERROR");
			case 200:
				return { success: true, result: await response.json() };
			default:
				throw new Error("UNEXPECTED_ERROR");
		}
	} catch (error: any) {
		switch (error.message) {
			case "AUTH_FAILED":
				return { success: false, message: "Brugernavn eller adgangskode er forkert. Skriv dog for helvede korrekt, din nød!" };
			case "API_ERROR":
				return { success: false, message: "Noget gik galt. Prøv igen om en måned." };
			default:
				return { success: false, message: "Noget uventet gak galt. Prøv at slukke din computer og tænd den igen." };
		}
	}
}