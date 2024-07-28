import { PressEvent } from "@react-types/shared";
import { Button, ButtonGroup, Select, SelectItem } from "@nextui-org/react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { subtitle } from "../primitives";

import { InputElement, OnboardingComponentProps } from "@/types";

export const PolyOnboarding = ({
  onboarding,
  setOnboarding,
  setReady,
}: OnboardingComponentProps) => {
  const [poly, setPoly] = useState<string | null>(null);
  const [polyList, setPolyList] = useState<PolyList[]>([]);
  const [diplomaList, setDiplomaList] = useState<DiplomaList[]>([]);

  let setPolySelection = (e: PressEvent) => {
    let ele = e.target as InputElement;

    setOnboarding({ ...onboarding, poly: ele.value });
    setPoly(ele.value);
  };

  let onBack = () => {
    setOnboarding({ eduBackground: undefined });
  };

  let setMathPrereq = (e: PressEvent) => {
    setOnboarding({
      ...onboarding,
      mathPrereq: (e.target as InputElement).value ? true : false,
    });
  };

  let setDiplomaSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOnboarding({ ...onboarding, diploma: e.target.value });
  };

  // Fetch list of polytechnics
  useEffect(() => {
    fetch("/api/onboarding/poly/")
      .then((res) => res.json())
      .then((data) => {
        setPolyList(data.poly);
      });
  }, [poly]);

  // Fetch list of polytechnic courses.
  useEffect(() => {
    if (poly != null) {
      fetch(`/api/onboarding/poly/${poly}`)
        .then((res) => res.json())
        .then((data) => {
          setDiplomaList(data.courses);
        });
    }
  }, [poly]);

  // Check if all the data are all valid and set ready to sent to backend.
  useEffect(() => {
    setReady(
      onboarding.eduBackground != undefined &&
        onboarding.mathPrereq != undefined &&
        onboarding.poly != undefined &&
        onboarding.diploma != undefined &&
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
        <h1 className={subtitle()}>Please select your polytechnic</h1>
      </div>

      <div className="flex gap-10 w-2/5">
        <ButtonGroup>
          {polyList.map((p) => (
            <Button
              key={p.id}
              color="primary"
              fullWidth={true}
              size="lg"
              value={p.id}
              variant="shadow"
              onPress={setPolySelection}
            >
              {p.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {poly != null ? (
        <>
          <div className="inline-block max-w-lg text-left">
            <h1 className={subtitle()}>Please select your diploma</h1>
          </div>

          <div className="flex gap-10">
            <Select
              isRequired
              className="max-w-xs"
              color="primary"
              label="Select your diploma"
              placeholder="Diploma in ..."
              size="lg"
              onChange={setDiplomaSelection}
            >
              {diplomaList.map((d) => (
                <SelectItem key={d.dipid}>{d.name}</SelectItem>
              ))}
            </Select>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>
          Did you have a recognised certification for math/ Pass the exemption
          test for MA1301?
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

type PolyList = {
  id: string;
  name: string;
};

type DiplomaList = {
  dipid: string;
  name: string;
};
