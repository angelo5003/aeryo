# Testing Patterns

Some sections below describe infrastructure that isn't in the codebase yet
(GraphQL, `test-utils/`). They're kept here so the conventions are already
agreed once that infra lands — same "planned" treatment `PRODUCT.md` and
`AGENTS.md` give Supabase/GraphQL. Don't `import` from a planned path;
`AGENTS.md`'s grounding rule ("no invented code") applies to test code too.

## Test Types

### Unit Tests (`.test.tsx`)
- **When**: MUST write when moving code to shared directories; optional for page-specific components if covered by integration tests.
- **Framework**: Jest + React Testing Library
- **Uses**: `render()` from `@testing-library/react`
- **Naming**: `describe("ComponentName")`, `test("should do X when Y happens")`

### Integration Tests (`.spec.tsx`)
> **Planned** — `@/test-utils/renderIntegrationTest` doesn't exist yet. Until
> it does, write these as `.test.tsx` with a plain `render()` call, same as
> a unit test.

- **When**: Testing complete user flows on a single page, or how components integrate together.
- **Uses**: `renderIntegrationTest` from `@/test-utils/renderIntegrationTest`
- **Naming**: `"As a User I should be able to..."`
- **Do NOT** mock child components or design system components.

## Query Selector Priority (use in this order)

1. `getByRole("button", { name: "Submit" })`
2. `getByLabelText("Email")`
3. `getByPlaceholderText("Enter email")`
4. `getByText("Welcome")`
5. `getByDisplayValue`, `getByAltText`, `getByTitle`
6. `getByTestId` — **avoid unless absolutely necessary**

## Interaction Helpers

> **Planned** — `@testing-library/user-event` isn't installed and
> `@/test-utils/interactions` doesn't exist yet. Until then, use
> `fireEvent` from `@testing-library/react` directly; that's not a
> violation of the rule below, it's the only option available.

> ⚠️ **NEVER use `@testing-library/user-event` directly.** Use interaction helpers from `@/test-utils/interactions`.

```tsx
// ❌ BAD
import userEvent from "@testing-library/user-event";
await userEvent.click(button);

// ✅ GOOD
import { click, type, clear, hover, tab } from "@/test-utils/interactions";
await click(button);
await type(input, "text");
await clear(input);
```

## Mocking GraphQL (MockedProvider)

> **Planned** — GraphQL is not yet the API layer (see `AGENTS.md`). No
> `@apollo/client` dependency exists in `package.json` today. Apply this
> once GraphQL is adopted.

```tsx
import { MockedProvider } from "@apollo/client/testing";

const mocks = [{
  request: { query: MY_QUERY, variables: { id: "123" } },
  result: { data: { user: { __typename: "User", id: "123", name: "John" } } }
}];

render(
  <MockedProvider mocks={mocks}>
    <MyComponent />
  </MockedProvider>
);
```

**Never** use `jest.mock()` for generated GraphQL hooks.

## Verify GraphQL Variables (variableMatcher)

> **Planned** — same GraphQL caveat as above.

```tsx
const variableMatcher = jest.fn().mockReturnValue(true);
const mock = { request: { query: MY_QUERY }, variableMatcher, result: { data: {...} } };
// After interaction:
expect(variableMatcher).toHaveBeenCalledWith(expect.objectContaining({ id: "123" }));
```

## Reusable Render Pattern

> **Planned** — `MockedProvider` (GraphQL) doesn't exist yet. For a
> component that needs Chakra context today, wrap with `Provider` from
> `@/components/ui/provider` instead — see `CreateAccountForm.test.tsx`
> for a working example. No i18n layer is planned for this app, so no
> localization wrapper belongs in this pattern.

```tsx
import { MockedProvider } from "@apollo/client/testing";

const buildComponent = (mocks: MockedResponse[] = []) =>
  render(
    <MockedProvider mocks={mocks}>
      <MyComponent />
    </MockedProvider>
  );
```

## Test Data — Never Use Real Contact Details

Never use real contact details in tests, mocks, fixtures, or stories. Always use
values from ranges reserved for testing:

- **Phone** — UK Ofcom fictitious ranges:
  - Mobile: `07700 900000`–`07700 900999`
  - Landline: `01632 960000`–`01632 960999`
- **Email** — RFC 2606 reserved domains: `@example.com`, `@example.org`, `@example.net`

```tsx
// ❌ BAD — real (or real-looking) contact details
const mock = { user: { phone: "07911 123456", email: "jane.doe@gmail.com" } };

// ✅ GOOD — reserved test ranges
const mock = { user: { phone: "07700 900123", email: "jane.doe@example.com" } };
```

This matters even in tests that assert message _content_. A real number or email is
both a PII leak and, when a contact-detail check is under test (e.g. blocking contact
details in messages), a value that isn't guaranteed reserved makes the assertion
ambiguous — you can't tell whether it passed for the right reason.

## What NOT to do

- ❌ Mock child components in integration tests
- ❌ Use generic test names ("Render", "Works")
- ❌ Use `data-testid` unless unavoidable
- ❌ Mock generated GraphQL hooks with `jest.mock()` (planned, once GraphQL lands)
- ❌ Mix mocking strategies
- ❌ Use `@testing-library/user-event` directly (moot today — not installed; applies once `test-utils/interactions` exists)
- ❌ Use real contact details (phone/email) in tests, mocks, or fixtures
