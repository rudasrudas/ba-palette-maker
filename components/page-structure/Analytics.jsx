"use client"

import { useConsent } from "@context/ConsentContext"
import { useEffect } from "react"

const Analytics = () => {

    const { hasConsent } = useConsent()

    useEffect(() => {
        if (hasConsent) {
        // Load GA4 script if user consented
        const script = document.createElement('script')
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4M4SV9BEJH'
        script.async = true;
        document.body.appendChild(script)

        const script2 = document.createElement('script')
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4M4SV9BEJH');
        `
        document.body.appendChild(script2)
        }
    }, [hasConsent])
}
export default Analytics