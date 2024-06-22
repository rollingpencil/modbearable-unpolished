export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ModBearable",
  description: "Ease your university course planning",
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
