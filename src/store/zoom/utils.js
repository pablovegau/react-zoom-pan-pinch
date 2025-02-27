import { boundLimiter, checkIsNumber } from "../utils";

export function checkZoomBounds(zoom, minScale, maxScale, zoomPadding, enablePadding) {
  const scalePadding = enablePadding ? zoomPadding : 0;
  const minScaleWithPadding = minScale - scalePadding;

  if (!isNaN(maxScale) && zoom >= maxScale) return maxScale;
  if (!isNaN(minScale) && zoom <= minScaleWithPadding) return minScaleWithPadding;
  return zoom;
}

export function checkPositionBounds(positionX, positionY, bounds, limitToBounds) {
  const { minPositionX, minPositionY, maxPositionX, maxPositionY } = bounds;
  const x = boundLimiter(positionX, minPositionX, maxPositionX, limitToBounds);
  const y = boundLimiter(positionY, minPositionY, maxPositionY, limitToBounds);
  return { x, y };
}

export function getDelta(event, customDelta) {
  const deltaY = event ? (event.deltaY < 0 ? 1 : -1) : 0;
  const delta = checkIsNumber(customDelta, deltaY);
  return delta;
}

export function wheelMousePosition(event, contentComponent, scale) {
  const contentRect = contentComponent.getBoundingClientRect();

  // mouse position x, y over wrapper component
  const mouseX = (event.clientX - contentRect.left) / scale;
  const mouseY = (event.clientY - contentRect.top) / scale;

  if (isNaN(mouseX) || isNaN(mouseY)) return console.error("No mouse or touch offset found");

  return {
    mouseX,
    mouseY,
  };
}

export function getComponentsSizes(wrapperComponent, newScale) {
  const wrapperRect = wrapperComponent.getBoundingClientRect();

  const wrapperWidth = wrapperRect.width;
  const wrapperHeight = wrapperRect.height;

  const newContentWidth = wrapperWidth * newScale;
  const newContentHeight = wrapperHeight * newScale;
  const newDiffWidth = wrapperWidth - newContentWidth;
  const newDiffHeight = wrapperHeight - newContentHeight;

  return {
    wrapperWidth,
    wrapperHeight,
    newContentWidth,
    newDiffWidth,
    newContentHeight,
    newDiffHeight,
  };
}
