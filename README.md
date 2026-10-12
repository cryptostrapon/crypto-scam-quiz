# Crypto Scam Detection Quiz

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23326039.svg)](https://doi.org/10.5281/zenodo.23326039)

A free, open-source, interactive quiz that trains people to recognize crypto scam patterns before they fall for them. 50 scenarios based on scam patterns we have observed in our investigations — Ponzi schemes, wallet drainers, approval phishing, fake tokens/honeypots, bridge exploits, AI deepfakes, OTC fraud, money laundering, and more.

**Live demo:** https://cryptostrapon.github.io/crypto-scam-quiz/
**Full write-ups of each case:** https://cryptostrapon.com/dark-bits

## Why this exists

Most scam-awareness content is a static list of "red flags to watch for." It doesn't test whether the reader can actually *apply* that knowledge under the same pressure a real scam creates (urgency, authority, too-good-to-be-true offers). The scenarios are based on patterns observed in investigations, with specific names, amounts and identifying details removed or generalised, so they read the way scams actually happen, not the way a listicle summarizes them.

Each session draws 8 random questions from the pool of 50, so repeat attempts stay useful.

## Project structure

```
index.html       Single-file static quiz (vanilla HTML/CSS/JS, no build step, no dependencies)
questions.json    The full question bank — scenario, question, 4 options, correct answer, explanation, severity, category
```

## Running it locally

No build tools needed — it's a static site.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly in a browser (fetch of `questions.json` needs a local server due to CORS on `file://`, so the simple HTTP server above is the easiest path).

## Contributing

New scenarios, corrections, translations, and accessibility improvements are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

If you add a new scenario, please include:
- A realistic `scenario` (what the victim sees/experiences)
- A clear `question`
- Exactly 4 `options`
- `correctAnswer` (0-indexed)
- An `explanation` that teaches the underlying pattern, not just "this one is right"
- `severity` (`critical` or `high`)
- `category`

## License

- Code (`index.html` and any scripts): [MIT](LICENSE)
- Question content (`questions.json`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — reuse freely with attribution to CryptoStrapon. Full notice: [LICENSE-CONTENT.md](LICENSE-CONTENT.md).
- Citing: see [CITATION.cff](CITATION.cff). Security reports: see [SECURITY.md](SECURITY.md).
- Write-up: [An open crypto-scam quiz in one HTML file](https://dev.to/cryptostrapon/an-open-crypto-scam-quiz-in-one-html-file-no-build-step-mit-code-cc-by-40-content-47d9) (dev.to).

## About

Maintained by [CryptoStrapon](https://cryptostrapon.com) — a free AI scam detector and crypto-scam education hub. We investigate crypto scams and build free tools so people don't have to learn these lessons the expensive way.
