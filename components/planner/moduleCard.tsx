import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export const ModuleCard = ({ moduleInfo }) => {
  return (
    <Card className="bg-amber-500 text-white" shadow="lg">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg">{moduleInfo.code}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-lg">{moduleInfo.name}</p>
        <p className="text-md">{moduleInfo.credits} Credits</p>
      </CardBody>
    </Card>
  );
};
