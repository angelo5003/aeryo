// Deno unit tests. Run with `deno test supabase/functions/delete-account/index.test.ts`.
// per https://supabase.com/docs/guides/functions/unit-test

import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { handleDeleteAccount } from "./index.ts";

// Minimal duck-typed stand-in for the admin client — only the methods
// handleDeleteAccount actually calls need to exist. Cast to SupabaseClient
// so the real function's types are still checked. Tracks whether
// deleteUser was actually reached, so tests can assert it was skipped on
// an auth failure, not just that the response looked right.
const fakeAdmin = (overrides: {
	getUserResult?: { id: string } | null;
	getUserError?: unknown;
	deleteError?: unknown;
}) => {
	let deleteUserCalls = 0;

	const admin = {
		auth: {
			getUser: () =>
				Promise.resolve({
					data: { user: overrides.getUserResult ?? null },
					error: overrides.getUserError ?? null,
				}),
			admin: {
				deleteUser: (_id: string) => {
					deleteUserCalls += 1;
					return Promise.resolve({ error: overrides.deleteError ?? null });
				},
			},
		},
		// Duck-typed fake only implements what handleDeleteAccount calls — cast
		// through unknown since it can't structurally satisfy the full
		// SupabaseClient type.
	} as unknown as SupabaseClient;

	return { admin, getDeleteUserCalls: () => deleteUserCalls };
};

const req = (authHeader?: string, method = "POST") =>
	new Request("http://localhost/delete-account", {
		method,
		headers: authHeader ? { authorization: authHeader } : undefined,
	});

describe("handleDeleteAccount", () => {
	it("answers OPTIONS preflight without touching the admin client", async () => {
		const { admin, getDeleteUserCalls } = fakeAdmin({});
		const res = await handleDeleteAccount(req(undefined, "OPTIONS"), admin);
		assertEquals(res.status, 200);
		assertEquals(await res.text(), "ok");
		assertEquals(getDeleteUserCalls(), 0);
	});

	it("rejects a missing Authorization header without calling deleteUser", async () => {
		const { admin, getDeleteUserCalls } = fakeAdmin({});
		const res = await handleDeleteAccount(req(undefined), admin);
		assertEquals(res.status, 401);
		const json = await res.json();
		assertEquals(json.error, "Not authorized.");
		assertEquals(getDeleteUserCalls(), 0);
	});

	it("rejects a header that isn't a Bearer token without calling deleteUser", async () => {
		const { admin, getDeleteUserCalls } = fakeAdmin({});
		const res = await handleDeleteAccount(req("Basic abc123"), admin);
		assertEquals(res.status, 401);
		assertEquals(getDeleteUserCalls(), 0);
	});

	it("rejects an invalid/expired JWT without calling deleteUser", async () => {
		const { admin, getDeleteUserCalls } = fakeAdmin({
			getUserError: new Error("bad token"),
		});
		const res = await handleDeleteAccount(req("Bearer bad-jwt"), admin);
		assertEquals(res.status, 401);
		assertEquals(getDeleteUserCalls(), 0);
	});

	it("returns a 500 when deleteUser fails, after resolving the caller", async () => {
		const { admin, getDeleteUserCalls } = fakeAdmin({
			getUserResult: { id: "user-id" },
			deleteError: new Error("db error"),
		});
		const res = await handleDeleteAccount(req("Bearer good-jwt"), admin);
		assertEquals(res.status, 500);
		const json = await res.json();
		assertEquals(json.error, "Couldn't delete your account. Please try again.");
		assertEquals(getDeleteUserCalls(), 1);
	});

	it("deletes the caller resolved from the JWT and returns 200", async () => {
		const { admin, getDeleteUserCalls } = fakeAdmin({
			getUserResult: { id: "user-id" },
		});
		const res = await handleDeleteAccount(req("Bearer good-jwt"), admin);
		assertEquals(res.status, 200);
		const json = await res.json();
		assertEquals(json, { ok: true });
		assertEquals(getDeleteUserCalls(), 1);
	});
});
