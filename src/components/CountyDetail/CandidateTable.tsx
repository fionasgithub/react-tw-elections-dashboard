import { useMemo } from "react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, User } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  PARTY_COLORS,
  PARTY_SHORT_NAMES,
  type Candidate,
  type Party,
} from "@/types/elections";

interface CandidateTableProps {
  data: Candidate[];
}

const CandidateTable = ({ data }: CandidateTableProps) => {
  const sorted = useMemo(() => {
    return [...data].sort((a, b) => b.voteRate - a.voteRate);
  }, [data]);
  const maxRate = sorted[0]?.voteRate ?? 0;
  const numberFormatter = new Intl.NumberFormat("zh-TW");

  const columns: ColumnDef<Candidate>[] = [
    {
      accessorKey: "name",
      header: "候選人",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <span
            className="inline-flex items-center justify-center w-5 h-5 px-1 py-1 text-xs font-semibold rounded-full text-foreground/80"
            style={{ backgroundColor: PARTY_COLORS[row.original.party] }}
          >
            {PARTY_SHORT_NAMES[row.original.party as Exclude<Party, "EMPTY">] ||
              "無"}
          </span>
          <span className="font-semibold text-foreground">
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "votes",
      header: "得票數",
      cell: ({ row }) => (
        <span className="font-semibold tabular-nums text-foreground">
          {numberFormatter.format(row.original.votes)}
        </span>
      ),
    },
    {
      accessorKey: "voteRate",
      header: "得票率",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-4">
          <div className="min-w-16 max-w-20 progress-track hidden sm:flex">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${row.original.voteRate}%`,
                backgroundColor: PARTY_COLORS[row.original.party],
              }}
            />
          </div>
          <span className="w-8 text-right font-semibold tabular-nums text-foreground">
            {row.original.voteRate.toFixed(1)}%
          </span>
        </div>
      ),
    },
    {
      accessorKey: "elected",
      header: "當選",
      cell: ({ row }) =>
        row.original.elected ? (
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-sm font-bold"
            aria-label="當選"
            title="當選"
          >
            <Check className="h-4 w-4" />
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        ),
    },
  ];

  const table = useReactTable({
    data: sorted,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="[&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:text-muted-foreground [&_td]:whitespace-normal">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const alignRight = ["votes", "voteRate", "elected"].includes(
                header.id,
              );

              return (
                <TableHead
                  key={header.id}
                  className={`${alignRight ? "text-right" : "text-left"}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const isLeading = row.original.voteRate === maxRate;

            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`border-b border-border/40 transition-colors ${
                  isLeading ? "bg-primary/8" : "hover:bg-secondary/35"
                }`}
              >
                {row.getVisibleCells().map((cell) => {
                  const alignRight = ["votes", "voteRate", "elected"].includes(
                    cell.column.id,
                  );

                  return (
                    <TableCell
                      key={cell.id}
                      className={`py-3 ${alignRight ? "text-right" : "text-left"}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CandidateTable;
