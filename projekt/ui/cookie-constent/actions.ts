"use server";

import { Consent } from "@/lib/types";
import { cookies } from "next/headers";

export async function setCookieConsent(consent: Consent) {
	const cookieStore = await cookies();

	cookieStore.set({
		name: "COOKIE_CONSENT",
		value: JSON.stringify(consent),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 365
	});
}

export async function hasCookieConsent(): Promise<boolean> {
	const cookieStore = await cookies();
	return !cookieStore.has("COOKIE_CONSENT");
}