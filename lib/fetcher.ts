import * as SecureStore from "expo-secure-store";

interface IFetcherParams {
  url: string;
  init: RequestInit;
  error: string;
}

async function fetcher({ url, init, error }: IFetcherParams) {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const res = await fetch(url, {
      ...init,
      headers: {
        "Accept-Encoding": "gzip",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        ...init.headers,
      },
    });

    if (res.headers.get("Content-Type") === "text/csv") {
      return await res.text();
    }

    let json;

    try {
      json = await res.json();
    } catch {
      json = {};
    }

    if (res.ok) return json;

    throw new Error(json.error || Object.values(json).join(", "));
  } catch (e) {
    if (e instanceof Error && e.message) {
      throw e;
    } else {
      throw new Error(error);
    }
  }
}

function formatBody<ExtraArgs>(
  arg: ExtraArgs,
  payload?: Record<string, string>,
) {
  if (arg) {
    return JSON.stringify(arg);
  }
  if (payload) {
    return JSON.stringify(payload);
  }
  return undefined;
}

export function postJsonFetcher(baseURL: string) {
  return async <ExtraArgs>(
    key: string | [string, Record<string, string>],
    options?: Readonly<{ arg: ExtraArgs }>,
  ) => {
    const isArray = Array.isArray(key);
    const url = baseURL + (isArray ? key[0] : key);
    const body = formatBody(options?.arg, isArray ? key[1] : undefined);
    return await fetcher({
      url,
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
      error: "An error occurred while posting the data.",
    });
  };
}

export function getFetcher(baseURL: string) {
  return async (key: string | [string, string]) => {
    return await fetcher({
      url: baseURL + (Array.isArray(key) ? key[0] : key),
      init: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      error: "An error occurred while getting the data.",
    });
  };
}

export function putFetcher(baseURL: string) {
  return async <ExtraArgs>(
    key: string,
    options?: Readonly<{ arg: ExtraArgs }>,
  ) =>
    await fetcher({
      url: baseURL + key,
      init: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: options ? JSON.stringify(options.arg) : undefined,
      },
      error: "An error occurred while replacing the data.",
    });
}

export function deleteFetcher(baseURL: string) {
  return async (key: string) =>
    await fetcher({
      url: baseURL + key,
      init: { method: "DELETE" },
      error: "An error occurred while deleting the data.",
    });
}
