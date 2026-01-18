# App link
https://hello-trello-alexandru2908s-projects.vercel.app/

## Analytics and Metrics

We have integrated **PostHog** into our application to collect usage metrics and analytics.

### Why PostHog?

We chose PostHog for the following reasons:
1.  **Open Source & Privacy-Friendly**: PostHog is open-source and can be self-hosted, giving us full control over our data and ensuring user privacy.
2.  **All-in-One Platform**: It combines product analytics, session recording, feature flags, and A/B testing in a single tool, reducing the need for multiple integrations.
3.  **Next.js Integration**: It has excellent support for Next.js with a dedicated library (`posthog-js`), making integration seamless.
4.  **Event-Based Tracking**: It allows for flexible, event-based tracking which is ideal for a dynamic app like a Trello clone where user interactions (creating boards, moving cards) are key.

### What Metrics Are We Collecting?

We are collecting the following key metrics:
*   **Page Views**: To understand which pages (boards, home) are most visited.
*   **User Actions**:
    *   **Board Creation/Deletion**: To track the growth of usage.
    *   **List Creation/Deletion**: To understand how users structure their boards.
    *   **Card Creation/Completion**: To measure user engagement and productivity.
*   **Session Duration**: To see how long users spend in the app.
*   **Feature Usage**: To track which features (e.g., renaming, deleting) are used most frequently.

### Why Collect These Metrics?

Collecting these metrics allows us to:
*   **Understand User Behavior**: See how users actually interact with the app versus how we designed it.
*   **Identify Pain Points**: High drop-off rates or short sessions might indicate usability issues.
*   **Measure Engagement**: Tracking the number of active boards and cards helps us gauge the "stickiness" of the app.
*   **Validate Features**: See if new features are actually being used.

### How Will We Use This Data for Business Decisions?

We plan to use this data to make informed decisions such as:
*   **Prioritizing Features**: If we see users creating many lists but few cards, we might focus on improving the list management experience. If card completion is low, we might investigate if the UI is confusing.
*   **Optimizing UX**: Session recordings can reveal where users get stuck, allowing us to streamline workflows.
*   **Retention Strategies**: By identifying "power users" (those with many boards/cards), we can understand what drives retention and try to replicate that for other users.
*   **Resource Allocation**: We can focus our development efforts on the most used parts of the application.
