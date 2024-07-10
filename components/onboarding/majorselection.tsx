import { PressEvent } from "@react-types/shared";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { subtitle } from "../primitives";

import { InputElement, OnboardingComponentProps } from "@/types";

export const PrevEducationSelection = ({
  onboarding,
  setOnboarding,
}: OnboardingComponentProps) => {
  let [instituteList, setInstituteList] = useState<Institute[]>([]);
  let setPrevEdu = (e: PressEvent) => {
    setOnboarding({
      ...onboarding,
      eduBackground: (e.target as InputElement).value,
    });
  };

  useEffect(() => {
    fetch("/api/onboarding/institute/")
      .then((res) => res.json())
      .then((data) => {
        setInstituteList(data.institutues);
      });
  }, []);

  return (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>What is your major?</h1>
      </div>

      <div className="flex gap-10 w-4/5">
        <ButtonGroup>
          {instituteList.map((inst) => (
            <Button
              key={inst.instituteid}
              className="w-100"
              color="primary"
              fullWidth={true}
              size="lg"
              value={inst.instituteid}
              variant="shadow"
              onPress={setPrevEdu}
            >
              {inst.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </section>
  );
};

type Institute = {
  instituteid: string;
  name: string;
};
