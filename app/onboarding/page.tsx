"use client";

import { useState } from "react";

import { PrevEducationSelection } from "@/components/onboarding/previousEducationSelection";
import { OBPrevEducation } from "@/utils/enum";
import { NonPolyOnboarding } from "@/components/onboarding/nonPolyOnboarding";
import { PolyOnboarding } from "@/components/onboarding/polyOnboarding";
import { Button } from "@nextui-org/button";

export default function OnboardingPage() {
  // const [eduInstitue, setEduInstitude] = useState(null);
  // const [mathPrereq, setMathPrereq] = useState(null);
  // const [prevPoly, setPrevPoly] = useState(null);
  // const [prevPolyCourse, setPrevPolyCourse] = useState(null);
  const [ready, setReady] = useState(false)
  const [onboarding, setOnboarding] = useState({ eduBackground: null })

  return onboarding.eduBackground == null ? (
    <PrevEducationSelection
      onboarding={onboarding}
      setOnboarding={setOnboarding}
    />
  ) : (
  <>
    {onboarding.eduBackground == OBPrevEducation.poly ? (
      <PolyOnboarding onboarding={onboarding} setOnboarding={setOnboarding} setReady={setReady}/>
    ) : (
      <NonPolyOnboarding onboarding={onboarding} setOnboarding={setOnboarding}  setReady={setReady}/>
    )}
    {
      onboarding.eduBackground != null ? (
        <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10 ">
          <Button
          isDisabled={!ready}
          color="success"
          size="lg"
          variant="shadow"
          className="text-white w-2/5"
        >
          Submit
        </Button>
      </section>
      ) : null
    }
  </>
  );
}
