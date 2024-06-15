"use server";

import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";

export async function redirectToPlanner() {
  redirect(siteConfig.links.planner);
}
