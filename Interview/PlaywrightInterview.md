# Playwright Automation — Complete Syntax, Flow & Cheat Sheet
*(Compiled from Rahul Shetty Udemy Playwright Course notes)*

---

## 1. JavaScript Basics for Automation

### Variable Declaration
```javascript
var  x = 1;   // legacy, function-scoped
let  y = 2;   // block-scoped, reassignable, can init later
const z = 3;  // block-scoped, must be initialized immediately, cannot be reassigned
```
> **Rule:** Use `const` when initializing a value immediately. Use `let` when you'll assign the value later.

### Control Flow
```javascript
if (condition) { } else { }

while (condition) { }

do { } while (condition);

for (let i = 0; i < n; i++) { }
```

### Logical Operators
```javascript
if (a && b) { }   // AND
if (a || b) { }   // OR
if (!flag) { }    // NOT / negation
```

### Arrays — Common Methods
```javascript
arr.push(item);        // add to end
arr.pop();              // remove from end
arr.unshift(item);      // add to beginning
arr.includes(item);     // search for element -> boolean
arr.indexOf(item);      // get index of element
```

### Array Iteration & Aggregation
```javascript
// Sum using for loop
let sum = 0;
for (let i = 0; i < arr.length; i++) sum += arr[i];

// Sum using reduce
const sum = arr.reduce((acc, val) => acc + val, 0);

// Filter (extract matching elements into new array)
const evens = arr.filter(n => n % 2 === 0);

// Map (transform every element)
const tripled = arr.map(n => n * 3);

// Combined: even numbers -> multiply by 3 -> sum
const result = arr.filter(n => n % 2 === 0)
                   .map(n => n * 3)
                   .reduce((a, b) => a + b, 0);
```
> **When to use:** `filter()` = pick a subset. `reduce()` = collapse array to a single value.

### String Basics
```javascript
str.length;             // includes spaces as characters
str[0];                 // index always starts at 0
str.slice(start, end);  // substring extraction
str.trim();             // removes leading/trailing whitespace
str.indexOf("word");    // find position of substring
parseInt("123");        // string -> integer
num.toString();         // integer -> string
```

### Functions
```javascript
// Named function
function greet() { }

// Anonymous function
const greet = function() { };

// Arrow function (modern, preferred)
const greet = () => { };
```

### Objects & Classes
```javascript
const obj = { key: "value" };
obj.newKey = "newValue";     // add/update directly
delete obj.key;              // delete directly
"key" in obj;                 // check property existence

class Person {
    constructor(name) {
        this.name = name;
    }
    get displayName() {       // getter (preferred over raw key-value)
        return this.name;
    }
}

// Inheritance
class Pet extends Person {
    constructor(name, type) {
        super(name);          // MUST call parent constructor first
        this.type = type;
    }
}
```

### Import / Export Between Files
```javascript
// file1.js
module.exports = { myFunction };
// OR
exports.myFunction = myFunction;

// file2.js
const { myFunction } = require('./file1');
```

---

## 2. Playwright Project Setup

```bash
npm init playwright@latest      # create project + install dependencies
node filename.js                # run plain JS file from terminal
```
- `node_modules` folder contains all Playwright dependencies — deleting it breaks the project.
- `playwright.config.js` = the test runner configuration file.

### Basic Test Structure
```javascript
const { test, expect } = require('@playwright/test');

test('test description', async ({ page }) => {
    await page.goto('https://example.com');
    // steps...
});
```
> JS is **asynchronous** — always pair `async` (on the function) with `await` (before each action) so steps run in order.

### Fixtures (built-in)
```javascript
async ({ browser }) => { }   // global fixture — new browser instance
async ({ context }) => { }   // browser context (isolated session)
async ({ page }) => { }      // ready-to-use page (shortcut vs manually creating browser+context+page)
```

---

## 3. Playwright Config File — Key Settings

