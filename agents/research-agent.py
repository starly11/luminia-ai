#!/usr/bin/env python3
"""
Sub-Agent 6: Research Agent
Fetches and parses URLs for design inspiration and competitive research.
Usage: python3 research-agent.py "<url or topic>"
"""
import sys, urllib.request, re

topic = sys.argv[1] if len(sys.argv) > 1 else "premium landing page"

gallery_urls = {
    "inspiration": "https://godly.website/",
    "landing": "https://www.lapa.ninja/",
    "awards": "https://www.awwwards.com/websites/sites_of_the_day/",
    "codrops": "https://tympanus.net/codrops/hub/",
    "producthunt": "https://www.producthunt.com/topics/developer-tools",
}

print(f"\n{'='*60}")
print(f"RESEARCH AGENT")
print(f"Topic: {topic}")
print(f"{'='*60}\n")

if topic.startswith("http"):
    urls = [topic]
else:
    urls = [v for k, v in gallery_urls.items() if k in topic.lower() or topic.lower() in k]
    if not urls:
        urls = list(gallery_urls.values())[:2]

for url in urls[:2]:
    try:
        print(f"Fetching: {url}")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            html = r.read().decode("utf-8", errors="ignore")
        text = re.sub(r'<[^>]+>', ' ', html)
        lines = [l.strip() for l in text.splitlines() if len(l.strip()) > 40]
        print('\n'.join(lines[:40]))
        print()
    except Exception as e:
        print(f"Could not fetch {url}: {e}")
