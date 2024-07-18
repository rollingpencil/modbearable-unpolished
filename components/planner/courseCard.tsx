import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import { PlannerCourseType } from "@/types";

type courseCardType = {
  courseInfo: PlannerCourseType;
};

export const CourseCard = ({ courseInfo }: courseCardType) => {
  return (
    <Card className="bg-amber-500 text-white" shadow="lg">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg">{courseInfo.code}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-lg">{courseInfo.name}</p>
        <p className="text-md">{courseInfo.credits} Credits</p>
      </CardBody>
    </Card>
  );
};
