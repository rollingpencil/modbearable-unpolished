"use client";

import { useEffect, useState } from "react";

import { title } from "@/components/primitives";

export default function PlannerPage({
  params,
}: {
  params: { importStr: string };
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data == null) {
      if ("importStr" in params) {
        console.log(`From URL | ${params.importStr[0]}`);
        const importString = params.importStr[0];

        setData(JSON.parse(atob(importString)));
      } else {
        // localStorage.getItem("data", btoa(JSON.stringify(data)));
        let localStorageData = localStorage.getItem("data");

        if (localStorageData == null) {
          localStorageData = "";
        }
        console.log(`From localStorage | ${localStorageData}}`);
        setData(JSON.parse(atob(localStorageData)));
      }
    }
  }, [data]);


  return (
    <>
      <div>
        <h1 className={title()}>Planner</h1>
      </div>
    </>
  );
}
