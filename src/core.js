function formatTime(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const minutesPart = Math.floor(seconds / 60);
  const secondsPart = seconds % 60;
  return String(minutesPart).padStart(2, "0") + ":" + String(secondsPart).padStart(2, "0");
}

function clampMinutes(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  if (parsed > 60) return 60;
  return Math.floor(parsed);
}

function getNextMode(mode) {
  return mode === "focus" ? "break" : "focus";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { formatTime, clampMinutes, getNextMode };
}

if (typeof window !== "undefined") {
  window.FocusFlowCore = { formatTime, clampMinutes, getNextMode };
}