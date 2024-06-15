"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";

import { redirectToPlanner } from "../actions";

import { PrevEducationSelection } from "@/components/onboarding/previousEducationSelection";
import { NonPolyOnboarding } from "@/components/onboarding/nonPolyOnboarding";
import { PolyOnboarding } from "@/components/onboarding/polyOnboarding";
import { POLY_INSTITUDE_TAG } from "@/utils/feconst";

export default function OnboardingPage() {
  // const [eduInstitue, setEduInstitude] = useState(null);
  // const [mathPrereq, setMathPrereq] = useState(null);
  // const [prevPoly, setPrevPoly] = useState(null);
  // const [prevPolyCourse, setPrevPolyCourse] = useState(null);
  const [ready, setReady] = useState(false);
  const [onboarding, setOnboarding] = useState({ eduBackground: null });

  let onSubmit = () => {
    fetch("/api/onboarding/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(JSON.stringify(data))
        // console.log(btoa(JSON.stringify(data)))
        localStorage.setItem("data", btoa(JSON.stringify(data)));
        redirectToPlanner();
      });
  };

  return onboarding.eduBackground == null ? (
    <PrevEducationSelection
      onboarding={onboarding}
      setOnboarding={setOnboarding}
    />
  ) : (
    <>
      {onboarding.eduBackground == POLY_INSTITUDE_TAG ? (
        <PolyOnboarding
          onboarding={onboarding}
          setOnboarding={setOnboarding}
          setReady={setReady}
        />
      ) : (
        <NonPolyOnboarding
          onboarding={onboarding}
          setOnboarding={setOnboarding}
          setReady={setReady}
        />
      )}
      {onboarding.eduBackground != null ? (
        <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10 ">
          <Button
            className="text-white w-2/5"
            color="success"
            isDisabled={!ready}
            size="lg"
            variant="shadow"
            onPress={onSubmit}
          >
            Submit
          </Button>
        </section>
      ) : null}
    </>
  );
}
