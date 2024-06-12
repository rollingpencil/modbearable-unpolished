import { Button, ButtonGroup } from "@nextui-org/react";

import { OBPrevEducation, PolyEnum } from "../../utils/enum";
import { subtitle } from "../primitives";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";

export const NonPolyOnboarding = ({ onboarding, setOnboarding }) => {
  const [poly, setPoly] = useState(null)
  
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
        <h1 className={subtitle()}>Please select your polytechnic course</h1>
      </div>

      <div className="flex gap-10 w-2/5">
        <ButtonGroup>
          <Button
            color="primary"
            fullWidth={true}
            size="lg"
            value={PolyEnum.sp}
            variant="shadow"
            onPress={setMathPrereq}
          >
            SP
          </Button>
          <Button
            color="primary"
            fullWidth={true}
            size="lg"
            value={PolyEnum.sp}
            variant="shadow"
            onPress={setMathPrereq}
          >
            SP
          </Button>
          <Button
            color="primary"
            fullWidth={true}
            size="lg"
            value={PolyEnum.sp}
            variant="shadow"
            onPress={setMathPrereq}
          >
            SP
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
};
