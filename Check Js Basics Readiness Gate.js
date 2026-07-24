function checkJsBasicsReadinessGate(flag1, flag2, flag3) {
  // Do not coerce strings like "true" — require strict boolean true for every flag
  const allReady =
    flag1 === true &&
    flag2 === true &&
    flag3 === true;

  return allReady ? "READY" : "BLOCKED";
}