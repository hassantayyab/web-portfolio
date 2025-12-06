#!/bin/bash

# Contact Form Setup Script
# This script helps you configure the contact form for your portfolio

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   Contact Form Setup for Portfolio Website${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local already exists${NC}"
    echo -e "${YELLOW}Do you want to overwrite it? (y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo -e "${BLUE}Setup cancelled. Your existing .env.local was not modified.${NC}"
        exit 0
    fi
fi

# Create .env.local from template
echo -e "${GREEN}Creating .env.local file...${NC}"
cp .env.example .env.local

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   Step 1: Resend API Key${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "To send emails, you need a Resend API key."
echo ""
echo "1. Go to: ${BLUE}https://resend.com${NC}"
echo "2. Sign up for a free account (100 emails/day)"
echo "3. Navigate to 'API Keys' in the dashboard"
echo "4. Click 'Create API Key'"
echo "5. Copy the key (it starts with 're_')"
echo ""
echo -e "${YELLOW}Enter your Resend API key (or press Enter to skip):${NC}"
read -r resend_key

if [ -n "$resend_key" ]; then
    # Update .env.local with the API key
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|^RESEND_API_KEY=.*|RESEND_API_KEY=$resend_key|" .env.local
    else
        # Linux
        sed -i "s|^RESEND_API_KEY=.*|RESEND_API_KEY=$resend_key|" .env.local
    fi
    echo -e "${GREEN}✓ Resend API key configured${NC}"
else
    echo -e "${YELLOW}⚠️  Skipped. You can add it later in .env.local${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   Step 2: Contact Email${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "This is where contact form submissions will be sent."
echo ""
echo -e "${YELLOW}Enter your email address (or press Enter to skip):${NC}"
read -r contact_email

if [ -n "$contact_email" ]; then
    # Validate email format
    if [[ "$contact_email" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|^CONTACT_EMAIL=.*|CONTACT_EMAIL=$contact_email|" .env.local
        else
            sed -i "s|^CONTACT_EMAIL=.*|CONTACT_EMAIL=$contact_email|" .env.local
        fi
        echo -e "${GREEN}✓ Contact email configured${NC}"
    else
        echo -e "${RED}✗ Invalid email format. Please edit .env.local manually${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipped. You can add it later in .env.local${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   Step 3: Site URL${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Current setting: http://localhost:3000"
echo ""
echo -e "${YELLOW}Enter your site URL for production (or press Enter to use localhost):${NC}"
read -r site_url

if [ -n "$site_url" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=$site_url|" .env.local
    else
        sed -i "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=$site_url|" .env.local
    fi
    echo -e "${GREEN}✓ Site URL configured${NC}"
else
    echo -e "${GREEN}✓ Using localhost for development${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   Setup Complete! 🎉${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check what was configured
configured=0
if grep -q "^RESEND_API_KEY=re_" .env.local; then
    echo -e "${GREEN}✓ Resend API key configured${NC}"
    ((configured++))
else
    echo -e "${YELLOW}⚠️  Resend API key not configured${NC}"
fi

if grep -q "^CONTACT_EMAIL=..*@" .env.local; then
    echo -e "${GREEN}✓ Contact email configured${NC}"
    ((configured++))
else
    echo -e "${YELLOW}⚠️  Contact email not configured${NC}"
fi

echo ""
if [ $configured -eq 2 ]; then
    echo -e "${GREEN}Your contact form is ready to use!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: ${BLUE}npm run dev${NC}"
    echo "2. Visit: ${BLUE}http://localhost:3000/contact${NC}"
    echo "3. Test the contact form"
    echo ""
    echo "For detailed setup and testing instructions, see:"
    echo "  • ${BLUE}CONTACT_FORM_SETUP.md${NC}"
    echo "  • ${BLUE}TESTING_CONTACT_FORM.md${NC}"
else
    echo -e "${YELLOW}Additional configuration required${NC}"
    echo ""
    echo "Please edit .env.local and add:"
    if ! grep -q "^RESEND_API_KEY=re_" .env.local; then
        echo "  • RESEND_API_KEY (get from https://resend.com)"
    fi
    if ! grep -q "^CONTACT_EMAIL=..*@" .env.local; then
        echo "  • CONTACT_EMAIL (your email address)"
    fi
    echo ""
    echo "See ${BLUE}CONTACT_FORM_SETUP.md${NC} for detailed instructions."
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

