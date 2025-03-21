/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table"

// Function to convert data to CSV format
export function convertToCSV<TData>(data: TData[], columns: ColumnDef<TData, any>[], includeHeaders = true): string {
  // Filter out columns that shouldn't be included in export (like select and actions)
  const exportableColumns = columns.filter(
    (column) => column.id !== "select" && column.id !== "actions" && !column.id?.startsWith("_"),
  )

  // Get headers from column accessors or headers
  const headers = exportableColumns.map((column) => {
    // Use the header if it's a string, otherwise use the accessorKey or id
    if (typeof column.header === "string") {
      return column.header
    }

    return ((column.accessorKey as string) || column.id || "").toString()
  })

  // Create CSV rows
  const rows = data.map((row) => {
    return exportableColumns
      .map((column) => {
        // Get the value using accessorKey or accessorFn
        let value: any

        if (column.accessorKey) {
          // Handle nested properties with dot notation
          const accessorKey = column.accessorKey as string
          if (accessorKey.includes(".")) {
            value = accessorKey.split(".").reduce((obj, key) => obj?.[key], row)
          } else {
            value = (row as any)[accessorKey]
          }
        } else if (column.accessorFn) {
          value = column.accessorFn(row, 0)
        } else {
          value = (row as any)[column.id as string] || ""
        }

        // Format the value
        if (value instanceof Date) {
          value = value.toISOString()
        } else if (typeof value === "object" && value !== null) {
          value = JSON.stringify(value)
        }

        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value ?? "")
        const escaped = stringValue.replace(/"/g, '""')
        return stringValue.includes(",") || stringValue.includes("\n") || stringValue.includes('"')
          ? `"${escaped}"`
          : escaped
      })
      .join(",")
  })

  // Combine headers and rows
  const csvContent = [...(includeHeaders ? [headers.join(",")] : []), ...rows].join("\n")

  return csvContent
}

// Function to download CSV
export function downloadCSV<TData>(
  data: TData[],
  columns: ColumnDef<TData, any>[],
  filename = "data-export.csv",
): void {
  const csvContent = convertToCSV(data, columns)

  // Create a blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

  // Create a download link
  const link = document.createElement("a")

  // Create a URL for the blob
  const url = URL.createObjectURL(blob)

  // Set link properties
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"

  // Add link to document, click it, and remove it
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Clean up the URL
  URL.revokeObjectURL(url)
}
