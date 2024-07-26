import { createContext, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Prerequisites = {
    or?: (string | Prerequisites)[];
    and?: (string | Prerequisites)[];
}
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
  find(arg0: (c: any) => boolean): unknown;
  forEach(arg0: (course: any) => void): unknown;
  code: string;
  name: string;
  courseType: string;
  credits: number;
  exempted: boolean;
  wildcard: boolean;
  creditable?: boolean;
  add_prerequisites: string[];
  take_together: string[];
  prerequisites?: any | null;
  semestersOffered?: number[];
  fulfillRequirements?: string[];
  department?: string;  
  dependencies?: string[][];  
  classNumber?: string;
};

export type PlannerUserScheduleSemesterType = {
  order: number;
  name: string;
  courses: string[];
  mark_complete: boolean;
};

export type PlanarDataType = {
  forEach(arg0: (course: any) => void): unknown;
  find(arg0: (c: any) => boolean): unknown;
  major: string;
  cohort: string;
  total_cu: number;
  exempted_math: true;
  base_requirements: PlannerCourseType[];
  non_base_exemptions: PlannerCourseType[];
  user_defined_courses: PlannerCourseType[];
  user_schedule: PlannerUserScheduleSemesterType[];
};

export type RetrieveSpecificModsType = {
  prereqTree: any | null;
  semesterData: { semester: number; timetable: any }[];
  fulfillRequirements: string[];
};

export const CourseErrorContext = createContext(new Map<string, string[]>());
