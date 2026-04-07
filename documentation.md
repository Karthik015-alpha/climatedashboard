# FINAL YEAR PROJECT DOCUMENTATION
## Project Title: EcoVision - Climate Intelligence and Environmental Monitoring Platform

## List of Figures
1. Fig 4.1 System Architecture Diagram
2. Fig 5.1 Dataset Description
3. Fig 5.2 Data Sources and Preprocessing
4. Fig 5.3 Training and Testing Split
5. Fig 6.1 AQI Trend vs Time
6. Fig 6.2 Historical vs Predicted Temperature Trend
7. Fig 6.3 AI-Based Monitoring vs Traditional Monitoring
8. Fig 6.4 Alert Severity Confusion Matrix

## List of Tables
1. Table 5.1 Firestore Collection Design
2. Table 6.1 Performance Comparison

## 1. Abstract
EcoVision is a full-stack climate intelligence platform developed to provide real-time, location-aware environmental insights through a unified dashboard. The system integrates weather monitoring, air quality analysis, radar visualization, geospatial location search, and climate trend interpretation in one application. The platform is implemented using Next.js, React, and TypeScript, with modular API routes for data aggregation, preprocessing, validation, and low-latency delivery. Users can search cities or use GPS-based current location to retrieve contextual metrics such as temperature, humidity, wind speed, AQI, PM2.5, and PM10. The proposed architecture includes real-time update support and a lightweight prediction component for interpretable climate trend estimation. To support production scalability, a cloud extension model using Firebase and optional Vertex AI is defined for authentication, user personalization, secure data persistence, and natural-language climate assistance. The system improves environmental awareness and decision support by transforming fragmented raw climate data into clear, actionable, and user-centric intelligence.

## 2. Introduction and Problem Statement
Environmental data is increasingly available through public APIs and forecasting services; however, users often face fragmented access across multiple tools for weather, AQI, radar, and location analytics. Existing systems typically present raw values with limited personalization, minimal contextual interpretation, and weak integration across modules. This creates challenges in quickly understanding practical risk conditions such as poor air quality, high heat stress, and sudden weather changes.

The project addresses this gap by designing and implementing a unified climate intelligence platform that combines real-time monitoring, geospatial visualization, trend analysis, and intelligent summaries in a single interface. The goal is to improve interpretability, usability, and responsiveness for end users while maintaining a scalable architecture suitable for future enhancements.

## 3. Proposed Solution
The proposed solution is a modular, full-stack web platform with the following capabilities:

1. Multi-source environmental data ingestion from weather, air quality, radar, and geocoding providers.
2. Backend API orchestration for request validation, response normalization, caching, and error fallback.
3. User-friendly dashboard modules for weather, AQI, forecast, climate analytics, radar, and alerts.
4. Location-aware interaction through city search and geolocation.
5. Rule-based insight generation for understandable risk advisories.
6. Lightweight prediction logic for interpretable trend projections.
7. Optional cloud intelligence layer using Firebase and Vertex AI for personalization and conversational support.

## 4. System Architecture
EcoVision follows a layered architecture consisting of presentation, application processing, external data integration, optional cloud services, and output delivery.

### 4.1 Architecture Overview
- Frontend Layer: Dashboard UI, charts, location search, map visualization, and module navigation.
- Backend Layer: API routes for data fetching, validation, transformation, and insight logic.
- Integration Layer: Open-Meteo, RainViewer, and Nominatim services.
- Cloud Extension Layer: Firebase Auth, Firestore, optional Cloud Functions, and optional Vertex AI.
- Output Layer: Real-time and cached environmental insights for user consumption.

