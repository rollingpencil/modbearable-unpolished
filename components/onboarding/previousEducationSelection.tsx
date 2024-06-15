import { Button, ButtonGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { subtitle } from "../primitives";

export const PrevEducationSelection = ({ onboarding, setOnboarding }) => {
  let [instituteList, setInstituteList] = useState([]);
  let setPrevEdu = (e) => {
    setOnboarding({ ...onboarding, eduBackground: e.target.value });
  };

  useEffect(() => {
    fetch("/api/onboarding/institute/")
      .then((res) => res.json())
      .then((data) => {
        setInstituteList(data.institutues);
        console.log(data);
      });
  }, []);

  return (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>What is your education background?</h1>
      </div>

      <div className="flex gap-10 w-4/5">
        <ButtonGroup>
          {instituteList.map((inst, key) => (
            <Button
              key={inst.instituteid}
              color="primary"
              fullWidth={true}
              size="lg"
              value={inst.instituteid}
              variant="shadow"
              onPress={setPrevEdu}
              className="w-100"
            >
              {inst.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </section>
  );
};
