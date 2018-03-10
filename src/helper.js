export function isPointInsideCircle (mouseX, mouseY, circleX, circleY, circleR) {
  return Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2) < Math.pow(circleR, 2)
}

export function angleFromTwoPoint (x1, y1, x2, y2) {
  const x = x2 - x1
  const y = y2 - y1
  return Math.atan2(y, x) * 180 / Math.PI
}
export function isFunction (functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}
