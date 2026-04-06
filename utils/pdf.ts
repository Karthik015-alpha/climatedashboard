"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type WeatherReportPayload = {
  location: {
    name: string;
    lat: number;
    lon: number;
    formatted_address?: string;
  };
  weather: {
    temperature?: number;
    humidity?: number;
    windspeed?: number;
    weatherCode?: number;
    weatherLabel?: string;
  };
  aqi: {
    europeanAqi?: number;
    pm10?: number;
    pm2_5?: number;
    ozone?: number;
    nitrogenDioxide?: number;
  };
  forecast?: Array<{
    date: string;
    min?: number;
    max?: number;
    weatherCode?: number;
  }>;
  generatedAt?: string;
};

function formatMetric(value: number | undefined, suffix = "", digits?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "--";
  return `${digits !== undefined ? value.toFixed(digits) : Math.round(value)}${suffix}`;
}

function toAqiBand(aqi: number | undefined) {
  if (typeof aqi !== "number") return "Unknown";
  if (aqi <= 20) return "Very Good";
  if (aqi <= 40) return "Good";
  if (aqi <= 60) return "Fair";
  if (aqi <= 80) return "Poor";
  if (aqi <= 100) return "Very Poor";
  return "Extremely Poor";
}

export function generateWeatherReportPDF(payload: WeatherReportPayload, filename: string) {
  const pdf = new jsPDF("p", "mm", "a4");
  const left = 14;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const right = pageWidth - 14;
  let y = 16;

  const generatedAt = payload.generatedAt || new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  pdf.setFillColor(16, 185, 129);
  pdf.rect(0, 0, pageWidth, 28, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("EcoVision Weather Report", left, 12);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(generatedAt, left, 18);

  y = 36;
  pdf.setTextColor(15, 23, 42);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Location", left, y);
  y += 6;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(payload.location.name || "Unknown", left, y);
  y += 5;
  pdf.setFontSize(10);
  pdf.setTextColor(71, 85, 105);
  pdf.text(payload.location.formatted_address || `${payload.location.lat.toFixed(4)}, ${payload.location.lon.toFixed(4)}`, left, y);

  y += 10;
  pdf.setDrawColor(203, 213, 225);
  pdf.line(left, y, right, y);
  y += 8;

  pdf.setTextColor(15, 23, 42);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Current Conditions", left, y);
  y += 7;

  const weatherRows: Array<[string, string]> = [
    ["Temperature", formatMetric(payload.weather.temperature, " °C")],
    ["Humidity", formatMetric(payload.weather.humidity, " %")],
    ["Wind Speed", formatMetric(payload.weather.windspeed, " km/h")],
    ["Condition", payload.weather.weatherLabel || "--"]
  ];

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  weatherRows.forEach(([k, v]) => {
    pdf.setTextColor(71, 85, 105);
    pdf.text(k, left, y);
    pdf.setTextColor(15, 23, 42);
    pdf.text(v, left + 48, y);
    y += 6;
  });

  y += 3;
  pdf.setDrawColor(203, 213, 225);
  pdf.line(left, y, right, y);
  y += 8;

  pdf.setTextColor(15, 23, 42);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Air Quality", left, y);
  y += 7;

  const aqiRows: Array<[string, string]> = [
    ["European AQI", formatMetric(payload.aqi.europeanAqi)],
    ["AQI Band", toAqiBand(payload.aqi.europeanAqi)],
    ["PM2.5", formatMetric(payload.aqi.pm2_5, " ug/m3", 1)],
    ["PM10", formatMetric(payload.aqi.pm10, " ug/m3", 1)],
    ["Ozone", formatMetric(payload.aqi.ozone, " ug/m3", 1)],
    ["Nitrogen Dioxide", formatMetric(payload.aqi.nitrogenDioxide, " ug/m3", 1)]
  ];

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  aqiRows.forEach(([k, v]) => {
    pdf.setTextColor(71, 85, 105);
    pdf.text(k, left, y);
    pdf.setTextColor(15, 23, 42);
    pdf.text(v, left + 48, y);
    y += 6;
  });

  if (payload.forecast && payload.forecast.length > 0) {
    if (y > 230) {
      pdf.addPage();
      y = 18;
    }
    y += 2;
    pdf.setDrawColor(203, 213, 225);
    pdf.line(left, y, right, y);
    y += 8;

    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Forecast (Next Days)", left, y);
    y += 7;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(71, 85, 105);
    pdf.text("Date", left, y);
    pdf.text("Min", left + 55, y);
    pdf.text("Max", left + 85, y);
    pdf.text("Code", left + 115, y);
    y += 5;

    pdf.setFont("helvetica", "normal");
    payload.forecast.slice(0, 7).forEach((row) => {
      if (y > 280) {
        pdf.addPage();
        y = 18;
      }
      pdf.setTextColor(15, 23, 42);
      pdf.text(row.date, left, y);
      pdf.text(formatMetric(row.min, "°C"), left + 55, y);
      pdf.text(formatMetric(row.max, "°C"), left + 85, y);
      pdf.text(formatMetric(row.weatherCode), left + 115, y);
      y += 6;
    });
  }

  pdf.save(filename);
}

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
