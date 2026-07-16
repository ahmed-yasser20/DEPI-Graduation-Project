// Minimal JWT payload decoder (no signature verification - that's the backend's job).
// ASP.NET Core Identity JWTs commonly use long claim-type URIs for standard claims,
// e.g. "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier" for
// ClaimTypes.NameIdentifier. We check both the short and long forms defensively.

export interface DecodedToken {
  sub?: string;
  nameIdentifier?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string | string[];
  exp?: number;
  raw: Record<string, any>;
}

const CLAIM_NAMEID = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const CLAIM_GIVENNAME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
const CLAIM_SURNAME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";
const CLAIM_ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export function decodeJwt(token: string): DecodedToken | null {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    const raw = JSON.parse(json);
    return {
      sub: raw.sub || raw[CLAIM_NAMEID] || raw.nameid,
      nameIdentifier: raw[CLAIM_NAMEID] || raw.sub || raw.nameid,
      email: raw[CLAIM_EMAIL] || raw.email,
      firstName: raw[CLAIM_GIVENNAME] || raw.given_name || raw.firstName,
      lastName: raw[CLAIM_SURNAME] || raw.family_name || raw.lastName,
      role: raw[CLAIM_ROLE] || raw.role,
      exp: raw.exp,
      raw,
    };
  } catch {
    return null;
  }
}

export function isTokenExpired(decoded: DecodedToken | null): boolean {
  if (!decoded?.exp) return false;
  return Date.now() >= decoded.exp * 1000;
}
