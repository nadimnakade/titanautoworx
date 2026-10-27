export function clampPercent(x: number): number {
  return Math.min(100, Math.max(0, x));
}

export function percentFromPointer(clientX: number, rectLeft: number, rectWidth: number): number {
  if (rectWidth <= 0) return 50;
  return clampPercent(((clientX - rectLeft) / rectWidth) * 100);
}
