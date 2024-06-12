"use client";

import { useState } from "react";

import { PrevEducationSelection } from "@/components/onboarding/previousEducationSelection";
import { OBPrevEducation } from "@/utils/enum";
import { NonPolyOnboarding } from "@/components/onboarding/nonPolyOnboarding";

export default function OnboardingPage() {
  // const [eduInstitue, setEduInstitude] = useState(null);
  // const [mathPrereq, setMathPrereq] = useState(null);
  // const [prevPoly, setPrevPoly] = useState(null);
  // const [prevPolyCourse, setPrevPolyCourse] = useState(null);
  const [onboarding, setOnboarding] = useState({ eduBackground: null });

  return onboarding.eduBackground == null ? (
    <PrevEducationSelection
      onboarding={onboarding}
      setOnboarding={setOnboarding}
    />
  ) : onboarding.eduBackground == OBPrevEducation.poly ? (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      Testing
    </section>
  ) : (
    <NonPolyOnboarding
      onboarding={onboarding}
      setOnboarding={setOnboarding}
    />
  )

}
