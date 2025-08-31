"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";

export type QueryInput = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * A utility hook for working with the current URL in Next.js.
 *
 * Features:
 * - Returns the current path with and without query parameters.
 * - Provides helper methods to read, check, build, and navigate with query params.
 * - Uses `useMemo` and `useCallback` for stable references and performance.
 *
 * @returns {object} An object containing:
 * @returns {string} return.url - Full current URL (path + query string).
 * @returns {string} return.urlWithoutQueries - Current URL path without any query string.
 * @returns {string} return.queries - Query string prefixed with "?" or an empty string.
 * @returns {string[]} return.segments - Array of non-empty path segments.
 * @returns {(key: string) => string | null} return.get - Get the value of a specific query param.
 * @returns {(key: string) => boolean} return.has - Check if a query param exists.
 * @returns {(updates: QueryInput, options?: { drop?: string[]; preserve?: string[] }) => string} return.build
 *   Build a new URL string by merging/removing query params.
 * @returns {(updates: QueryInput, opts?: { replace?: boolean }) => void} return.push
 *   Navigate to a new URL built from updates (push or replace).
 *
 * @example
 * // Read query parameters:
 * const { get, has } = useURL();
 * const page = get('page') ?? '1';
 * const hasFilter = has('filter');
 *
 * @example
 * // Update query parameters and navigate:
 * const { push } = useURL();
 * push({ page: 2, filter: 'new' }); // Adds/updates page and filter
 * push({ filter: '' }); // Removes filter
 *
 * @example
 * // Build a URL without navigating:
 * const { build } = useURL();
 * const href = build({ sort: 'asc' }, { drop: ['page'] });
 */
const useURL = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  /** Raw query string without leading "?" */
  const qs = searchParams.toString();

  /** Non-empty path segments */
  const segments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  /** Path without any query string */
  const urlWithoutQueries = useMemo(() => `/${segments.join("/")}`, [segments]);

  /** Query string prefixed by "?" if present */
  const queries = useMemo(() => (qs ? `?${qs}` : ""), [qs]);

  /** Full current URL (path + query string) */
  const url = useMemo(
    () => `${urlWithoutQueries}${queries}`,
    [urlWithoutQueries, queries]
  );

  /**
   * Get the value of a query parameter by key.
   * @param {string} key - The query parameter name.
   * @returns {string|null} The value, or null if not present.
   */
  const get = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  );

  /**
   * Check if a query parameter exists.
   * @param {string} key - The query parameter name.
   * @returns {boolean} True if present, false otherwise.
   */
  const has = useCallback(
    (key: string) => searchParams.has(key),
    [searchParams]
  );

  /**
   * Build a new URL by merging/removing query params.
   * Any value of null, undefined, or '' will remove the key.
   *
   * @param {QueryInput} updates - Keys/values to update.
   * @param {{ drop?: string[]; preserve?: string[] }} [options] - Keys to drop before updates.
   * @returns {string} The newly built URL string.
   */
  const build = useCallback(
    (
      updates: QueryInput,
      options?: { drop?: string[]; preserve?: string[] }
    ) => {
      const sp = new URLSearchParams(searchParams.toString());

      // Remove specified keys before applying updates
      options?.drop?.forEach((k) => sp.delete(k));

      // Apply updates or remove keys
      Object.entries(updates).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") sp.delete(k);
        else sp.set(k, String(v));
      });

      const nextQs = sp.toString();
      return `${urlWithoutQueries}${nextQs ? `?${nextQs}` : ""}`;
    },
    [searchParams, urlWithoutQueries]
  );

  /**
   * Navigate to a new URL built from the provided updates.
   * Defaults to `router.push`, but can use `router.replace`.
   *
   * @param {QueryInput} updates - Keys/values to update in the query string.
   * @param {{ replace?: boolean }} [opts] - Use replace instead of push if true.
   */
  const push = useCallback(
    (updates: QueryInput, opts?: { replace?: boolean }) => {
      const href = build(updates);
      if (opts?.replace) router.replace(href);
      else router.push(href);
    },
    [build, router]
  );

  return {
    url,
    urlWithoutQueries,
    queries,
    segments,
    get,
    has,
    build,
    push,
  };
};

export default useURL;
