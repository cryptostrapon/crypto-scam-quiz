# Contributing

Thanks for helping improve the Crypto Scam Detection Quiz. Small fixes are as welcome as new scenarios.

## Quick ways to help

- Suggest a scenario: use the "Suggest a scenario" issue form.
- Report a wrong fact, broken link or guessable answer: use the "Report an inaccuracy" issue form.
- Ideas, translations and questions: start a thread in Discussions.
- Open issues labelled "good first issue" and "help wanted" are a good place to start.

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
4. Base new scenarios on observed scam patterns. If your scenario draws on a public incident, link a source in your PR description (news coverage, a post-mortem, a chain-analysis report, etc.); otherwise describe the pattern in general terms.
5. Keep explanations focused on the *pattern* (what generalizes) rather than just "the right answer is C."

## Answer quality rules (since v1.1)

The quiz must not be passable by guessing from the shape of the answers. Please check before opening a PR:

- All four options are similar in length. The correct option must not be the longest one by default, and no option should be more than about 1.3 times longer than another.
- The correct answer is spread across positions A to D over the pool (no position should dominate).
- Wrong options are plausible, not obviously silly, and no two options mean the same thing.
- The question wording points to one clear answer.

## Reporting a bug or factual error

Open an issue using the forms. If a scenario is factually inaccurate or outdated (e.g. a scam technique that has since been patched or deprecated), please include a source for the correction.

## Code changes

`index.html` is intentionally dependency-free (no build step, no frameworks) so it stays easy to audit and host anywhere. Please keep it that way. If a change needs a build step, open an issue first to discuss.

## Code of conduct

Be respectful. This project exists to help people avoid losing money to fraud, so keep contributions focused on that goal.

## Licensing of contributions

By contributing, you agree that code you submit is licensed under the MIT License and content you submit is licensed under CC BY 4.0, matching the rest of the repository.
