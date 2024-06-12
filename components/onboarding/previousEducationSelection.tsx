import { Button, ButtonGroup } from "@nextui-org/react";

import { OBPrevEducation } from "../../utils/enum";
import { subtitle } from "../primitives";

export const PrevEducationSelection = ({ onboarding, setOnboarding }) => {
  let setPrevEdu = (e) => {
    setOnboarding({ ...onboarding, eduBackground: e.target.value });
  };

  return (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>What is your education background?</h1>
      </div>

      <div className="flex gap-10 w-2/5">
        <ButtonGroup>
          <Button
            color="primary"
            fullWidth={true}
            size="lg"
            value={OBPrevEducation.jc}
            variant="shadow"
            onPress={setPrevEdu}
          >
            Junior College
          </Button>
          <Button
            className="text-white min-w-100"
            color="primary"
            fullWidth={true}
            size="lg"
            value={OBPrevEducation.ib}
            variant="shadow"
            onPress={setPrevEdu}
          >
            Intl Baccalaureate
          </Button>
          <Button
            className="text-white"
            color="primary"
            fullWidth={true}
            size="lg"
            value={OBPrevEducation.poly}
            variant="shadow"
            onPress={setPrevEdu}
          >
            Diploma
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
};
