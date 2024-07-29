import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PlusOutlined } from "@ant-design/icons";
import Autosuggest from "react-autosuggest";

import {
  PlanarDataType,
  PlannerCourseType,
  PlannerUserScheduleSemesterType,
} from "@/types";
import { retrieveSpecificMods, searchModules } from "@/utils/nusmods-client";

type AddCourseModalProps = {
  data: PlanarDataType;
  setData: Function;
  setUpToDate: Function;
};

export const AddCourseModal = ({
  data,
  setData,
  setUpToDate,
}: AddCourseModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [courseCode, setCourseCode] = useState<string | undefined>(undefined);
  const [sem, setSem] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [courseSuggestions, setCourseSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (courseCode) {
      searchModules(data.cohort, courseCode).then((results) => {
        setCourseSuggestions(
          results.map((mod) => ({
            moduleCode: mod.moduleCode,
            title: mod.title,
          })),
        );
      });
    } else {
      setCourseSuggestions([]);
    }
  }, [courseCode, data.cohort]);

  const handleAddCourse = () => {
    if (courseCode != undefined && sem != undefined) {
      const courseInfoPromise = retrieveSpecificMods(
        data.cohort,
        courseCode,
        false,
      );

      if (
        data.base_requirements.filter((c) => c.code == courseCode).length +
          data.user_defined_courses.filter((c) => c.code == courseCode).length +
          data.non_base_exemptions.filter((c) => c.code == courseCode).length >
        0
      ) {
        setErrorMessage(`Duplicate Course Code: ${courseCode}`);
      } else {
        Promise.all([courseInfoPromise])
          .then((rawdata: Array<any>) => {
            setErrorMessage(null);
            const courseInfo = rawdata[0];

            let newCourseData: PlannerCourseType = {
              code: courseCode,
              name: courseInfo.title,
              courseType: courseCode.startsWith("GE") ? "GE" : "Others",
              credits: Number(courseInfo.moduleCredit),
              exempted: false,
              wildcard: false,
              add_prerequisites: [],
              take_together: [],
            };

            let modified_user_defined_courses = data.user_defined_courses;

            modified_user_defined_courses.push(newCourseData);

            let updated_user_schedule: PlannerUserScheduleSemesterType[] =
              data.user_schedule;

            updated_user_schedule.forEach((semData, index, us) => {
              if (semData.order == sem) {
                semData.courses.push(courseCode);
                updated_user_schedule.splice(index, 1, semData);
              }
            });

            setData({
              ...data,
              user_defined_courses: modified_user_defined_courses,
              user_schedule: updated_user_schedule,
            });
            setUpToDate(false);
            setCourseCode(undefined);
            setSem(undefined);
            onClose();
          })
          .catch(() => {
            setErrorMessage("Please enter a valid course code");
          });
      }
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.moduleCode;
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.moduleCode} - {suggestion.title}
    </div>
  );

  const inputProps = {
    placeholder: "CS1231S",
    value: courseCode || "",
    onChange: (event, { newValue }) => {
      setCourseCode(newValue);
    },
    required: true,
  };

  return (
    <>
      <Button
        className="capitalize m-2"
        color="warning"
        size="lg"
        startContent={<PlusOutlined />}
        variant="flat"
        onPress={onOpen}
      >
        Course
      </Button>
      <Modal
        backdrop="blur"
        hideCloseButton={true}
        isOpen={isOpen}
        placement="top-center"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Course
              </ModalHeader>
              <ModalBody>
                <Autosuggest
                  suggestions={courseSuggestions}
                  onSuggestionsFetchRequested={({ value }) => {
                    searchModules(data.cohort, value).then((results) => {
                      setCourseSuggestions(
                        results.map((mod) => ({
                          moduleCode: mod.moduleCode,
                          title: mod.title,
                        })),
                      );
                    });
                  }}
                  onSuggestionsClearRequested={() => setCourseSuggestions([])}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
                <Select
                  isRequired
                  label="Semester"
                  placeholder="Select a semester"
                  onChange={(e) => setSem(Number(e.target.value))}
                >
                  {data.user_schedule
                    .filter((sem) => sem.order > 0)
                    .map((sem) => (
                      <SelectItem key={sem.order}>{sem.name}</SelectItem>
                    ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="warning" onPress={handleAddCourse}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
