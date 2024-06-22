import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Onboarding = {
  eduBackground: string | undefined;
  mathPrereq?: boolean | undefined;
  poly?: string | undefined;
  diploma?: string | undefined;
};

export interface OnboardingComponentProps {
  onboarding: Onboarding;
  setOnboarding: (onboarding: Onboarding) => void;
  setReady: (val: boolean) => void;
}

export interface InputElement extends Element {
  value: string;
}
