"use client"

import { useRef } from "react"
import { setCookieConsent } from "../actions"
import Switch from "@/ui/switch"

export default function CookieSettings() {
    const dialogRef = useRef<HTMLDialogElement>(null)

    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault()
        await setCookieConsent({
            essential: true,
            analytics: event.target.analytics.checked,
            consent: true,
        })
        dialogRef.current?.close();
    }

    return (
        <dialog id="cookie-settings" className="hidden open:grid fixed inset-0 m-auto w-[500px] px-8 py-4">
            <div className="flex flex-col pb-4">
                <h2 className="text-2xl font-bold">Indstilinger for cookies</h2>
                <p>
                    Vi bruger egne cookies samt cookies fra tredjepart til statistik,
                    optimering, præferencer, markedsføring og målrettet indhold.
                    Information kan blive delt med tredjepart. DSB behandler information
                    fra cookies samt de data du indtaster, oplyser og tidligere har oplyst.
                    Ved at klikke "Acceptér alle" giver du samtykke til cookies og behandling
                    af persondata. Brug ikonet i nederste venstre hjørne for at ændre det.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <hr />
                <ul className="flex flex-col py-2 gap-4">
                    <li>
                        <Switch name="essential" label="Nødvendige" checked={true} disabled={true} />
                    </li>
                    <li>
				        <Switch name="analytics" label="Trafik og analytics" />
                    </li>
                </ul>
                <hr />
                <div className="flex gap-2 pt-4">
                    <button className="border py-2 px-4">Gem</button>
                    <button type="button" command="close" commandFor="cookie-settings">Luk</button>
                </div>
            </form>
        </dialog>
    )
}