```javascript
module.exports = defineConfig({
  timeout: 30000,                     // global TEST timeout (default 30s)
  expect: { timeout: 5000 },          // global ASSERTION timeout (default 5s)
  use: {
    actionTimeout: 10000,             // global ACTION timeout (default 0 = unlimited/borrows from test)
    headless: false,                  // false = see the browser open
    browserName: 'firefox',           // or 'webkit' for Safari
    trace: 'retain-on-failure',       // saves trace only for failed tests
  },
});
```

### Commands to Run Tests
```bash
npx playwright test                        # run all tests (parallel across files)
npx playwright test filename.spec.js        # run specific file
npx playwright test --headed                # run in head mode (see browser)
npx playwright test --debug                  # run with Playwright Inspector
```
> Multiple **files** run in parallel. Multiple tests **inside one file** run sequentially.
> Use `test.only(...)` to run just one test in a file with multiple tests.

---

## 4. Timeouts — Full Cheat Sheet

| Type | Question it answers | Default | Global (config) | Test-level | Step-level |
|---|---|---|---|---|---|
| **Assertion** (`expect`) | "Is it there?" | 5s | `expect: { timeout: 10000 }` | `expect.configure({ timeout })` | `.toBeVisible({ timeout: 10000 })` |
| **Action** (click/fill) | "Do it now" | 0 (borrows from test) | `use: { actionTimeout: 10000 }` | `page.setDefaultTimeout(10000)` | `.click({ timeout: 10000 })` |
| **Test** (whole function) | "How long can it run?" | 30s | `timeout: 60000` | `test.setTimeout(60000)` | ❌ not applicable |

**Golden Rule:** An explicit action/assertion timeout can never push execution past the overall **Test Timeout** — that's the hard ceiling.
- `test.slow()` → triples the test timeout (30s → 90s).
- Navigation timeout (for `page.goto`) falls back to the Test Timeout if not set explicitly.

---

## 5. Locators & Basic Actions

```javascript
page.locator("css-selector");           // CSS is Playwright's recommended locator strategy
page.locator("selector").fill("text");  // type into field
page.locator("selector").click();       // click element
page.locator("selector").textContent(); // extract text (single element)
page.locator("selector").allTextContents(); // extract text from ALL matches -> array
page.locator("selector").inputValue();  // get value user typed at runtime (vs textContent)
```

### Selecting Among Multiple Matches
```javascript
page.locator(".class").first();
page.locator(".class").last();
page.locator(".class").nth(0);          // zero-indexed
```

### Modern Getby Locators (preferred, more resilient)
```javascript
page.getByLabel("Label text");
page.getByPlaceholder("Placeholder text");
page.getByRole("button", { name: "Submit" });
page.getByRole("link", { name: "Home" });
page.getByText("Exact or partial text");

// Chaining
page.getByRole("row").filter({ hasText: "OrderID123" }).getByRole("button").click();
```

### Auto-Suggest Dropdowns
```javascript
await page.locator("selector").pressSequentially("text", { delay: 100 });
// types letter-by-letter to trigger suggestion lists
```

---

## 6. Waiting Strategies

```javascript
await page.waitForLoadState('networkidle');  // waits until no network activity
                                              // ⚠ can be flaky per Playwright docs

await locator.waitFor();                     // waits for ONE specific locator (not a collection)

await page.pause();                          // pause execution (for debugging)
```
> `allTextContents()` does NOT auto-wait — combine with `.first().waitFor()` to ensure the list has loaded before extracting all items.
> `isVisible()` also does NOT auto-wait or retry — same fix applies.

---

## 7. UI Components

### Dropdowns (static `<select>`)
```javascript
await page.locator("select").selectOption("value");
```

### Radio Buttons
```javascript
await page.locator(".radiotextsty").first().click();
await page.locator(".radiotextsty").last().click();
await page.locator(".radiotextsty").nth(1).click();

await expect(page.locator("selector")).toBeChecked();  // preferred assertion
```

