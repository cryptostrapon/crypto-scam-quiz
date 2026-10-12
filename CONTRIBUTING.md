# Contributing

Thanks for considering a contribution to the Crypto Scam Detection Quiz.

## Adding or correcting a scenario

1. Fork the repo and edit `questions.json`.
2. Follow the existing object shape:
   ```json
   {
     "id": 52,
     "scenario": "What the target actually sees or is told.",
     "question": "What are we asking them to identify?",
     "options": ["...", "...", "...", "..."],
     "correctAnswer": 2,
     "explanation": "Why that's the answer, and what pattern to generalize from it.",
     "severity": "critical",
     "category": "Short category label"
   }
   ```
3. Keep `id` unique and sequential.
3. Base new scenarios on observed scam patterns. If your scenario draws on a public incident, link a source in your PR description (news coverage, a post-mortem, a chain-analysis report, etc.); otherwise describe the pattern in general terms.
4. Keep explanations focused on the *pattern* (what generalizes) rather than just "the right answer is C."

## Reporting a bug or factual error

Open an issue describing what's wrong. If a scenario is factually inaccurate or outdated (e.g. a scam technique that's since been patched/deprecated), please include a source for the correction.

## Code changes

`index.html` is intentionally dependency-free (no build step, no frameworks) so it stays easy to audit and host anywhere. Please keep it that way — if a change needs a build step, open an issue first to discuss.

## Code of conduct

Be respectful. This project exists to help people avoid losing money to fraud — keep contributions focused on that goal.

## Licensing of contributions

By contributing, you agree that code you submit is licensed under the MIT License and content you submit is licensed under CC BY 4.0, matching the rest of the repository.
