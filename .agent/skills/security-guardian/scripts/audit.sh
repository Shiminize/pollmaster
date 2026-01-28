#!/bin/bash

# Security Guardian Audit Script

echo "🛡️  Starting Security Guardian Audit..."

# 1. NPM/PNPM Audit
echo "📦 Running Package Audit..."

if [ -f "pnpm-lock.yaml" ]; then
    echo "Detected pnpm-lock.yaml, using pnpm audit..."
    pnpm audit --prod --audit-level=high
elif [ -f "package-lock.json" ]; then
    echo "Detected package-lock.json, using npm audit..."
    npm audit --production --audit-level=high
else
    echo "⚠️  No lockfile found! Skipping package audit."
fi

if [ $? -eq 0 ]; then
    echo "✅ Package Audit Passed"
else
    echo "⚠️  Vulnerabilities Found!"
fi

# 2. Check for .env inclusions in git
echo "🔍 Checking for .env files in git tracking..."
if git ls-files .env .env.local; then
    echo "❌ CRITICAL: .env file found in git!"
    exit 1
else
    echo "✅ No .env files tracked in git"
fi

echo "🛡️  Audit Complete."
