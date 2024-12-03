import Footer from "@components/page-structure/Footer"
import HeroSection from "@components/landing/hero/HeroSection"
import PageStatic from "@components/page-structure/PageStatic"
import CallToActionSection from "@components/landing/last-cta/CallToActionSection"
import GenerationSection from "@components/landing/generation/GenerationSection"
import CustomizationSection from "@components/landing/customization/CustomizationSection"
import AccessibilitySection from "@components/landing/accessibility/AccessibilitySection"
import ExportingSection from "@components/landing/exporting/ExportingSection"
import Notifications from "@components/page-structure/Notifications"
import CookieConsent from "@components/page-structure/notifications/CookieConsent"
import HomePageHeader from "@components/landing/hero/HomePageHeader"

export const metadata = {
    title: "Color Palette Maker - Generate, perfect and export",
    description: "Free color tool ideal for web and graphic designers. Create palettes for Websites, Apps, Company branding and much more.",
}

const HomePage = () => {
    return (
        <>
            <HomePageHeader/>
            <PageStatic>
                <HeroSection/>
                <GenerationSection/>
                <CustomizationSection/>
                <AccessibilitySection/>
                <ExportingSection/>
                <CallToActionSection/>
            </PageStatic>
            <Footer/>
            
            <Notifications>
                <CookieConsent/>
            </Notifications>
        </>
    )
}

export default HomePage;