import posthog from "posthog-js";

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  posthog.init("phc_nTX2BAUdpVwqpX8KPysMpnM5595HDtoF3uAjoS4qsGyi", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
  });
  initialized = true;
}

export function identifyUser(email: string | null | undefined) {
  if (!initialized) return;
  if (email) {
    posthog.identify(email, { email });
  } else {
    posthog.reset();
  }
}

export function track(event: string, props?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(event, props);
}