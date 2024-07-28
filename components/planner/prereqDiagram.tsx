import React, { useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  ColorMode,
  Controls,
  Handle,
  Position,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { Chip, ChipVariantProps } from "@nextui-org/react";

import { PlanarDataType, PlannerCourseType } from "@/types";

type PrerequisiteDiagramProps = {
  course: PlannerCourseType;
  data: PlanarDataType;
  courseHashmap: Map<string, PlannerCourseType> | null;
};

type courseNodeType = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  type: string;
  data: CourseChipNodeProps["data"];
};

type courseEdgeType = {
  id: string;
  source: string;
  target: string;
};

// Function to recursively traverse the prerequisite tree and check if prerequisites are met.
const processPrereq = (
  hashmap: Map<string, PlannerCourseType>,
  nodes: courseNodeType[],
  edges: courseEdgeType[],
  x: number,
  y: number,
  currNode: string,
  childTree: any,
  subfulfillment: boolean,
): boolean => {
  console.log(currNode, childTree);
  if (childTree != null) {
    if (typeof childTree == "string") {
      childTree = { or: [childTree] };
    }

    if ("and" in childTree) {
      console.log("and node");
      let fulfilled: boolean = true;

      childTree.and.forEach((child: any, index: number) => {
        fulfilled =
          processPrereq(
            hashmap,
            nodes,
            edges,
            x + index * 400,
            y + 100,
            currNode,
            child,
            subfulfillment,
          ) && fulfilled;
      });

      return fulfilled;
    }

    if ("or" in childTree) {
      console.log("or node");

      if (childTree.or.length == 0) {
        return true;
      }

      let fulfilled = false;

      for (let i = 0; i < childTree.or.length; i++) {
        let item = childTree.or[i];

        if (typeof item == "string") {
          const code = item.slice(0, -2);

          if (hashmap.has(code)) {
            nodes.push({
              id: code,
              position: {
                x: x,
                y: y + 100,
              },
              type: "coursechip",
              data: {
                status: "success",
                course: hashmap.get(code)!,
                error: null,
              },
            });

            edges.push({
              id: `${currNode}-${code}`,
              source: currNode,
              target: code,
            });
            fulfilled = true;
          }
        } else if ("and" in item) {
          fulfilled =
            fulfilled ||
            processPrereq(hashmap, nodes, edges, x, y, currNode, item, true);
        } else {
          // nOf case
          const subModList = item.nOf[1];

          const formattedSubModList = subModList.map((submod: string) => ({
            or: [submod],
          }));
          const furtherChildTree = { and: formattedSubModList };

          fulfilled =
            fulfilled ||
            processPrereq(
              hashmap,
              nodes,
              edges,
              x,
              y,
              currNode,
              furtherChildTree,
              true,
            );
        }
      }

      if (fulfilled == false && subfulfillment == false) {
        let errorString = "Missing: ";

        for (let i = 0; i < childTree.or.length; i++) {
          let item = childTree.or[i];

          if (typeof item == "string") {
            errorString = errorString.concat(item.slice(0, -2));
          } else if ("and" in item) {
            const subModList = item.and.map((submod: any) => submod.or[0]);

            errorString = errorString.concat(`[${subModList.toString()}]`);
          } else {
            const subModList = item.nOf[1].map((submod: string) =>
              submod.slice(0, -2),
            );

            errorString = errorString.concat(`[${subModList.toString()}]`);
          }
          if (i < childTree.or.length - 1) {
            errorString = errorString.concat("/");
          }
        }

        nodes.push({
          id: errorString,
          position: {
            x: x,
            y: y + 150,
          },
          type: "coursechip",
          data: {
            status: "danger",
            course: null,
            error: errorString,
          },
        });
        edges.push({
          id: `${currNode}-${errorString}`,
          source: currNode,
          target: errorString,
        });
      }

      return fulfilled;
    }

    return false;
  }

  return true;
};

export const PrerequisiteDiagram = ({
  course,
  data,
  courseHashmap,
}: PrerequisiteDiagramProps) => {
  const { theme } = useTheme();

  const nodeTypes = useMemo(() => ({ coursechip: CourseChipNode }), []);

  const [nodes, setNodes] = useState<courseNodeType[]>([]);
  const [edges, setEdges] = useState<courseEdgeType[]>([]);

  // Compute the nodes and edges using the above function to create the error checking prerequisite diagram
  useEffect(() => {
    let x: number = 0;
    let y: number = 0;

    let newNodes: courseNodeType[] = [
      {
        id: course.code,
        position: {
          x: x,
          y: y,
        },
        type: "coursechip",
        data: {
          status: "primary",
          course: course,
          error: null,
        },
      },
    ];

    let newEdges: courseEdgeType[] = [];

    processPrereq(
      courseHashmap!,
      newNodes,
      newEdges,
      x + 50,
      y,
      course.code,
      course.prerequisites,
      false,
    );

    setNodes(newNodes);
    setEdges(newEdges);
  }, [data]);

  return (
    <div className="w-full h-[50vh]">
      <ReactFlow
        colorMode={theme as ColorMode}
        edges={edges}
        edgesFocusable={false}
        edgesReconnectable={false}
        elementsSelectable={false}
        fitView={true}
        nodeTypes={nodeTypes}
        nodes={nodes}
        nodesConnectable={false}
        nodesDraggable={false}
        nodesFocusable={false}
      >
        <Controls showInteractive={false} />
        <Background gap={12} size={1} variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

type CourseChipNodeProps = {
  data: {
    course: PlannerCourseType | null;
    status: ChipVariantProps["color"];
    error: string | null;
  };
  isConnectable: boolean;
};

// Creating a custom node used to display the prerequisite tree
const CourseChipNode = ({ data, isConnectable }: CourseChipNodeProps) => {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  return (
    <div className="text-updater-node">
      <Handle
        isConnectable={isConnectable}
        position={Position.Top}
        type="target"
      />
      {data.error == null ? (
        <Chip color={data.status} size="lg" variant="solid">
          {data.course!.code}: {data.course!.name}
        </Chip>
      ) : (
        <Chip color={data.status} size="lg" variant="solid">
          {data.error}
        </Chip>
      )}

      <Handle
        id="b"
        isConnectable={isConnectable}
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
};
