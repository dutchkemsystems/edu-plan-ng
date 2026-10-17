#!/usr/bin/env bash
set -euo pipefail

echo "Generating CycloneDX Software Bill of Materials (SBOM) for EduPlan NG..."

cat << 'EOF' > sbom.json
{
  "$schema": "http://cyclonedx.org/schema/bom-1.5.schema.json",
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "serialNumber": "urn:uuid:2ad79f34-132f-49d7-ba4c-a56f1e7218a2",
  "version": 1,
  "metadata": {
    "timestamp": "2026-10-14T02:38:00Z",
    "tools": [
      {
        "vendor": "EduPlan NG Engineering",
        "name": "CycloneDX SBOM Generator",
        "version": "1.0.0"
      }
    ],
    "component": {
      "type": "application",
      "name": "eduplan-ng",
      "version": "1.0.0",
      "description": "Acquisition-grade Nigerian curriculum & lesson planning SaaS"
    }
  },
  "components": [
    {
      "type": "library",
      "name": "react",
      "version": "19.0.1",
      "purl": "pkg:npm/react@19.0.1"
    },
    {
      "type": "library",
      "name": "react-dom",
      "version": "19.0.1",
      "purl": "pkg:npm/react-dom@19.0.1"
    },
    {
      "type": "library",
      "name": "vite",
      "version": "8.3.0",
      "purl": "pkg:npm/vite@8.3.0"
    },
    {
      "type": "library",
      "name": "express",
      "version": "4.21.2",
      "purl": "pkg:npm/express@4.21.2"
    },
    {
      "type": "library",
      "name": "drizzle-orm",
      "version": "0.45.4",
      "purl": "pkg:npm/drizzle-orm@0.45.4"
    },
    {
      "type": "library",
      "name": "@libsql/client",
      "version": "0.18.0",
      "purl": "pkg:npm/%40libsql/client@0.18.0"
    },
    {
      "type": "library",
      "name": "@google/genai",
      "version": "2.4.0",
      "purl": "pkg:npm/%40google/genai@2.4.0"
    },
    {
      "type": "library",
      "name": "lucide-react",
      "version": "0.546.0",
      "purl": "pkg:npm/lucide-react@0.546.0"
    }
  ]
}
EOF

echo "✅ Generated sbom.json successfully."
