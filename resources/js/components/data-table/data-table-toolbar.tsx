/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Table } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Download, Search, Trash2, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { downloadCSV } from '@/lib/csv-utils';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    filterableColumns?: {
        id: string;
        title: string;
        options: {
            label: string;
            value: string;
            icon?: React.ComponentType<{ className?: string }>;
        }[];
    }[];
    searchableColumns?: {
        id: string;
        title: string;
    }[];
    dateRangeColumn?: {
        id: string;
        title: string;
    };
    csvFilename?: string;
    onDeleteSelected?: (rows: TData[]) => void;
}

type DateRange = {
    from: Date | undefined;
    to: Date | undefined;
};

export function DataTableToolbar<TData>({
    table,
    // filterableColumns = [],
    searchableColumns = [],
    dateRangeColumn,
    csvFilename = 'table-export.csv',
    onDeleteSelected,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [dateRange, setDateRange] = useState<DateRange>({
        from: undefined,
        to: undefined,
    });
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Get selected rows
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasSelectedRows = selectedRows.length > 0;

    // Apply date range filter
    const handleDateRangeChange = (range: DateRange) => {
        setDateRange(range);

        if (dateRangeColumn) {
            if (range.from || range.to) {
                table
                    .getColumn(dateRangeColumn.id)
                    ?.setFilterValue([range.from ? range.from.toISOString() : undefined, range.to ? range.to.toISOString() : undefined]);
            } else {
                table.getColumn(dateRangeColumn.id)?.setFilterValue(undefined);
            }
        }
    };

    // Format date range for display
    const formatDateRange = () => {
        if (dateRange.from && dateRange.to) {
            return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
        }
        if (dateRange.from) {
            return `From ${format(dateRange.from, 'MMM d, yyyy')}`;
        }
        if (dateRange.to) {
            return `Until ${format(dateRange.to, 'MMM d, yyyy')}`;
        }
        return 'Select date range';
    };

    // Clear date range filter
    const clearDateRange = () => {
        setDateRange({ from: undefined, to: undefined });
        if (dateRangeColumn) {
            table.getColumn(dateRangeColumn.id)?.setFilterValue(undefined);
        }
    };

    // Handle CSV download
    const handleDownloadCSV = () => {
        // Get the current filtered data
        const filteredData = table.getFilteredRowModel().rows.map((row) => row.original);

        // Download the CSV
        downloadCSV(
            filteredData,
            table.getAllColumns().map((column) => column.columnDef),
            csvFilename,
        );
    };

    // Handle delete selected rows
    const handleDeleteSelected = () => {
        if (onDeleteSelected) {
            onDeleteSelected(selectedRows.map((row) => row.original));
            table.resetRowSelection();
        }
        setShowDeleteDialog(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Search inputs */}
                <div className="flex flex-1 items-center space-x-2">
                    {searchableColumns.length > 0 && (
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                            <Input
                                placeholder={`Search ${searchableColumns.length > 1 ? '...' : searchableColumns[0]?.title.toLowerCase()}`}
                                value={(table.getColumn(searchableColumns[0]?.id)?.getFilterValue() as string) ?? ''}
                                onChange={(event) => table.getColumn(searchableColumns[0]?.id)?.setFilterValue(event.target.value)}
                                className="pl-8"
                            />
                        </div>
                    )}
                </div>

                {/* Date range picker */}
                {/* {dateRangeColumn && (
                    <div className="flex gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !dateRange.from && !dateRange.to && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formatDateRange()}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dateRange.from}
                                    selected={dateRange}
                                    onSelect={handleDateRangeChange}
                                    numberOfMonths={2}
                                />
                                <div className="border-border border-t p-3">
                                    <Button variant="outline" size="sm" onClick={clearDateRange} className="w-full">
                                        Clear
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                )} */}
                <div className="flex flex-row-reverse justify-end gap-2">
                    {/* Selected rows actions */}
                    {hasSelectedRows && (
                        <div>
                            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="ml-auto" disabled={!onDeleteSelected}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    )}

                    {/* Download CSV button */}
                    <div>
                        <Button variant="outline" onClick={handleDownloadCSV} className="ml-auto">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            {/* Reset filters button */}
            {isFiltered && (
                <div className="flex justify-start">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            setDateRange({ from: undefined, to: undefined });
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset filters
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Delete confirmation dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will delete {selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'} and cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteSelected}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
