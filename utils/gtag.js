export const GA_TRACKING_ID = 'G-4M4SV9BEJH'

export function pageview (url) {
    if(!window.gtag) return
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

export function event ({ action, category, label, value }) {
    if(!window.gtag) return
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};