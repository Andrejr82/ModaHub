import { afterEach, describe, expect, it } from "vitest";
import {
  buildPasswordResetRedirectTo,
  buildQueryRedirect,
  getRequestOrigin,
} from "@/lib/auth-urls";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

describe("auth URL helpers", () => {
  it("prefers the configured public site origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://modahub.example.com/minha-conta";

    expect(getRequestOrigin(new Headers({ host: "localhost:3000" }))).toBe(
      "https://modahub.example.com",
    );
  });

  it("uses forwarded host and protocol when no public site URL is configured", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const headers = new Headers({
      "x-forwarded-host": "loja.modahub.com.br",
      "x-forwarded-proto": "https",
    });

    expect(getRequestOrigin(headers)).toBe("https://loja.modahub.com.br");
  });

  it("keeps localhost redirects on http during local development", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getRequestOrigin(new Headers({ host: "localhost:3000" }))).toBe(
      "http://localhost:3000",
    );
  });

  it("builds the Supabase password reset callback URL", () => {
    expect(buildPasswordResetRedirectTo("https://loja.modahub.com.br")).toBe(
      "https://loja.modahub.com.br/auth/callback?next=%2Fatualizar-senha",
    );
  });

  it("encodes redirect messages safely", () => {
    expect(
      buildQueryRedirect(
        "/esqueci-senha",
        "error",
        "Erro ao enviar e-mail: URL inválida",
      ),
    ).toBe(
      "/esqueci-senha?error=Erro+ao+enviar+e-mail%3A+URL+inv%C3%A1lida",
    );
  });
});
