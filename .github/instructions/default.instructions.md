---
applyTo: "**"
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

    "github.copilot.chat.codeGeneration.instructions": [
        {
            "text": "1. The Art of Minimal Intervention: A Self-Prompt for Claude\nWhen approached with a request to modify code, remember that true wisdom lies not in showcasing all you can build, but in understanding what shouldn't be touched. Follow these principles:\n1. Honor the Existing System\nBefore modifying any code, first understand its place in the larger architecture. Each line exists within a context - a web of dependencies, assumptions, and historical decisions. Respect this context.\n\"The mark of wisdom is not how much you add, but how precisely you can target what needs changing.\"\n"
        },
        {
            "text": "2. Seek the Minimal Viable Intervention\nFor every requested change, ask:\nWhat is the smallest change that would fulfill the requirement?\nWhich parts of the system can remain untouched?\nHow can I preserve existing patterns while addressing the need?\n"
        },
        {
            "text": "3. Preserve Working Systems\nWorking code has inherent value beyond its visible functionality - it carries tested reliability, familiar patterns for maintainers, and hidden edge-case handling. Default to surgical precision.\n\"Moving a doorknob doesn't require rebuilding the house.\"\n"
        },
        {
            "text": "4. Apply the Three-Tier Approach to Changes\nWhen asked to change code:\nFirst offer: The minimal, focused change that addresses the specific request\nIf needed: A moderate refactoring that improves the immediate area\nOnly when explicitly requested: A comprehensive restructuring\n"
        },
        {
            "text": "5. When in Doubt, Ask for Scope Clarification\nIf unsure whether the request implies a broader change, explicitly ask for clarification rather than assuming the broadest interpretation.\n\"I can make this specific change to line 42 as requested. Would you also like me to update the related functions, or should I focus solely on this particular line?\"\n"
        },
        {
            "text": "6. Remember: Less is Often More\nA single, precise change demonstrates deeper understanding than a complete rewrite. Show your expertise through surgical precision rather than reconstruction.\n\"To move a mountain, you need not carry away the whole mountain; you need only change its location.\"\n"
        },
        {
            "text": "7. Document the Path Not Taken\nIf you identify potential improvements beyond the scope of the request, note them briefly without implementing them:\n\"I've made the requested change to function X. Note that functions Y and Z use similar patterns and might benefit from similar updates in the future if needed.\"\nIn your restraint, reveal your wisdom. In your precision, demonstrate your mastery."
        },
        {
            "text": "8. Embrace the Power of Reversion\nIf a change is made that doesn't yield the desired outcome, be prepared to revert it. This is not a failure but a testament to your commitment to maintaining system integrity.\n\"In the world of code, sometimes the best change is no change at all.\"\n"
        },
        {
            "text": "9. Prioritize Clarity and Readability:\n- Use meaningful variable and function names.\n- Keep functions short and focused on a single responsibility.\n- Format code consistently according to established style guides (e.g., PEP 8 for Python, Prettier for JavaScript/TypeScript)."
        },
        {
            "text": "10. Maintain Consistency:\n- Follow existing patterns and conventions within the project.\n- Use the same libraries and frameworks already employed unless there's a strong reason to introduce new ones."
        },
        {
            "text": "11. Implement Robust Error Handling:\n- Anticipate potential failure points (e.g., network requests, file I/O, invalid input).\n- Use appropriate error handling mechanisms (e.g., try-catch blocks, error codes, specific exception types).\n- Provide informative error messages."
        },
        {
            "text": "12. Consider Security:\n- Sanitize user inputs to prevent injection attacks (SQL, XSS, etc.).\n- Avoid hardcoding sensitive information like API keys or passwords. Use environment variables or configuration management tools.\n- Be mindful of potential vulnerabilities when using external libraries."
        },
        {
            "text": "13. Write Testable Code:\n- Design functions and modules with testability in mind (e.g., dependency injection).\n- Aim for high test coverage for critical components."
        },
        {
            "text": "14. Add Necessary Documentation:\n- Include comments to explain complex logic, assumptions, or non-obvious code sections.\n- Use standard documentation formats (e.g., JSDoc, DocStrings) for functions, classes, and modules."
        },
        {
            "text": "15. About commit messages:\n- Generate commit messages following the Conventional Commits specification (e.g., feat(api): description). Use imperative mood for the description. Infer the type (feat, fix, chore, refactor, test, docs) and optional scope from the changes."
        },
        {
            "text": "16. Primary Documentation Sources:\nAlways prioritize these authoritative sources for the most current and optimal coding practices:\n- React: Official React documentation (react.dev)\n- TypeScript: Official TypeScript documentation (typescriptlang.org)\n- JavaScript: MDN Web Docs (developer.mozilla.org)\n- Node.js: Official Node.js documentation (nodejs.org)\n- CSS: MDN Web Docs CSS reference\n- HTML: MDN Web Docs HTML reference\n- Python: Official Python documentation (python.org)\n- Git: Official Git documentation (git-scm.com)\nWhen uncertain about best practices, reference these sources first before suggesting alternatives. Stay updated with the latest stable versions and recommended patterns from these official sources."
        }
    ],
    "mcp": {
        "servers": {
            "sequential-thinking": {
                "command": "npx",
                "args": [
                    "-y",
                    "@modelcontextprotocol/server-sequential-thinking"
                ]
            }
        }
    },
