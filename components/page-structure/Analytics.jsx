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

            // Load Clarity script if user consented
            const script3 = document.createElement('script')
            script3.innerHTML = `
                (function(c,l,a,r,i,t,y){
                    c[a]=
                        c[a]||
                        function(){
                            (c[a].q=c[a].q||[]).push(arguments);
                        };
                    t=l.createElement(r);
                    t.async=1;
                    t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];
                    y.parentNode.insertBefore(t,y);
                })(window,document,"clarity","script","qq3lmtcica");
            `
            document.body.appendChild(script3)
        }
    }, [hasConsent])
}
export default Analytics