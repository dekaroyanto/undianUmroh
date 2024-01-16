"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Spinner,
} from "@nextui-org/react";

export default function DataTable({ columns, rows, keys, selectMode, length }) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = length ? length : 10;

  const pages = Math.ceil(rows?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  // const pages = useMemo(() => {
  //   return rows?.length ? Math.ceil(rows.length / rowsPerPage) : 0;
  // }, [rows?.length, rowsPerPage]);

  const loadingState = isLoading || rows?.length === 0 ? "loading" : "idle";

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [rows]);

  return (
    <div className="flex flex-col gap-2">
      {rows.length > 0 && (
        <p className="font-medium text-sm">
          Showing: 1 to {rows.length > 10 ? "10" : rows.length} ({rows.length})
        </p>
      )}
      <Table
        aria-label="Example table with client side pagination"
        selectionMode={selectMode ? selectMode : "single"}
        bottomContent={
          rows.length > 0 &&
          !isLoading && (
            <div className="flex w-full justify-center">
              {rows.length > 10 && (
                <Pagination
                  isCompact
                  // showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                  classNames={{}}
                />
              )}
            </div>
          )
        }
        classNames={{
          wrapper: "min-h-[222px]",
          table: "w-max",
          th: "llast:w-full",
          td: "min-w-max",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>

        {isLoading ? (
          <TableBody
            loadingContent={
              <Spinner label={<h1 className="font-semibold">Loading...</h1>} />
            }
            loadingState={loadingState}
          >
            {[]}
          </TableBody>
        ) : (
          <TableBody
            items={items}
            emptyContent={rows.length === 0 && "Data Is Empty"}
          >
            {(item) => (
              <TableRow key={item[{ keys }]}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
