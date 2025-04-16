import React, { useState, useEffect } from "react";

const ConsentBanner = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const savedConsent = localStorage.getItem("google_analytics_consent");
    if (savedConsent === "true") {
      setConsentGiven(true);
      initializeAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("google_analytics_consent", "true");
    setConsentGiven(true);
    initializeAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem("google_analytics_consent", "false");
    setConsentGiven(false);
  };

  const initializeAnalytics = () => {
    // Inject the Google Analytics script dynamically
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-Q27F9Z8SWY`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      // Ensure IP anonymization with the updated config
      gtag("config", "G-Q27F9Z8SWY", { anonymize_ip: true });
    };
  };

  if (consentGiven) return null; // Hide the banner once consent is given

  return (
    <div className="consent-banner">
      <p>
        We use cookies to improve your experience and for analytics purposes. By
        clicking "Accept", you consent to the use of Google Analytics.
      </p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleDecline}>Decline</button>
    </div>
  );
};

export default ConsentBanner;
