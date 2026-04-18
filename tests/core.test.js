const test = require("node:test");
const assert = require("node:assert/strict");
const { formatTime, clampMinutes, getNextMode } = require("../src/core.js");

test("formatTime formata segundos em mm:ss", () => {
  assert.equal(formatTime(1500), "25:00");
  assert.equal(formatTime(65), "01:05");
});

test("clampMinutes limita valores entre 1 e 60", () => {
  assert.equal(clampMinutes(0), 1);
  assert.equal(clampMinutes(5), 5);
  assert.equal(clampMinutes(120), 60);
});

test("getNextMode alterna entre foco e pausa", () => {
  assert.equal(getNextMode("focus"), "break");
  assert.equal(getNextMode("break"), "focus");
});