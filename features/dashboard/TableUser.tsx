"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useViewForm } from "@/hooks/useProposals";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  Grid,
  GridColumn as Column,
  GridCustomCellProps,
} from "@progress/kendo-react-grid";

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

export default function TableUser() {
  const { user, isLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading: isDataLoading } = useViewForm(
    Number(user?.id),
    page,
    pageSize,
  );

  if (isLoading || isDataLoading) {
    return <div className="p-4 text-gray-500">กำลังโหลดข้อมูล...</div>;
  }

  if (!user || !data) return null;

  const ViewCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;
    return (
      <td {...props.tdProps}>
        <Link
          href={`/project-type-1/${dataItem.itemId}`}
          className="inline-flex items-center rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
          title="ดูรายละเอียด"
        >
          <Eye className="h-5 w-5" />
        </Link>
      </td>
    );
  };

  const DateCreateCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;
    return (
      <td {...props.tdProps}>{formatThaiDate(dataItem.itemCreatedWhen)}</td>
    );
  };

  const DateUpdateCell = (props: GridCustomCellProps) => {
    const { dataItem } = props;
    return (
      <td {...props.tdProps}>{formatThaiDate(dataItem.itemModifiedWhen)}</td>
    );
  };

  return (
    <Grid
      data={data.items ?? []}
      dataItemKey="itemId"
      autoProcessData={false}
      sortable={true}
      pageable={true}
      filterable={false}
      total={data?.total ?? 0}
      skip={(page - 1) * pageSize}
      take={pageSize}
      onPageChange={(e) => {
        const newPage = e.page.skip / e.page.take + 1;
        setPage(newPage);
        setPageSize(e.page.take);
      }}
    >
      <Column field="name" title="ชื่องาน" />
      <Column
        field="itemCreatedWhen"
        title="วันที่สร้าง"
        editable={false}
        filterable={false}
        width="150px"
        cells={{ data: (props) => <DateCreateCell {...props} /> }}
      ></Column>
      <Column
        field="itemModifiedWhen"
        title="อัพเดตล่าสุด"
        editable={false}
        filterable={false}
        cells={{ data: (props) => <DateUpdateCell {...props} /> }}
        width="150px"
      ></Column>
      <Column
        title="Link"
        editable={false}
        filterable={false}
        cells={{ data: (props) => <ViewCell {...props} /> }}
        width="62px"
      />
    </Grid>
  );
}
