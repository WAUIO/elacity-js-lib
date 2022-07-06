export interface CollectionOf<T> {
  total: number;
  offset: number;
  limit: number;
  items: T[];
  isLast?: boolean;
}