### Checkboxes
```javascript
await expect(page.locator("selector")).toBeChecked();
const checked = await page.locator("selector").isChecked();
expect(checked).toBeFalsy();   // no direct "toBeUnchecked" — use isChecked() + falsy
```

### Attributes
```javascript
await expect(page.locator("selector")).toHaveAttribute("class", "blinking-text");
```

### Visibility Assertions
```javascript
await expect(page.locator("selector")).toBeVisible();
await expect(page.locator("selector")).toBeHidden();
```

---

## 8. Child Windows / Tabs / Frames

```javascript
const pagePromise = context.waitForEvent('page');  // wait for new tab/window to open
await page.locator("selector").click();            // action that opens the new tab
const newPage = await pagePromise;
await newPage.waitForLoadState();

// Frames
const frame = page.frameLocator("iframe-selector");
await frame.locator("selector").click();
```

### Alerts / Dialogs
```javascript
page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();   // or dialog.dismiss()
});
```

### Mouse Hover
```javascript
await page.locator("selector").hover();
```

---

## 9. Promises

```javascript
// Pending -> Fulfilled / Rejected states

// Run steps in parallel
const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator("selector").click(),
]);
```

---

## 10. API Testing with Playwright

```javascript
const { request } = require('@playwright/test');

// Create API context
const apiContext = await request.newContext();

// POST call — payload as JS object (keys unquoted, only values quoted)
const loginResponse = await apiContext.post('BASE_URL/login', {
    data: {
        userEmail: "user@test.com",
        userPassword: "password"
    }
});

// Extract JSON body
const responseBody = await loginResponse.json();
const token = responseBody.token;

// Response properties
loginResponse.status();
loginResponse.headers();
loginResponse.url();
loginResponse.ok();
```

### Sending Auth Token as Header (bypass UI login)
```javascript
const orderResponse = await apiContext.post('BASE_URL/order', {
    data: { /* order payload */ },
    headers: { Authorization: token }
});
const orderId = (await orderResponse.json()).orderId;
```

### Injecting Token into Browser (localStorage)
```javascript
await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
}, token);
```
> `addInitScript(fn, arg)` — 1st arg = function to run in browser context, 2nd arg = data passed INTO that function (since Node variables aren't accessible inside the browser's JS context).

### Mixed API + Web Flow (E2E)
1. Call login API → get `token`.
2. Call create-order API (with token in header) → get `orderId`.
3. Inject token into browser via `addInitScript` → skip UI login.
4. Navigate to order-history page, search table rows for `orderId` to verify.

> Use API calls to **set up test data / skip repetitive UI steps** — saves significant execution time. Not every test needs this; use based on scenario.

### API Utils Pattern (reusable class)
```javascript
// utils/apiUtils.js
class ApiUtils {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }
    async createOrder(orderPayload, token) {
        const res = await this.apiContext.post('BASE_URL/order', {
            data: orderPayload,
            headers: { Authorization: token }
        });
        return res.json();
    }
}
module.exports = { ApiUtils };
```
```javascript
// spec file
const { ApiUtils } = require('../utils/apiUtils');

test.beforeAll(async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    const apiUtils = new ApiUtils(apiContext);
    const order = await apiUtils.createOrder(payload, token);
});
```
> No `expect()` assertions inside Util files — keep assertions in the spec/test file. Filename and class name should match.

---

## 11. Session Storage / Cookies Across Contexts

```javascript
// After logging in once, save all storage state (cookies + localStorage/sessionStorage)
await context.storageState({ path: 'state.json' });

// Reuse in a new browser context (already "logged in")
const context = await browser.newContext({ storageState: 'state.json' });
```
> Useful when an app stores multiple tokens across cookies AND sessionStorage (e.g., banking apps) — one JSON file captures everything instead of setting each manually.

---

## 12. Network Interception (`page.route`)

### Mocking Flow (conceptual)
```
Browser → sends request → Playwright intercepts
                              ↓
                fulfill() fake data  OR  continue() pass-through  OR  abort() block
                              ↓
                           Browser (acts on result)
```

