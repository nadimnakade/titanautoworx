export const ALL = "All";

export function filterByCategory<T extends { category: string }>(items: T[], cat: string): T[] {
  return cat === ALL ? items : items.filter((i) => i.category === cat);
}
