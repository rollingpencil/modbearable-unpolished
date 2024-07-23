import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Onboarding = {
  eduBackground: string | undefined;
  mathPrereq?: boolean | undefined;
  poly?: string | undefined;
  diploma?: string | undefined;
  major?: number | undefined;
  cohort?: number | undefined;
  qet?: number | undefined;
};

export interface OnboardingComponentProps {
  onboarding: Onboarding;
  setOnboarding: (onboarding: Onboarding) => void;
  setReady: (val: boolean) => void;
}

export interface InputElement extends Element {
  value: string;
}

export type PlannerCourseType = {
  code: string;
  name: string;
  courseType: string;
  credits: number;
  exempted: boolean;
  wildcard: boolean;
};

export type PlannerUserScheduleSemesterType = {
  order: number;
  name: string;
  courses: string[];
  mark_complete: boolean;
}

export type PlanarDataType = {
  major: string;
  total_cu: number;
  exempted_math: true;
  base_requirements: PlannerCourseType[];
  non_base_exemptions: PlannerCourseType[];
  user_defined_courses: PlannerCourseType[];
  user_schedule: PlannerUserScheduleSemesterType[];
}

export type Course = {
  code: string;
  name: string;
  credits: number;
  exempted: boolean;
  wildcard: boolean;
  courseType: string;
  add_prerequisites: string[];
  take_together: string[];
  prerequisites: any;
  semestersOffered: number[];
  fulfillRequirements: string[];
}

export type JSONData = {
  base_requirements: Course[];
  non_base_exemptions: Course[];
  user_defined_courses: Course[];
  cohort: string;
}

export type OutputCourse = {
  code: string;
  name: string;
  credits: number;
  courseType: string;
  prerequisites: any;
  semestersOffered: number[];
  fulfillRequirements: string[];
}