### Fulfill (fake a response)
```javascript
await page.route('**/api/order', async route => {
    await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'fake-token' })
    });
});
```

### Continue (intercept but let it pass through — for logging/inspection)
```javascript
await page.route('**/api/**', route => route.continue());
```

### Abort (block the request entirely)
```javascript
await page.route('**/*.css', route => route.abort());   // block all CSS
await page.route('**/*.{png,jpg,jpeg,svg}', route => route.abort()); // block images
```

### Glob Pattern Reference
| Symbol | Meaning |
|---|---|
| `**` | matches any number of path segments/any depth |
| `*` | matches any characters within one segment |
| `**/*.css` | any URL, any folder depth, ending in `.css` |

### Logging All Requests/Responses
```javascript
page.on('request', request => console.log(request.url()));
page.on('response', response => console.log(response.url(), response.status()));
```

**Why intercept/mock:**
- Speed — skip real network/server dependency.
- Reliability — avoid flakiness from a slow/down backend.
- Control — simulate edge cases (errors, empty states) hard to trigger for real.
- Isolation — frontend tests don't depend on backend state.

---

## 13. Custom Fixtures

### Defining a Fixture (`utils/fixtures.js`)
```javascript
const base = require('@playwright/test');

exports.customtest = base.test.extend({
    authenticatedPage: async ({ page }, use) => {
        await page.goto('URL');
        await page.locator('#userEmail').fill('email');
        await page.locator('#userPassword').fill('password');
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');

        await use(page);   // hands control back to the test with this value
    },

    createOrder: async ({ authenticatedPage }, use) => {
        // build on top of another fixture
        const orderId = await createOrderViaApi();
        await use(orderId);
    }
});
```

### Using the Fixture in a Spec File
```javascript
const { customtest } = require('../utils/fixtures');
const { expect } = require('@playwright/test');

customtest('should show dashboard after login', async ({ authenticatedPage, createOrder }) => {
    // authenticatedPage is already logged in — no repeated login code
    await expect(authenticatedPage.locator('.dashboard')).toBeVisible();
});
```

**Fixture Flow:**
1. Test calls `customtest(...)` and requests a fixture (e.g., `authenticatedPage`) as a parameter.
2. Playwright sees the custom test object, checks `customtest`'s fixture definitions.
3. Runs the matching fixture function **before** the test body.
4. Fixture does its setup, then calls `await use(value)` to hand the value into the test.
5. Code *after* `use()` in the fixture = teardown (runs after the test finishes).

**Why use fixtures:**
| Without | With |
|---|---|
| Login code repeated in every test | Written once |
| Update every file when flow changes | Update one file |
| Verbose tests | Tests stay focused on what's being verified |

---

## 14. Debugging Tools

```bash
npx playwright test filename --debug   # opens Playwright Inspector
```
- **Pick Locator** icon in Inspector auto-generates a unique locator for any element.
- **Codegen** (record & playback):
```bash
npx playwright codegen URL
```
- API calls can't be debugged via Inspector (UI-only tool) — instead:
  1. Add a `test` script in `package.json`.
  2. `Shift+Ctrl+P` → "Debug npm script".
  3. Set breakpoints in your `.js` file.
  4. Hover any line during debug to inspect response values.
- **Trace Viewer** — view full step-by-step run including API req/response logs; each test run generates a results folder with screenshots.
  - Config: `trace: 'retain-on-failure'` saves traces only when a test fails (saves disk space).

---

## 15. Quick Reference — File/Test Conventions

- `.spec.js` files = actual test files run by the Playwright test runner.
- `.js` files (non-spec) = utility/helper files (fixtures, API utils) — not run directly as tests.
- Always `await` any async method call, or the test may run out of sequence.
- `const` → must initialize immediately. `let` → can initialize later.
- Filename and class name should match in Util files.
- Always export Util/fixture files (`module.exports` / `exports.x`) to use them elsewhere via `require`.