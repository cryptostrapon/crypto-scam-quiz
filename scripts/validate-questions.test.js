"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { validateBank, compareBanks, validateFiles } = require("./validate-questions");

const sample = () => ({
  id: 1,
  scenario: "Someone requests your seed phrase.",
  question: "What should you do?",
  options: ["Share it", "Refuse", "Share half", "Pay them"],
  correctAnswer: 1,
  explanation: "Keep the seed phrase private.",
  severity: "critical",
  category: "Phishing"
});

test("accepts a valid question bank", () => {
  assert.deepEqual(validateBank([sample()]), []);
});

for (const value of [null, {}, [], [null], [[]]]) {
  test(`rejects invalid bank shape ${JSON.stringify(value)}`, () => {
    assert.ok(validateBank(value).length);
  });
}

for (const [field, value] of [
  ["id", 0], ["id", 1.5], ["id", Number.MAX_SAFE_INTEGER + 1],
  ["scenario", ""], ["question", " "], ["explanation", null], ["category", 5],
  ["options", ["a", "b", "c"]], ["options", ["a", "b", "c", "d", "e"]],
  ["options", ["a", "b", "c", null]], ["options", ["a", "b", "c", " "]],
  ["options", ["a", "b", "c", " a "]],
  ["correctAnswer", -1], ["correctAnswer", 4], ["correctAnswer", "1"],
  ["correctAnswer", 1.5], ["severity", "low"]
]) {
  test(`rejects invalid ${field}: ${JSON.stringify(value)}`, () => {
    assert.ok(validateBank([{ ...sample(), [field]: value }]).length);
  });
}

test("rejects duplicate IDs without requiring contiguous IDs", () => {
  assert.ok(validateBank([sample(), sample()]).some(error => error.includes("duplicate")));
  assert.deepEqual(validateBank([sample(), { ...sample(), id: 7 }]), []);
});

test("matches translations by ID, not array order or translated text", () => {
  const english = [sample(), { ...sample(), id: 2 }];
  const spanish = [{ ...sample(), id: 2, scenario: "Texto traducido" }, sample()];
  assert.deepEqual(compareBanks(english, spanish), []);
});

test("rejects missing and unexpected translation IDs", () => {
  const errors = compareBanks([sample()], [{ ...sample(), id: 2 }]);
  assert.ok(errors.some(error => error.includes("missing id")));
  assert.ok(errors.some(error => error.includes("unexpected id")));
});

for (const change of [{ correctAnswer: 2 }, { severity: "high" }]) {
  test(`rejects translation drift in ${Object.keys(change)[0]}`, () => {
    assert.ok(compareBanks([sample()], [{ ...sample(), ...change }]).length);
  });
}

test("reports invalid JSON and missing files without throwing", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "quiz-validation-"));
  try {
    fs.writeFileSync(path.join(dir, "questions.json"), "{broken");
    const errors = validateFiles(dir);
    assert.equal(errors.length, 2);
    assert.ok(errors.some(error => error.startsWith("questions.json:")));
    assert.ok(errors.some(error => error.startsWith("questions_es.json:")));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("validates the real English and Spanish data", () => {
  assert.deepEqual(validateFiles(), []);
});
