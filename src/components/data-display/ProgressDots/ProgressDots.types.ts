export interface ProgressDotsProps {
  /**
   * Stable ids for each step. Prefer this — dots key and compare by id.
   * Falls back to `count` / `activeIndex` only when no ids are supplied.
   */
  ids?: readonly string[];
  /** Currently active step. Used with `ids`. */
  activeId?: string;
  /** Fallback total when `ids` is omitted. */
  count?: number;
  /** Fallback selection when `activeId` is omitted. */
  activeIndex?: number;
}
