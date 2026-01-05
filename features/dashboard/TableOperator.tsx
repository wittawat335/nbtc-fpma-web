"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridItemChangeEvent,
  GridCustomCellProps,
} from "@progress/kendo-react-grid";
import { Proposal } from "@/types/proposal";
import { useOperators } from "@/hooks/useOperators";
import { useProposalAssistants } from "@/hooks/useProposals";
import { Eye } from "lucide-react";
import Link from "next/link";

type RowProps = {
  items?: Proposal[];
  setAssign: (index: number) => void;
  isOperator: boolean;
  canAssign: boolean;
};

export default function TableOperator({
  items,
  setAssign,
  isOperator,
  canAssign,
}: RowProps) {
  const { data: proposalAssistants } = useProposalAssistants();
  const { data: operators } = useOperators();

  const [data, setData] = useState<Proposal[]>(items ?? []);

  const handleItemChange = (event: GridItemChangeEvent) => {
    console.log(event);
    const newData = data.map((item) =>
      item.itemId === event.dataItem.itemId
        ? { ...item, [event.field!]: event.value }
        : item,
    );
    setData(newData);
  };

  useEffect(() => {
    if (items) {
      setData(items);
    }
  }, [items]);

  const OperatorCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;

    const pid = Number(dataItem.itemId);

    const assistants =
      proposalAssistants?.filter((a) => Number(a.proposalId) === pid) ?? [];

    if (assistants.length === 0) {
      return (
        <td {...props.tdProps}>
          <span className="p-4 text-[10px] text-gray-400 italic">
            ยังไม่ assign
          </span>
        </td>
      );
    }

    const mapped = assistants.map((a) => {
      const op = operators?.find((o) => o.userId === a.userId);
      return op?.username ?? `#${a.userId}`;
    });

    const visible = mapped.slice(0, 3);
    const more = mapped.length - visible.length;

    return (
      <td {...props.tdProps}>
        <div className="flex flex-wrap items-center gap-1.5">
          {visible.map((name, idx) => (
            <span
              key={idx}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] text-gray-700"
            >
              {name}
            </span>
          ))}

          {more > 0 && (
            <span className="rounded-full bg-gray-200 px-2.5 py-1 text-[10px] text-gray-600">
              +{more}
            </span>
          )}
        </div>
      </td>
    );
  };

  const AssignCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;

    return (
      <td {...props.tdProps}>
        <button
          type="button"
          onClick={() => setAssign(dataItem.itemId)}
          className="relative inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-indigo-700 shadow-sm hover:bg-gray-50"
        >
          Assign
          <span className="ml-2 rounded-full bg-indigo-50 px-2 text-[10px] font-bold">
            {proposalAssistants?.filter(
              (a) => Number(a.proposalId) === Number(dataItem.itemId),
            ).length || 0}
          </span>
        </button>
      </td>
    );
  };

  const ViewCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;

    return (
      <td {...props.tdProps}>
        <Link
          href={`/project-type-1/proposal?id=${dataItem.itemId}`}
          className="inline-flex items-center rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
          title="ดูรายละเอียด"
        >
          <Eye className="h-5 w-5" />
        </Link>
      </td>
    );
  };

  const ReviewCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;

    return (
      <td {...props.tdProps}>
        <Link
          href={`/review/${dataItem.itemId}`}
          className="font-medium text-green-600 hover:text-green-800"
        >
          Review
        </Link>
      </td>
    );
  };

  return (
    <Grid
      data={data}
      dataItemKey="itemId"
      autoProcessData={true}
      sortable={true}
      pageable={true}
      filterable={true}
      editable={{ mode: "incell" }}
      defaultSkip={0}
      defaultTake={5}
      onItemChange={handleItemChange}
    >
      <Column field="name" title="ชื่องาน" editor="text"/>
      <Column
        field="proposalStatusId"
        title="สถานะ"
        editable={false}
        filterable={false}
        width="100px" 
      ></Column>
      <Column
        title="Link"
        editable={false}
        filterable={false}
        cells={{
          data: (props) => <ViewCell {...props} />,
        }}
        width="62px"
      />
      {isOperator && (
        <Column
          title="Review"
          editable={false}
          filterable={false}
          cells={{
            data: (props) => <ReviewCell {...props} />,
          }}
          width="100px"
        />
      )}
      {!isOperator && (
        <Column
          title="Operator"
          editable={false}
          filterable={false}
          cells={{
            data: (props) => <OperatorCell {...props} />,
          }}
          width="180px"
        />
      )}
      {canAssign && (
        <Column
          title="Assign"
          editable={false}
          filterable={false}
          cells={{
            data: (props) => <AssignCell {...props} />,
          }}
          width="120px"
        />
      )}
    </Grid>
  );
}
