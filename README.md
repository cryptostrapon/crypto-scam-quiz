# Crypto Scam Detection Quiz

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23326039.svg)](https://doi.org/10.5281/zenodo.23326039)
[![Code: MIT](https://img.shields.io/badge/code-MIT-green)](LICENSE) [![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-blue)](LICENSE-CONTENT.md) ![Scenarios: 50](https://img.shields.io/badge/scenarios-50-orange) [![Live demo](https://img.shields.io/badge/live-demo-brightgreen)](https://cryptostrapon.github.io/crypto-scam-quiz/)

A free, open-source, interactive quiz that trains people to recognize crypto scam patterns before they fall for them. 50 scenarios based on scam patterns we have observed in our investigations — Ponzi schemes, wallet drainers, approval phishing, fake tokens/honeypots, bridge exploits, AI deepfakes, OTC fraud, money laundering, and more.

**Live demo:** https://cryptostrapon.github.io/crypto-scam-quiz/
**Full write-ups of each case:** https://cryptostrapon.com/dark-bits

## Embed it

Drop the quiz into a blog, a classroom page or a community wiki with one line:

```html
<iframe src="https://cryptostrapon.github.io/crypto-scam-quiz/" width="100%" height="720" style="border:0" title="Crypto scam quiz" loading="lazy"></iframe>
```

Or use the data directly: [`questions.json`](questions.json) is plain JSON (scenario, question, 4 options, correct answer, explanation, severity, category). Reuse it freely with attribution (CC BY 4.0).

**Who it is for:** teachers and librarians, community moderators, wallet and exchange support teams, and anyone who wants a short practical scam test.

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

## Disclaimer and corrections

This quiz is for education only. It is not financial, legal or investment advice. Company, wallet and product names appear only to show how scammers impersonate them. They do not imply wrongdoing by those companies. Scenarios are composites of observed patterns unless a public source is linked.

Found an error? Open a "Report an inaccuracy" issue or write to cryptostrapon@proton.me. Verified corrections are fixed as soon as we can and noted in the changelog.

## Also on the website

This repository holds the 50 core scenarios. The version on [cryptostrapon.com/scam-quiz](https://cryptostrapon.com/scam-quiz) also adds one question for every published investigation, so it keeps growing and now has 100+ scenarios. The 50 core scenarios here are the same as the first 50 there.

## Changelog

- **v1.2.0:** removed named real incidents from explanations, added a disclaimer and a code of conduct, added a favicon.
- **v1.1:** rebalanced the answer options. Our own audit found that the longest option was the correct one in 47 of 50 questions, so the quiz could be passed without reading it. Options now have similar length (longest is correct in 16 of 50, close to chance). The audit script is a few lines of JavaScript; if you find another leak in the answer key, please open an issue.
