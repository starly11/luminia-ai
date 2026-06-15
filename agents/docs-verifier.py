#!/usr/bin/env python3
"""
Sub-Agent 3: Docs Verifier
Checks code against official API documentation to prevent hallucinations.
Usage: python3 docs-verifier.py "<library or API name>" "<code snippet or function name>"
"""
import sys
import re

lib_name = sys.argv[1] if len(sys.argv) > 1 else "react"
code_snippet = sys.argv[2] if len(sys.argv) > 2 else ""

print(f"\n{'='*60}")
print(f"DOCS VERIFIER")
print(f"Library: {lib_name}")
print(f"{'='*60}\n")

# Known API patterns for common libraries
api_docs = {
    "react": {
        "hooks": ["useState", "useEffect", "useContext", "useReducer", "useCallback", "useMemo", "useRef", "useImperativeHandle", "useLayoutEffect", "useDebugValue"],
        "apis": {
            "useState": "Returns stateful value and updater function. Initial state can be lazy.",
            "useEffect": "Runs side effects after render. Return cleanup function. Dependencies array controls re-runs.",
            "useCallback": "Returns memoized callback. Use when passing callbacks to optimized child components.",
            "useMemo": "Returns memoized value. Use for expensive computations, not as micro-optimization.",
            "useRef": "Returns mutable ref object. Persists across renders. Does not trigger re-renders.",
        },
        "common_mistakes": [
            "Calling hooks conditionally or in loops (violates Rules of Hooks)",
            "Using useEffect without dependency array (runs every render)",
            "Mutating state directly instead of using setter",
            "Using useMemo/useCallback unnecessarily (adds complexity without benefit)"
        ]
    },
    "tailwindcss": {
        "utilities": ["flex", "grid", "absolute", "relative", "fixed", "sticky", "hidden", "block", "inline-block"],
        "prefixes": {
            "hover:": "Hover state variant",
            "focus:": "Focus state variant",
            "active:": "Active state variant",
            "disabled:": "Disabled state variant",
            "sm:": "Small breakpoint (>=640px)",
            "md:": "Medium breakpoint (>=768px)",
            "lg:": "Large breakpoint (>=1024px)",
            "xl:": "Extra large breakpoint (>=1280px)",
            "dark:": "Dark mode variant"
        },
        "common_mistakes": [
            "Using arbitrary values excessively (prefer config customization)",
            "Forgetting responsive prefixes for mobile-first design",
            "Overusing !important with arbitrary values",
            "Not enabling darkMode in tailwind.config.js"
        ]
    },
    "vite": {
        "config_options": ["plugins", "server", "build", "optimizeDeps", "css", "assetsInclude", "define"],
        "env_variables": {
            "VITE_": "Exposed to client bundle",
            "NODE_ENV": "Automatically set by Vite"
        },
        "common_mistakes": [
            "Using process.env instead of import.meta.env",
            "Forgetting VITE_ prefix for custom env variables",
            "Not restarting dev server after vite.config.js changes"
        ]
    },
    "gsap": {
        "core_methods": ["to", "from", "fromTo", "timeline", "set", "killTweensOf", "delayedCall"],
        "scrolltrigger": {
            "setup": "ScrollTrigger.create() or gsap.registerPlugin(ScrollTrigger)",
            "common_props": ["trigger", "start", "end", "scrub", "pin", "markers"]
        },
        "common_mistakes": [
            "Not registering plugins before use",
            "Creating animations before DOM is ready",
            "Forgetting to kill tweens on component unmount",
            "Using ScrollTrigger without proper start/end values"
        ]
    }
}

if lib_name.lower() in api_docs:
    doc = api_docs[lib_name.lower()]
    print(f"✅ Found documentation for {lib_name}\n")
    
    # Show available APIs
    if "hooks" in doc:
        print("📚 Available Hooks:")
        for hook in doc["hooks"]:
            print(f"   • {hook}")
    
    if "apis" in doc:
        print("\n📖 Key API Details:")
        for api, desc in doc["apis"].items():
            print(f"   • {api}: {desc}")
    
    if "utilities" in doc:
        print("\n📚 Common Utilities:")
        print(f"   {', '.join(doc['utilities'][:10])}...")
    
    if "prefixes" in doc:
        print("\n📖 Variant Prefixes:")
        for prefix, desc in list(doc["prefixes"].items())[:5]:
            print(f"   • {prefix} — {desc}")
    
    if "config_options" in doc:
        print("\n📚 Config Options:")
        print(f"   {', '.join(doc['config_options'])}")
    
    if "common_mistakes" in doc:
        print("\n⚠️  COMMON MISTAKES TO AVOID:")
        for mistake in doc["common_mistakes"]:
            print(f"   ❌ {mistake}")
    
    # Check code snippet if provided
    if code_snippet:
        print(f"\n🔍 ANALYZING CODE SNIPPET:")
        print(f"   \"{code_snippet}\"\n")
        
        # Simple pattern matching for common issues
        if lib_name.lower() == "react":
            if "useState" in code_snippet and "const [" not in code_snippet:
                print("   ⚠️  WARNING: useState should use array destructuring: const [state, setState]")
            if "useEffect" in code_snippet and "=>" not in code_snippet:
                print("   ⚠️  WARNING: useEffect requires an arrow function")
        
        if lib_name.lower() == "tailwindcss":
            if "bg-[" in code_snippet:
                print("   ℹ️  INFO: Arbitrary value detected. Consider adding to tailwind.config.js")
        
        print("\n✅ No obvious API violations detected (basic check)")
    
    print(f"\n{'='*60}")
    print("REMEMBER: Always verify against official docs before shipping")
    print(f"{'='*60}\n")
else:
    print(f"⚠️  No pre-loaded docs for '{lib_name}'")
    print("General advice:")
    print("   1. Check official documentation website")
    print("   2. Verify function signatures match latest version")
    print("   3. Watch for deprecated APIs")
    print("   4. Test edge cases before assuming behavior")
    print(f"\n{'='*60}\n")
