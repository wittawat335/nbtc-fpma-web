"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridCustomCellProps,
} from "@progress/kendo-react-grid";
import { Proposal_Comment } from "@/types/proposal";

const formatThaiDate = (dateString?: string | null) => {
  if (!dateString) return "-";

  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "-";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hour = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${min}`;
};

type ReviewProps = {
  items?: Proposal_Comment[];
};

export default function TableReview({ items } : ReviewProps) {
  const [data, setData] = useState<Proposal_Comment[]>(items ?? []);
  

  const DateCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;

    return (
      <td {...props.tdProps}>{formatThaiDate(dataItem.itemCreatedWhen)}</td>
    );
  };

    useEffect(() => {
      if (items) {
        setData(items);
      }
    }, [items]);

  return (
    <Grid
      data={data}
      dataItemKey="itemId"
      autoProcessData={true}
      sortable={true}
      pageable={true}
      filterable={false}
      defaultSkip={0}
      defaultTake={5}
    >
     
      <Column
        field="itemCreatedWhen"
        title="วันที่"
        editable={false}
        filterable={false}
        width="200px"
        cells={{
          data: (props) => <DateCell {...props} />,
        }}
      ></Column>
       <Column field="proposalStatusId" title="สถานะ"  width="150px"/>
      <Column field="message" title="ความคิดเห็น" />
    </Grid>
  );
}
