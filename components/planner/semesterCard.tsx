import { Listbox, ListboxItem } from "@nextui-org/react";

import { ModuleCard } from "./moduleCard";

export const SemesterCard = ({ refmap, semester }) => {
  return (
    <div className="w-1/5 min-w-fit h-full px-1">
      <h3 className="text-2xl px-3">{semester.name}</h3>
      <Listbox aria-label="" className="flex-1 overflow-y-auto ">
        {refmap == null ? (
          <></>
        ) : (
          semester.courses.map((courseCode) => {
            return (
              <ListboxItem key={courseCode}>
                <ModuleCard moduleInfo={refmap.get(courseCode)} />
              </ListboxItem>
            );
          })
        )}
      </Listbox>
    </div>
  );
};
