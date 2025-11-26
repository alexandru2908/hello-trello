This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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
