#!/usr/bin/env python3
"""
Sub-Agent 5: Conversion Auditor
Reads page source files and checks against CXL conversion rules.
Usage: python3 conversion-auditor.py <project-path>
"""
import sys, os, re, glob

project = sys.argv[1] if len(sys.argv) > 1 else "/workspace/projects/current"
src_path = os.path.join(project, "src")

print(f"\n{'='*60}")
print(f"CONVERSION AUDITOR")
print(f"Project: {project}")
print(f"{'='*60}\n")

# Read all TSX files
tsx_files = glob.glob(f"{src_path}/**/*.tsx", recursive=True)
all_content = ""
for f in tsx_files:
    try:
        with open(f) as fp:
            all_content += fp.read()
    except:
        pass

if not all_content:
    print("No TSX files found. Run after project is scaffolded.")
    sys.exit(0)

checks = [
    ("HERO: Clear headline present", bool(re.search(r'h1|Hero|headline', all_content, re.I))),
    ("HERO: Single primary CTA", len(re.findall(r'<button|<Button|<Link.*?CTA|primary.*?btn', all_content, re.I)) >= 1),
    ("COPY: Outcome language (not feature)", not bool(re.search(r'lorem ipsum|placeholder|TODO|Enter your', all_content, re.I))),
    ("SOCIAL PROOF: Present", bool(re.search(r'testimonial|review|trust|client|case study', all_content, re.I))),
    ("MOBILE: Responsive classes", bool(re.search(r'sm:|md:|lg:|xl:', all_content))),
    ("MOTION: Animations present", bool(re.search(r'gsap|motion|animate|transition|ScrollTrigger', all_content, re.I))),
    ("FORMS: Minimal fields", len(re.findall(r'<input|<Input', all_content, re.I)) <= 3),
    ("LENIS: Smooth scroll", bool(re.search(r'lenis|Lenis', all_content))),
    ("ANTI-GENERIC: No lorem ipsum", not bool(re.search(r'lorem ipsum', all_content, re.I))),
    ("ANTI-GENERIC: No blue default button", not bool(re.search(r'bg-blue-500.*?Submit|btn-primary.*?Get Started', all_content))),
]

passed = 0
for label, result in checks:
    icon = "✅" if result else "❌"
    print(f"{icon} {label}")
    if result:
        passed += 1

print(f"\nScore: {passed}/{len(checks)}")
if passed < len(checks) * 0.7:
    print("⚠️  Below 70% — do NOT ship. Fix failing checks first.")
else:
    print("✓ Conversion audit passed.")
