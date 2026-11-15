#!/usr/bin/env node
"use strict";

// Read-only validation. No dependencies and no browser or network access.
const fs = require("node:fs");
const path = require("node:path");

function validateBank(bank, label = "questions") {
  if (!Array.isArray(bank) || bank.length === 0) {
    return [`${label}: expected a non-empty array`];
  }
  const errors = [];
  const ids = new Set();
  bank.forEach((question, index) => {
    const prefix = `${label}[${index}]`;
    if (!question || typeof question !== "object" || Array.isArray(question)) {
      errors.push(`${prefix}: expected an object`);
      return;
    }
    if (!Number.isSafeInteger(question.id) || question.id < 1) {
      errors.push(`${prefix}: id must be a positive safe integer`);
    } else if (ids.has(question.id)) {
      errors.push(`${prefix}: duplicate id ${question.id}`);
    }
    ids.add(question.id);
    for (const field of ["scenario", "question", "explanation", "category"]) {
      if (typeof question[field] !== "string" || !question[field].trim()) {
        errors.push(`${prefix}: ${field} must be a non-empty string`);
      }
    }
    const options = question.options;
    if (!Array.isArray(options) || options.length !== 4 ||
        options.some(option => typeof option !== "string" || !option.trim())) {
      errors.push(`${prefix}: options must contain exactly four non-empty strings`);
    } else if (new Set(options.map(option => option.trim())).size !== 4) {
      errors.push(`${prefix}: options must be distinct`);
    }
    if (!Number.isInteger(question.correctAnswer) ||
        question.correctAnswer < 0 || question.correctAnswer > 3) {
      errors.push(`${prefix}: correctAnswer must be an integer from 0 to 3`);
    }
    if (!["critical", "high"].includes(question.severity)) {
      errors.push(`${prefix}: severity must be critical or high`);
    }
  });
  return errors;
}

function compareBanks(english, translated, label = "translation") {
  const errors = [];
  const source = new Map(english.map(question => [question.id, question]));
  const target = new Map(translated.map(question => [question.id, question]));
  for (const [id, question] of source) {
    if (!target.has(id)) {
      errors.push(`${label}: missing id ${id}`);
      continue;
    }
    const other = target.get(id);
    if (other.correctAnswer !== question.correctAnswer) {
      errors.push(`${label}: correctAnswer differs for id ${id}`);
    }
    if (other.severity !== question.severity) {
      errors.push(`${label}: severity differs for id ${id}`);
    }
  }
  for (const id of target.keys()) {
    if (!source.has(id)) errors.push(`${label}: unexpected id ${id}`);
  }
  return errors;
}

function validateFiles(root = path.resolve(__dirname, "..")) {
  const banks = [];
  const errors = [];
  for (const file of ["questions.json", "questions_es.json"]) {
    try {
      const bank = JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
      const problems = validateBank(bank, file);
      errors.push(...problems);
      banks.push(problems.length ? null : bank);
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
      banks.push(null);
    }
  }
  if (banks.every(Boolean)) {
    errors.push(...compareBanks(banks[0], banks[1], "questions_es.json"));
  }
  return errors;
}

if (require.main === module) {
  const errors = validateFiles();
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
  } else {
    console.log("PASS: English and Spanish question banks are valid and aligned.");
  }
}

module.exports = { validateBank, compareBanks, validateFiles };
