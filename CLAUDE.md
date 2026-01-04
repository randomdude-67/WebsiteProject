# CLAUDE.md


## Pommel - Semantic Code Search

This project uses Pommel (v0.5.2) for semantic code search. Pommel indexes your codebase into semantic chunks and enables natural language search with hybrid vector + keyword matching.

**Supported platforms:** macOS, Linux, Windows
**Supported languages:** C#, Dart, Elixir, Go, Java, JavaScript, Kotlin, PHP, Python, Rust, Solidity, Swift, TypeScript

### Code Search Decision Tree

**Use `pm search` FIRST for:**
- Finding specific implementations ("where is X implemented")
- Quick code lookups when you know what you're looking for
- Iterative exploration (multiple related searches)
- Cost/time-sensitive tasks (~18x fewer tokens, 1000x+ faster)

**Fall back to Explorer/Grep when:**
- Verifying something does NOT exist (Pommel may return false positives)
- Understanding architecture or code flow relationships
- Need full context around matches (not just snippets)
- Searching for exact string literals (specific error messages, identifiers)

**Decision rule:** Start with `pm search`. If results seem off-topic or you need to confirm absence, use Explorer.

### When to Use Which Tool

| Use Case                         | Recommended Tool          |
|----------------------------------|---------------------------|
| Quick code lookup                | Pommel                    |
| Understanding architecture       | Explorer                  |
| Finding specific implementations | Pommel                    |
| Verifying if feature exists      | Explorer                  |
| Iterative exploration            | Pommel                    |
| Comprehensive documentation      | Explorer                  |
| Cost-sensitive workflows         | Pommel (18x fewer tokens) |
| Time-sensitive tasks             | Pommel (1000x+ faster)    |

### Quick Search Examples
```bash
# Find code by semantic meaning (not just keywords)
pm search "authentication logic"
pm search "error handling patterns"

# Search with JSON output for programmatic use
pm search "user validation" --json

# Limit results and filter by chunk level
pm search "API endpoints" --limit 5
pm search "class definitions" --level class

# Show detailed match reasons and score breakdown
pm search "rate limiting" --verbose
```

### Available Commands
- `pm search <query>` - Hybrid semantic + keyword search (~18x fewer tokens than grep)
- `pm status` - Check daemon status and index statistics
- `pm reindex` - Force a full reindex of the codebase
- `pm start` / `pm stop` - Control the background daemon

### Tips
- **Low scores (< 0.5) suggest weak matches** - consider using Explorer to confirm
- Use natural language queries - Pommel understands semantic meaning
- Keep the daemon running (`pm start`) for always-current search results
- Use `--verbose` to see why results matched (helpful for tuning queries)
