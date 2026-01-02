import { useEffect, useMemo, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchData } from "../features/dataSlice";

type DataFetcherProps<TData> = {
  cacheKey: string;
  url: string;

  render: (data: TData) => ReactNode;

  renderLoading?: () => ReactNode;
  renderError?: (message: string) => ReactNode;

  selectData?: (raw: unknown) => TData;

  forceRefetch?: boolean;
};

export function DataFetcher<TData>({
  cacheKey,
  url,
  render,
  renderLoading,
  renderError,
  selectData,
  forceRefetch = false,
}: DataFetcherProps<TData>) {
  const dispatch = useDispatch<AppDispatch>();

  const entry = useSelector((s: RootState) => s.data.entries[cacheKey]);
  const status = entry?.status ?? "idle";
  const error = entry?.error ?? null;

  const data: TData | null = useMemo(() => {
    if (!entry || entry.data == null) return null;
    return selectData ? selectData(entry.data) : (entry.data as TData);
  }, [entry, selectData]);

  useEffect(() => {
    
    if (!forceRefetch && status === "succeeded") return;
    if (status === "loading") return;

    dispatch(fetchData({ key: cacheKey, url }));
  }, [cacheKey, url, dispatch, forceRefetch, status]);

  if (status === "loading") {
    return renderLoading ? renderLoading() : <p>Loading...</p>;
  }

  if (status === "failed") {
    const msg = error ?? "Error";
    return renderError ? renderError(msg) : <p style={{ color: "crimson" }}>{msg}</p>;
  }

  if (status === "succeeded" && data !== null) {
    return render(data);
  }

  return null;
}
