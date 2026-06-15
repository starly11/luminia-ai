#!/usr/bin/env python3
"""
Sub-Agent 1: Design Intelligence
Queries design patterns and returns actionable recommendations.
Usage: python3 design-intelligence.py "<industry or brand description>"
"""
import sys

topic = sys.argv[1] if len(sys.argv) > 1 else "premium tech brand"

print(f"\n{'='*60}")
print(f"DESIGN INTELLIGENCE AGENT")
print(f"Topic: {topic}")
print(f"{'='*60}\n")

# Design pattern database based on industry best practices
design_patterns = {
    "luxury": {
        "palette": ["#0F0F0F", "#D4AF37", "#FFFFFF", "#1A1A1A"],
        "palette_name": "Midnight Gold",
        "typography": {"heading": "Playfair Display", "body": "Inter"},
        "ui_style": "Minimalist luxury with generous whitespace",
        "motion": "Slow, elegant fades and subtle parallax"
    },
    "tech": {
        "palette": ["#0A0A0A", "#3B82F6", "#FFFFFF", "#1F2937"],
        "palette_name": "Electric Dark",
        "typography": {"heading": "Space Grotesk", "body": "Inter"},
        "ui_style": "Bold gradients, glass morphism, tech-forward",
        "motion": "GSAP scroll triggers, micro-interactions"
    },
    "healthcare": {
        "palette": ["#F0F9FF", "#0EA5E9", "#FFFFFF", "#0C4A6E"],
        "palette_name": "Trust Blue",
        "typography": {"heading": "Plus Jakarta Sans", "body": "Inter"},
        "ui_style": "Clean, trustworthy, rounded corners",
        "motion": "Gentle slides, confidence-building animations"
    },
    "finance": {
        "palette": ["#020617", "#10B981", "#FFFFFF", "#1E293B"],
        "palette_name": "Wealth Green",
        "typography": {"heading": "Manrope", "body": "Inter"},
        "ui_style": "Professional, data-driven, sharp edges",
        "motion": "Count-up animations, smooth transitions"
    },
    "creative": {
        "palette": ["#FAFAFA", "#F43F5E", "#000000", "#FECDD3"],
        "palette_name": "Bold Pop",
        "typography": {"heading": "Clash Display", "body": "Satoshi"},
        "ui_style": "Asymmetric layouts, bold typography",
        "motion": "Kinetic typography, hover effects"
    }
}

# Detect best match
keywords = topic.lower().split()
best_match = "tech"  # default
for kw in keywords:
    if kw in ["luxury", "premium", "high-end", "expensive"]:
        best_match = "luxury"
        break
    elif kw in ["tech", "saas", "software", "ai", "startup"]:
        best_match = "tech"
        break
    elif kw in ["health", "medical", "wellness", "clinic"]:
        best_match = "healthcare"
        break
    elif kw in ["finance", "fintech", "bank", "investment", "crypto"]:
        best_match = "finance"
        break
    elif kw in ["creative", "agency", "portfolio", "design"]:
        best_match = "creative"
        break

pattern = design_patterns[best_match]

print("📊 RECOMMENDED DESIGN SYSTEM:")
print(f"\n🎨 Color Palette: {pattern['palette_name']}")
for i, color in enumerate(pattern['palette']):
    print(f"   {i+1}. {color}")

print(f"\n🔤 Typography:")
print(f"   Headings: {pattern['typography']['heading']}")
print(f"   Body: {pattern['typography']['body']}")

print(f"\n🖼️ UI Style: {pattern['ui_style']}")
print(f"\n✨ Motion Strategy: {pattern['motion']}")

print(f"\n💡 ACTION ITEMS:")
print(f"   1. Add fonts from Google Fonts or self-host")
print(f"   2. Define CSS variables for colors in index.css")
print(f"   3. Apply UI style consistently across all components")
print(f"   4. Implement motion with GSAP or Framer Motion")

print(f"\n{'='*60}")