### 4.2 ASCII Architecture Diagram
```text
                           +-------------------------------+
                           |       External Data APIs      |
                           | Open-Meteo | RainViewer       |
                           | Nominatim  | Archive endpoints|
                           +---------------+---------------+
                                           |
                                           v
+-------------------+         +-------------------------------+         +---------------------------+
| Frontend (Next.js)| <-----> | Backend API Routes (Next.js) | <-----> | Firebase Extension Layer  |
| Dashboard + Maps  |         | Validation + Normalization    |         | Auth + Firestore          |
| Search + Charts   |         | Insight + Prediction Logic    |         | Cloud Functions           |
+---------+---------+         +---------------+---------------+         +-------------+-------------+
          |                                       |                                     |
          |                                       v                                     v
          +------------------------> +---------------------------+ <------> +--------------------------+
                                     | Real-time Output Delivery |          | Vertex AI (Optional)     |
                                     | AQI stream + dashboard    |          | NLP summaries/advisory   |
                                     +---------------------------+          +--------------------------+
```

Fig 4.1 System Architecture Diagram

## 5. Tech Stack Used and Justification
1. Next.js (App Router): Used for full-stack development with integrated frontend and API route capabilities.
2. React: Used for component-based UI composition and dynamic rendering.
3. TypeScript: Used to enforce type safety and improve maintainability.
4. Tailwind CSS: Used for responsive and consistent styling across dashboard modules.
5. Leaflet and React Leaflet: Used for geospatial maps, marker rendering, and location context.
6. Framer Motion: Used to improve visual flow and interaction quality.
7. Open-Meteo APIs: Used for weather, air quality, and historical climate data.
8. RainViewer API: Used for radar tile visualization.
9. Nominatim Geocoding: Used for location search and reverse geocoding.
10. Firebase Auth and Firestore (extension): Used for secure user identity and scalable NoSQL storage.
11. Vertex AI (extension): Used for optional natural-language climate insight generation.

## 6. Database Design (Firestore Schema)
Note: Current baseline implementation can run without Firestore. The following schema is the recommended production-grade extension.

### 6.1 users
- Purpose: Stores profile and preference metadata.
- Fields: uid, email, displayName, createdAt, preferredUnits, defaultCity, notificationEnabled.

### 6.2 saved_locations
- Purpose: Stores bookmarked user locations.
- Fields: uid, name, lat, lon, formattedAddress, createdAt, isPrimary.

### 6.3 alert_preferences
- Purpose: Stores personalized environmental alert thresholds.
- Fields: uid, aqiHighThreshold, tempHighThreshold, windHighThreshold, quietHours, channels.

### 6.4 alert_events
- Purpose: Stores generated alert records and status.
- Fields: uid, type, severity, message, metricSnapshot, locationRef, generatedAt, delivered.

### 6.5 climate_queries
- Purpose: Stores AI query metadata for audit and quality tuning.
- Fields: uid, prompt, responseSummary, contextLocation, createdAt, latencyMs.

### 6.6 reports
- Purpose: Stores generated report metadata and links.
- Fields: uid, reportType, location, timeRange, downloadUrl, createdAt.

### 6.7 system_metrics
- Purpose: Stores operational telemetry.
- Fields: endpoint, statusCode, latencyMs, timestamp, cacheHit, errorType.

## 7. Module Description
### 7.1 Landing and Overview Module
Provides project overview, quick navigation, and key environmental highlights.

### 7.2 Location Intelligence Module
Supports city search, result suggestions, reverse geocoding, and GPS location capture.

### 7.3 Weather Module
Displays current weather data and daily forecast indicators including temperature, humidity, and wind.

### 7.4 AQI Module
Displays live AQI and pollutant values with readable severity interpretation.

### 7.5 Radar Module
Displays precipitation/radar tiles for map-based weather awareness.

### 7.6 Climate Analytics Module
Displays trend-focused analytics for environmental metrics over time.

### 7.7 Prediction Module
Generates temperature trend projections from historical time-series data using a linear baseline.

### 7.8 Alerts and Insights Module
Generates advisory messages from threshold rules to support user decision-making.

### 7.9 Reporting Module
Supports export-oriented summaries for documentation and sharing.

## 8. AI Feature Explanation (Vertex AI Deep Dive)
Vertex AI integration is defined as an optional augmentation layer that converts measured metrics into contextual natural-language explanations.

