import { Button, ButtonGroup } from "@nextui-org/react";

import { OBPrevEducation } from "../../utils/enum";
import { subtitle } from "../primitives";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const NonPolyOnboarding = ({ onboarding, setOnboarding }) => {
  let setMathPrereq = (e) => {
    console.log(e.target.value)
    setOnboarding({ ...onboarding, mathPrereq: e.target.value ? true : false });
  };

  let onBack = () => {
    setOnboarding({ eduBackground: null });
  }

  return (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      <Button
        color="primary"
        size="md"
        variant="shadow"
        isIconOnly
        onPress={onBack}
      >
        <ArrowLeftOutlined /> 
      </Button>
      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>Did you take H2 Mathematics in JC/ Higher Mathematics in IB?</h1>
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
            value={OBPrevEducation.ib}
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
