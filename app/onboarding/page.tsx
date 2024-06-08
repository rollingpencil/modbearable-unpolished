'use client'
import { subtitle } from "@/components/primitives";
import { OBPrevEducation } from "@/utils/enum";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";

export default function OnboardingPage() {
  
  const [eduInstitue, setEduInstitude] = useState(null)

  let setPrevEdu = (e) => {
    setEduInstitude(e.target.value)
  }

  return (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()} >What is your education background?</h1>
      </div>

      <div className="flex gap-10 w-2/5">
      <ButtonGroup>
        <Button
          size="lg"
          color="primary"
          variant="shadow"
          isBlock={true}
          fullWidth={true}
          value={OBPrevEducation.jc}
          onPress={setPrevEdu}
        >
          Junior College
        </Button>
        <Button
          size="lg"
          color="primary"
          className="text-white min-w-100"
          variant="shadow"
          isBlock={true}
          fullWidth={true}
          value={OBPrevEducation.ib}
          onPress={setPrevEdu}
        >
          Intl Baccalaureate 
        </Button>
        <Button
          size="lg"
          color="primary"
          className="text-white"
          variant="shadow"
          isBlock={true}
          fullWidth={true}
          value={OBPrevEducation.poly}
          onPress={setPrevEdu}
        >
          Diploma
        </Button>
      </ButtonGroup>
      </div>
    </section>
  );
}
