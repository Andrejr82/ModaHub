const DEFAULT_LOCAL_ORIGIN = "http://localhost:3000";

type HeaderReader = Pick<Headers, "get">;

function normalizeOrigin(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim() || null;
}

export function getRequestOrigin(headersList: HeaderReader) {
  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (configuredOrigin) {
    return configuredOrigin;
  }

  const forwardedHost = firstHeaderValue(headersList.get("x-forwarded-host"));
  const host = forwardedHost ?? firstHeaderValue(headersList.get("host"));
  if (host) {
    const forwardedProto = firstHeaderValue(headersList.get("x-forwarded-proto"));
    const protocol =
      forwardedProto === "http" || forwardedProto === "https"
        ? forwardedProto
        : host.startsWith("localhost") || host.startsWith("127.0.0.1")
          ? "http"
          : "https";

    return normalizeOrigin(`${protocol}://${host}`) ?? DEFAULT_LOCAL_ORIGIN;
  }

  return (
    normalizeOrigin(headersList.get("origin")) ??
    normalizeOrigin(headersList.get("referer")) ??
    DEFAULT_LOCAL_ORIGIN
  );
}

export function buildPasswordResetRedirectTo(origin: string) {
  const url = new URL("/auth/callback", origin);
  url.searchParams.set("next", "/atualizar-senha");
  return url.toString();
}

export function buildQueryRedirect(
  pathname: string,
  param: "error" | "message",
  message: string,
) {
  const searchParams = new URLSearchParams({ [param]: message });
  return `${pathname}?${searchParams.toString()}`;
}
