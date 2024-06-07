export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Onboarding",
      href: "/onboarding",
    },
    {
      label: "Planner",
      href: "/planner",
    },
  ],
  navMenuItems: [
    {
      label: "Onboarding",
      href: "/onboarding",
    },
    {
      label: "Planner",
      href: "/planner",
    },
  ],
  links: {
    onboard: "onboarding",
    planner: "planner",
  },
};
