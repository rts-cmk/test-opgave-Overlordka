"use client";

import { useEffect, useRef } from "react";
import { setCookieConsent } from "../actions";

type BannerProps = {
	showBanner: boolean;
}

export default function CookieBanner({ showBanner = false }: BannerProps) {
	const bannerRef = useRef<HTMLDialogElement>(null);

	async function handleAcceptAll() {
		await setCookieConsent({
			essential: true,
			analytics: true,
			consent: true
		});
		
		bannerRef.current?.close();
	}

	async function handleRejectAll() {
		await setCookieConsent({
			essential: true,
			analytics: false,
			consent: true,
		});
		bannerRef.current?.close();
	}


	async function handleSaveCookie() {
	}

	useEffect(function () {
		
		if (showBanner) {
			bannerRef.current?.showModal();
		}
		if (!showBanner) {
			bannerRef.current?.close();
		}
	}, [showBanner]);

	return (
		<>
			<dialog ref={bannerRef} className="hidden open:grid grid-cols-12 fixed top-auto bottom-0 left-0 right-0 m-0 w-full max-w-none px-32 py-4">
				<div className="col-span-8">
					<h2 className="text-2xl font-bold">Cookies</h2>
					<p>
						Vi bruger egne cookies samt cookies fra tredjepart til statistik,
						optimering, præferencer, markedsføring og målrettet indhold.
						Information kan blive delt med tredjepart. DSB behandler information
						fra cookies samt de data du indtaster, oplyser og tidligere har oplyst.
						Ved at klikke "Acceptér alle" giver du samtykke til cookies og behandling
						af persondata. Brug ikonet i nederste venstre hjørne for at ændre det.
					</p>
				</div>
				<div className="flex flex-col col-span-3 col-start-11 col-end-13 gap-2">
					<button className="bg-black text-white py-2" onClick={handleAcceptAll}>Accepter alle</button>
					<button className="bg-black text-white py-2" onClick={handleRejectAll}>Afvis alle</button>
					<button className="border py-2" command="show-modal" commandFor="cookie-settings">Cookie indstillinger</button>
				</div>
			</dialog>

		</>
	);
}