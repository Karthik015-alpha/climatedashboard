"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(elementId: string, filename: string) {
  const node = document.getElementById(elementId);
  if (!node) throw new Error("Element not found");
  const canvas = await html2canvas(node, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}
