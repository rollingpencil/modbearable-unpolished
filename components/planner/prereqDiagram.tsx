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

const processPrereq = (
  hashmap: Map<string, PlannerCourseType>,
  nodes: courseNodeType[],
  setNodes: Function,
  edges: courseEdgeType[],
  setEdges: Function,
  x: number,
  y: number,
  currNode: string,
  childTree: any,
): boolean => {
  console.log(currNode, childTree);
  if (childTree != null) {
    if ("and" in childTree) {
      console.log("and node");
      let fulfilled: boolean = true;

      childTree.and.forEach((child: any, index: number) => {
        fulfilled =
          processPrereq(
            hashmap,
            nodes,
            setNodes,
            edges,
            setEdges,
            x + index * 400,
            y + 100,
            currNode,
            child,
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
          const code = item;

          if (hashmap.has(code)) {
            // setNodes([
            //   ...nodes,
            //   {
            //     id: code,
            //     position: {
            //       x: x,
            //       y: y,
            //     },
            //     type: "coursechip",
            //     data: {
            //       status: "success",
            //       course: hashmap.get(code)!,
            //     },
            //   },
            // ]);
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

            // setEdges([
            //   ...edges,
            //   {
            //     id: `${currNode}-${code}`,
            //     source: currNode,
            //     target: code,
            //   },
            // ]);
            edges.push({
              id: `${currNode}-${code}`,
              source: currNode,
              target: code,
            });
            fulfilled = true;
          }
        } else {
          // nOf case
          const subModList = item.nOf[1];

          subModList.map((submod: string) => ({ or: [submod] }));
          const furtherChildTree = { and: subModList };

          fulfilled =
            fulfilled ||
            processPrereq(
              hashmap,
              nodes,
              setNodes,
              edges,
              setEdges,
              x,
              y,
              currNode,
              furtherChildTree,
            );
        }
      }

      if (fulfilled == false) {
        let errorString = "Missing: ";

        for (let i = 0; i < childTree.or.length; i++) {
          let item = childTree.or[i];

          if (typeof item == "string") {
            errorString = errorString.concat(item);
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
            y: y + 100,
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
}: PrerequisiteDiagramProps) => {
  const { theme } = useTheme();

  const nodeTypes = useMemo(() => ({ coursechip: CourseChipNode }), []);

  const [nodes, setNodes] = useState<courseNodeType[]>([]);
  const [edges, setEdges] = useState<courseEdgeType[]>([]);

  useEffect(() => {
    let masterCourseHashmap = new Map(
      [
        ...data.base_requirements,
        ...data.non_base_exemptions,
        ...data.user_defined_courses,
      ].map((c) => [c.code, c]),
    );

    let x: number = 0;
    let y: number = 0;

    setNodes([
      ...nodes,
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
    ]);

    processPrereq(
      masterCourseHashmap,
      nodes,
      setNodes,
      edges,
      setEdges,
      x + 50,
      y,
      course.code,
      masterCourseHashmap.get(course.code)?.prerequisites,
    );
  }, [data]);

  return (
    <div className="w-full h-[50vh]">
      <ReactFlow
        colorMode={theme as ColorMode}
        edges={edges}
        edgesReconnectable={false}
        elementsSelectable={false}
        fitView={true}
        nodeTypes={nodeTypes}
        nodes={nodes}
      >
        <Controls showInteractive={true} />
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
