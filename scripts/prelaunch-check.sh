#!/usr/bin/env bash

set -euo pipefail

echo ""
echo "EstateAI pre-launch check"
echo "========================="
echo ""

echo "1. Checking required files..."

required_files=(
  "app/page.tsx"
  "app/examples/page.tsx"
  "app/request/page.tsx"
  "app/privacy/page.tsx"
  "app/terms/page.tsx"
  "app/p/[slug]/page.tsx"
  "components/PublicHeader.tsx"
  "components/PublicFooter.tsx"
  "components/ContactRequestForm.tsx"
  "components/PricingSection.tsx"
  "components/TrustSection.tsx"
  "components/TrackedLink.tsx"
  "lib/contact.ts"
  "public/og-image.png"
)

for file in "${required_files[@]}"; do
  if [ ! -e "$file" ]; then
    echo "Missing file: $file"
    exit 1
  fi
done

echo "Required files exist."
echo ""

echo "2. Checking for old placeholder email..."

if grep -R "hello@estateai.gr" app components lib --exclude-dir=node_modules --exclude-dir=.next; then
  echo "Old placeholder email found. Replace it before launch."
  exit 1
else
  echo "No old placeholder email found."
fi

echo ""

echo "3. Checking public pages for unwanted MVP words..."

if grep -R -i "mockup\|frontend mock\|simulation\|processing demo\|upload mockup" \
  app/page.tsx \
  app/examples \
  app/request \
  app/p \
  components/PublicHeader.tsx \
  components/PublicFooter.tsx \
  components/ContactRequestForm.tsx \
  components/PricingSection.tsx \
  components/TrustSection.tsx; then
  echo "Unwanted public wording found. Clean it before sending to realtors."
  exit 1
else
  echo "No unwanted public MVP wording found."
fi

echo ""

echo "4. Checking environment variable names are referenced..."

if ! grep -R "RESEND_API_KEY" app/api lib components >/dev/null 2>&1; then
  echo "RESEND_API_KEY is not referenced. Contact API may be missing."
  exit 1
fi

if ! grep -R "CONTACT_TO_EMAIL" app/api lib components >/dev/null 2>&1; then
  echo "CONTACT_TO_EMAIL is not referenced. Contact API may be incomplete."
  exit 1
fi

echo "Email environment references found."
echo ""

echo "5. Checking git status..."

if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes:"
  git status --short
  echo ""
  echo "This is not fatal, but commit before final launch."
else
  echo "Git working tree is clean."
fi

echo ""

echo "6. Running production build..."
npm run build

echo ""
echo "Pre-launch check completed."
echo ""
echo "Now manually test the deployed Vercel site on desktop and iPhone."
