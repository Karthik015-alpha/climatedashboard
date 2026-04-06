import { NextResponse } from "next/server";

export async function GET() {
  const lat = 28.6139;
  const lon = 77.2090;

  const [weatherRes, aqiRes] = await Promise.all([
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`, {
      next: { revalidate: 300 }
    }),
    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,pm10`, {
      next: { revalidate: 300 }
    })
  ]);

  if (!weatherRes.ok || !aqiRes.ok) {
    return NextResponse.json({ text: "Live insights are temporarily unavailable.", severity: "medium" }, { status: 502 });
  }

  const weather = await weatherRes.json();
  const aqi = await aqiRes.json();

  const temp = weather?.current_weather?.temperature;
  const wind = weather?.current_weather?.windspeed;
  const currentAqi = aqi?.current?.european_aqi;
  const pm25 = aqi?.current?.pm2_5;

  let text = "Conditions are stable with no major environmental stress signals right now.";
  let severity: "low" | "medium" | "high" = "low";

  if (typeof currentAqi === "number" && currentAqi >= 80) {
    text = `Air quality is poor (AQI ${Math.round(currentAqi)}). Sensitive groups should limit prolonged outdoor activity.`;
    severity = "high";
  } else if (typeof temp === "number" && temp >= 37) {
    text = `High heat detected (${Math.round(temp)}°C). Heat stress risk is elevated during peak afternoon hours.`;
    severity = "high";
  } else if (typeof pm25 === "number" && pm25 >= 35) {
    text = `PM2.5 is elevated at ${pm25.toFixed(1)} ug/m3. Consider masks in traffic-dense zones.`;
    severity = "medium";
  } else if (typeof wind === "number" && wind >= 25) {
    text = `Wind speeds are elevated (${Math.round(wind)} km/h). Expect faster movement of dust and local weather systems.`;
    severity = "medium";
  }

  return NextResponse.json({ text, severity, metrics: { temp, wind, aqi: currentAqi, pm25 } });
}
