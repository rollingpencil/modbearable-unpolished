import { PressEvent } from "@react-types/shared";
import { Button, ButtonGroup, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { subtitle } from "../primitives";

import { InputElement, OnboardingComponentProps } from "@/types";

type FacultyType = {
  facid: number;
  name: string;
};

type MajorType = {
  majorid: number;
  name: string;
};

type CohortType = {
  cohortid: number;
  name: string;
};

export const PrevEducationSelection = ({
  onboarding,
  setOnboarding,
}: OnboardingComponentProps) => {
  const [instituteList, setInstituteList] = useState<Institute[]>([]);
  const [faculty, setFaculty] = useState<number | null>(null);
  const [major, setMajor] = useState<number | null>(null);
  const [facultyList, setFacultyList] = useState<FacultyType[]>([]);
  const [majorList, setMajorList] = useState<MajorType[]>([]);
  const [cohortList, setCohortList] = useState<CohortType[]>([]);

  let setFacultySelection = (e: PressEvent) => {
    setFaculty(Number((e.target as InputElement).value));
  };

  let setMajorSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let majorVal = Number(e.target.value);

    setOnboarding({
      ...onboarding,
      major: majorVal,
    });
    setMajor(majorVal);
  };

  let setCohortSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOnboarding({
      ...onboarding,
      cohort: Number(e.target.value),
    });
  };

  let setPrevEduSelection = (e: PressEvent) => {
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

  useEffect(() => {
    fetch("/api/onboarding/faculty/")
      .then((res) => res.json())
      .then((data) => {
        setFacultyList(data.faculties);
      });
  }, []);

  useEffect(() => {
    if (faculty != null) {
      fetch(`/api/onboarding/faculty/${faculty}`)
        .then((res) => res.json())
        .then((data) => {
          setMajorList(data.majors);
        });
    }
  }, [faculty]);

  useEffect(() => {
    if (major != null) {
      fetch(`/api/onboarding/majors/${major}`)
        .then((res) => res.json())
        .then((data) => {
          setCohortList(data.cohorts);
        });
    }
  }, [major]);

  return (
    <section className="flex flex-col items-left justify-Left gap-4 py-8 px-8 md:py-10">
      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>Please select your faculty</h1>
      </div>

      <div className="flex gap-10 w-2/5">
        <ButtonGroup>
          {facultyList.map((f) => (
            <Button
              key={f.facid}
              color="primary"
              fullWidth={true}
              size="lg"
              value={f.facid}
              variant="shadow"
              onPress={setFacultySelection}
            >
              {f.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {faculty != null ? (
        <>
          <div className="inline-block max-w-lg text-left">
            <h1 className={subtitle()}>Please select your major</h1>
          </div>

          <div className="flex gap-10">
            <Select
              isRequired
              className="max-w-xs"
              color="primary"
              label="Select your major"
              placeholder="Bachelor..."
              size="lg"
              onChange={setMajorSelection}
            >
              {majorList.map((m) => (
                <SelectItem key={m.majorid}>{m.name}</SelectItem>
              ))}
            </Select>
          </div>
        </>
      ) : (
        <></>
      )}

      {major != null ? (
        <>
          <div className="inline-block max-w-lg text-left">
            <h1 className={subtitle()}>Please select your cohort</h1>
          </div>

          <div className="flex gap-10">
            <Select
              isRequired
              className="max-w-xs"
              color="primary"
              label="Select your cohort"
              placeholder=""
              size="lg"
              onChange={setCohortSelection}
            >
              {cohortList.map((c) => (
                <SelectItem key={c.cohortid}>{c.name}</SelectItem>
              ))}
            </Select>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="inline-block max-w-lg text-left">
        <h1 className={subtitle()}>What is your education background?</h1>
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
              onPress={setPrevEduSelection}
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
