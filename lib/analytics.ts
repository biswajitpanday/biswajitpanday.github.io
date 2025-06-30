// Google Analytics tracking utilities

declare const gtag: (
  command: 'config' | 'event' | 'consent',
  targetId: string,
  config?: Record<string, unknown>
) => void;

export const GA_MEASUREMENT_ID = 'G-JG3RM88C15';

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track specific portfolio events
export const trackPortfolioEvent = (eventName: string, projectName?: string) => {
  trackEvent(eventName, 'Portfolio', projectName);
};

// Track certification events
export const trackCertificationEvent = (eventName: string, certificationName?: string) => {
  trackEvent(eventName, 'Certifications', certificationName);
};

// Track contact form events
export const trackContactEvent = (eventName: string, formType?: string) => {
  trackEvent(eventName, 'Contact', formType);
};

// Track file downloads
export const trackDownload = (fileName: string) => {
  trackEvent('download', 'File', fileName);
};

// Track outbound link clicks
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('click', 'Outbound Link', linkText || url);
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'Social Media', platform);
}; 