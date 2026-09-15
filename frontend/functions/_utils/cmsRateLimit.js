/**
 * Login brute-force protection (per IP) via Cache API.
 * Best-effort across isolates; blocks after repeated failures.
 */

const MAX_FAILURES = 8;
const WINDOW_SEC = 15 * 60; // 15 Minuten

function cacheKey(ip) {
  return new Request(
    `https://cms-login-rate-limit.invalid/${encodeURIComponent(ip)}`,
  );
}

async function readState(ip) {
  try {
    const hit = await caches.default.match(cacheKey(ip));
    if (!hit) return null;
    return await hit.json();
  } catch {
    return null;
  }
}

async function writeState(ip, state) {
  try {
    const body = JSON.stringify(state);
    await caches.default.put(
      cacheKey(ip),
      new Response(body, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `max-age=${WINDOW_SEC}`,
        },
      }),
    );
  } catch {
    /* ignore cache errors */
  }
}

export async function assertLoginAllowed(ip) {
  const state = await readState(ip);
  if (!state) return { ok: true };
  const now = Date.now();
  if (state.blockedUntil && state.blockedUntil > now) {
    const retryAfter = Math.ceil((state.blockedUntil - now) / 1000);
    return { ok: false, retryAfter };
  }
  return { ok: true };
}

export async function recordLoginFailure(ip) {
  const now = Date.now();
  let state = (await readState(ip)) || { failures: 0, blockedUntil: 0 };
  if (state.blockedUntil && state.blockedUntil > now) {
    return {
      blocked: true,
      retryAfter: Math.ceil((state.blockedUntil - now) / 1000),
    };
  }
  state.failures = Number(state.failures || 0) + 1;
  if (state.failures >= MAX_FAILURES) {
    state.blockedUntil = now + WINDOW_SEC * 1000;
    state.failures = 0;
    await writeState(ip, state);
    return { blocked: true, retryAfter: WINDOW_SEC };
  }
  await writeState(ip, state);
  return { blocked: false, remaining: MAX_FAILURES - state.failures };
}

export async function clearLoginFailures(ip) {
  try {
    await caches.default.delete(cacheKey(ip));
  } catch {
    /* ignore */
  }
}
