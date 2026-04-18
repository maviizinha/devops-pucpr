const test = require("node:test");
const assert = require("node:assert/strict");
const { formatTime, clampMinutes, getNextMode } = require("../src/core.js");

test("formatTime formata segundos em mm:ss", () => {
  assert.equal(formatTime(1500), "25:00");
  assert.equal(formatTime(65), "01:05");
});

test("formatTime retorna 00:00 para valores inválidos ou negativos", () => {
  assert.equal(formatTime(-10), "00:00");
  assert.equal(formatTime("abc"), "00:00");
  assert.equal(formatTime(null), "00:00");
});

test("clampMinutes limita valores entre 1 e 60", () => {
  assert.equal(clampMinutes(0), 1);
  assert.equal(clampMinutes(5), 5);
  assert.equal(clampMinutes(120), 60);
});

test("clampMinutes arredonda para baixo valores decimais válidos", () => {
  assert.equal(clampMinutes(10.9), 10);
  assert.equal(clampMinutes(1.8), 1);
});

test("clampMinutes retorna 1 para valores não numéricos", () => {
  assert.equal(clampMinutes("abc"), 1);
  assert.equal(clampMinutes(undefined), 1);
});

test("getNextMode alterna entre foco e pausa", () => {
  assert.equal(getNextMode("focus"), "break");
  assert.equal(getNextMode("break"), "focus");
});

test("getNextMode retorna focus para qualquer valor diferente de focus", () => {
  assert.equal(getNextMode("other"), "focus");
  assert.equal(getNextMode(""), "focus");
});