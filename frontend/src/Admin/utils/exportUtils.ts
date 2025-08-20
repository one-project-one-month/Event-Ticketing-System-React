/* eslint-disable @typescript-eslint/no-explicit-any */
// @/User/utils/exportUtils.ts
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToCSV = (data: any[], filename = "data.csv") => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    Object.keys(data[0]).join(",") +
    "\n" +
    data.map((row) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (data: any[], filename = "data.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
};

export const exportToPDF = (data: any[], filename = "data.pdf") => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [Object.keys(data[0])],
    body: data.map((item) => Object.values(item)),
  });
  doc.save(filename);
};
