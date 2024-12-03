'use client'

import Footer from "@components/page-structure/Footer"
import Header from "@components/page-structure/Header"
import Notifications from "@components/page-structure/Notifications"
import PageStatic from "@components/page-structure/PageStatic"
import CookieConsent from "@components/page-structure/notifications/CookieConsent"
import ThemeSwitcher from "@components/ui/ThemeSwitcher"
import ButtonPrimaryMedium from "@components/ui/inputs/buttons/ButtonPrimaryMedium"
import Paragraph from "@components/ui/text/Paragraph"
import TitleExtraLarge from "@components/ui/text/TitleExtraLarge"
import TitleSmall from "@components/ui/text/TitleSmall"
import { IconArrowRight } from "@tabler/icons-react"

// export async function generateMetadata () {
//     return {
//         title: "Privacy Policy - Palette maker",
//         description: "Find out how your data is handled while using our platform",
//     }
// }

const PrivacyPolicyPage = () => {
    return (
        <>
            <Header>
                <ThemeSwitcher/>
                <ButtonPrimaryMedium href="/create" Icon={IconArrowRight}>
                    Create
                </ButtonPrimaryMedium>
            </Header>
            <PageStatic>
                <div>
                    <TitleExtraLarge className='mb-8'>Privacy Policy</TitleExtraLarge>
                    <TitleSmall className='pb-2'>Use of Cookies</TitleSmall>
                    <Paragraph className='pb-8'>PaletteMaker uses cookies to enhance your experience and gather analytics about how our tool is used. By using our website, you consent to the use of cookies in accordance with this policy.</Paragraph>

                    <TitleSmall className='pb-2'>What are Cookies?</TitleSmall>
                    <Paragraph className='pb-8'>Cookies are small text files that are stored on your device when you visit a website. They help websites recognize your device and store information about your preferences or past actions.</Paragraph>

                    <TitleSmall className='pb-2'>How We Use Cookies</TitleSmall>
                    <Paragraph className='pb-8'>PaletteMaker uses Google Analytics cookies for the following purposes:</Paragraph>

                    <TitleSmall className='pb-2'>Analytics and Statistics: </TitleSmall>
                    <Paragraph className='pb-8'>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This information helps us improve the website and tailor it to the needs of our users.</Paragraph>
                    <TitleSmall className='pb-2'>Types of Cookies Used</TitleSmall>
                    <div className='sm:pl-8 pt-4'>
                        <TitleSmall className='pb-2'>Google Analytics Cookies:</TitleSmall>
                        <Paragraph className='pb-8'>These cookies collect information about your use of our website, including your IP address, the pages you visit, the time spent on each page, and the links you click on. This information is aggregated and anonymized, meaning it does not personally identify you.</Paragraph>
                    </div>
                    <TitleSmall className='pb-2'>Managing Cookies</TitleSmall>
                    <Paragraph className='pb-8'>You can manage and control the use of cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. Please note that disabling cookies may affect the functionality and your experience of our website.</Paragraph>

                    <TitleSmall className='pb-2'>Changes to This Policy</TitleSmall>
                    <Paragraph className='pb-8'>We may update our use of cookies and this policy from time to time. Any changes will be posted on this page, and the date at the top of the policy will be updated.</Paragraph>

                    <TitleSmall className='pb-2'>Contact Us</TitleSmall>
                    <Paragraph className='pb-8'>If you have any questions about our use of cookies, please contact us at palettemaker.io@gmail.com.</Paragraph>
                </div>
            </PageStatic>
            <Footer/>
            
            <Notifications>
                <CookieConsent/>
            </Notifications>
        </>
    )
}
export default PrivacyPolicyPage
