import { PressEvent } from "@react-types/shared";
import { Button, ButtonGroup } from "@nextui-org/react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";

import { subtitle } from "../primitives";

import { InputElement, OnboardingComponentProps } from "@/types";

export const NonPolyOnboarding = ({
  onboarding,
  setOnboarding,
  setReady,
}: OnboardingComponentProps) => {
  let setMathPrereq = (e: PressEvent) => {
    setOnboarding({
      ...onboarding,
      mathPrereq: (e.target as InputElement).value ? true : false,
    });
  };

  let onBack = () => {
    setOnboarding({ eduBackground: undefined });
    setReady(false);
  };

  // Check if all the data are all valid and set ready to sent to backend.
  useEffect(() => {
    setReady(
      onboarding.eduBackground != undefined &&
        onboarding.mathPrereq != undefined &&
        onboarding.major != undefined &&
        onboarding.cohort != undefined &&
        onboarding.qet != undefined,
    );
  }, [onboarding]);

  return (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      <Button
        isIconOnly
        color="primary"
        size="md"
        variant="shadow"
        onPress={onBack}
      >
        <ArrowLeftOutlined />
      </Button>
      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>
          Did you take H2 Mathematics in JC/ Higher Mathematics in IB?
        </h1>
      </div>

      <div className="flex gap-10 w-2/5">
        <ButtonGroup>
          <Button
            color="primary"
            fullWidth={true}
            size="lg"
            value={1}
            variant="shadow"
            onPress={setMathPrereq}
          >
            Yes
          </Button>
          <Button
            className="text-white min-w-100"
            color="primary"
            fullWidth={true}
            size="lg"
            value={0}
            variant="shadow"
            onPress={setMathPrereq}
          >
            No
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
};
