"use client"

import { useEffect, useState } from "react"
import { hasCookieConsent } from "../actions"
import CookieBanner from "../cookie-banner"
import CookieSettings from "../cookie-settings"


export default function BannerController() {
    const [show, setShow] = useState(false)

    useEffect(function(){
        hasCookieConsent()
            .then(data => setShow(data))
    }, [])

    return (
        <>
            <CookieBanner showBanner={show} />
            <CookieSettings />
        </>
    )
}