1. Context Assembly: Backend composes structured context from weather, AQI, pollutant values, location, and trend information.
2. Prompt Engineering: System and user prompts are composed with environmental scope constraints.
3. Model Invocation: Vertex AI endpoint is called from server-side routes.
4. Structured Output: Responses can be constrained to JSON for deterministic frontend rendering.
5. Guardrails: Rule-based alerts remain authoritative; AI output is advisory.
6. Feedback Loop: Metadata can be logged in climate_queries for iterative prompt improvement.

Typical use cases include AQI impact explanations, daily local summaries, and non-technical interpretation of trend charts.

## 9. Security Implementation
### 9.1 Authentication Flow
1. User authentication is managed using Firebase Auth.
2. Auth tokens are verified before protected data access.
3. User data is constrained by ownership checks.
4. Unauthorized requests are rejected.

### 9.2 Firestore Security Rule Model
- Users can read/write only their own profile and preference documents.
- Sensitive operational documents are server-write only.
- Report and query records are user-scoped.
- Principle applied: least privilege and explicit allow paths.

### 9.3 Additional Security Controls
1. API keys stored server-side only.
2. Strict query parameter validation in API routes.
3. Rate limiting for abuse prevention.
4. HTTPS-only deployment.
5. Logging and monitoring for anomaly detection.

## 10. Deployment Architecture
The recommended deployment architecture is:

1. Next.js frontend and API routes deployed on Vercel or equivalent Node-compatible platform.
2. Environment variables managed through secure secret configuration.
3. Firebase services configured for auth and persistence.
4. Optional cloud functions for scheduled alert processing.
5. CDN caching for static assets and map resources.
6. Production monitoring for latency, availability, and error rates.

Deployment lifecycle:
Source control push -> CI build and checks -> deployment -> health validation -> observability and rollback readiness.

## 11. Future Enhancements
1. Hyperlocal forecasting for neighborhood-level environmental insights.
2. User health sensitivity profiles for personalized alert severity adaptation.
3. Multilingual assistant responses for regional accessibility.
4. Progressive web app mode with offline caching and sync.
5. Hybrid predictive models with seasonality and anomaly explainability.

## 12. Conclusion
EcoVision demonstrates that a unified, modular climate intelligence platform can significantly improve interpretability and usability of environmental data compared to fragmented monitoring workflows. The project successfully integrates real-time weather and air quality analytics, geospatial context, trend-oriented insights, and scalable architecture principles. The proposed cloud extension model with Firebase and Vertex AI further enables secure personalization and intelligent user interaction, making the solution suitable for academic demonstration and real-world expansion.

## Appendix A: Figure and Table Placeholders
Use the following placeholders while assembling the final report in Word/PDF.

[Insert Figure Here: Fig 5.1 Dataset Description]
Caption: Fig 5.1 Dataset Description

[Insert Figure Here: Fig 5.2 Data Sources and Preprocessing]
Caption: Fig 5.2 Data Sources and Preprocessing

[Insert Figure Here: Fig 5.3 Training and Testing Split]
Caption: Fig 5.3 Training and Testing Split

[Insert Figure Here: Fig 6.1 AQI Trend vs Time]
Caption: Fig 6.1 AQI Trend vs Time

[Insert Figure Here: Fig 6.2 Historical vs Predicted Temperature Trend]
Caption: Fig 6.2 Historical vs Predicted Temperature Trend

[Insert Figure Here: Fig 6.3 AI-Based Monitoring vs Traditional Monitoring]
Caption: Fig 6.3 AI-Based Monitoring vs Traditional Monitoring

[Insert Figure Here: Fig 6.4 Alert Severity Confusion Matrix]
Caption: Fig 6.4 Alert Severity Confusion Matrix

[Insert Table Here: Table 5.1 Firestore Collection Design]
Caption: Table 5.1 Firestore Collection Design

[Insert Table Here: Table 6.1 Performance Comparison]
Caption: Table 6.1 Performance Comparison