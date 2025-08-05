---
title: "Security, Code Quality, and Linting — Building Trustworthy and Maintainable React Apps"
description: "Master security best practices, enforce code quality with ESLint and Prettier, and set up CI pipelines for professional React development."
---

# Security, Code Quality, and Linting — Building Trustworthy and Maintainable React Apps

### Learning Objectives

By the end of this article, you will:

- Recognize and address top security threats in React apps—preventing XSS, CSRF, and injection attacks.
- Enforce **code quality** using best practices, strong linting, and formatting.
- Learn to set up and combine tools like **ESLint**, **Prettier**, and CI pipelines for automated code health checks.
- Practice writing clean, secure, and professional React code that passes peer and industry review.

## Why Security and Code Quality Matter

With the rapid adoption of digital products across India’s fintech, healthcare, and e-commerce sectors, **security is not a bonus—it's a requirement.**  
Users trust your apps with their sensitive data; flaws can hurt both them and your company’s reputation.  
_At the same time, code quality is your “insurance policy”_—clean code reduces bugs, speeds up feature dev, ensures smooth onboarding for new team members, and keeps maintenance costs low.

## Core Security Principles for React Apps

### 1. Cross-Site Scripting (XSS)

- **Safe by default:** React’s JSX escapes dynamic data when you use `{}`—so basic rendering prevents XSS ([React Security Best Practices 2025](https://corgea.com/Learn/react-security-best-practices-2025), [React Security Vulnerabilities](https://www.loginradius.com/blog/engineering/react-security-vulnerabilities)).

```jsx
<div>{userInput}</div> // safe: auto-escaped
```

- **Be careful with dangerouslySetInnerHTML:** Never inject raw HTML from users, and if you must (for example, with a CMS), sanitize with libraries like [DOMPurify](https://github.com/cure53/DOMPurify) before rendering.

```jsx
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHtml) }} />;
```

- Avoid third-party scripts or libraries that manipulate the DOM directly.

### 2. Cross-Site Request Forgery (CSRF)

- For apps with authentication, always use CSRF tokens in API requests, especially for state-changing operations ([React Security Practices](https://www.glorywebs.com/blog/react-security-practices), [Vulnerabilities & Solutions](https://www.angularminds.com/blog/vulnerabilities-and-solutions-for-react-js-security), [Application Security Best Practices](https://www.coders.dev/blog/reactjs-application-security-best-practices.html)).
- Secure cookies with `SameSite`, `HttpOnly`, and `Secure` attributes.

### 3. Secure Local Storage and Sensitive Data

- **Never store** sensitive data (tokens, passwords, user details) unencrypted in localStorage/sessionStorage ([LinkedIn Security Guide](https://www.linkedin.com/pulse/react-js-security-best-practices-kristiyan-velkov), [Application Security Best Practices](https://www.coders.dev/blog/reactjs-application-security-best-practices.html)).
- Use secure HTTP (HTTPS, TLS) _always_—especially with APIs.

### 4. Protecting Against Insecure Dependencies

- **Update npm/yarn packages regularly**; run `npm audit` or use GitHub Dependabot for alerts ([React Security Best Practices 2025](https://corgea.com/Learn/react-security-best-practices-2025), [LinkedIn Security Guide](https://www.linkedin.com/pulse/react-js-security-best-practices-kristiyan-velkov)).
- Avoid using deprecated or untrusted third-party packages.

### 5. Input Validation

- Validate all user input on both client and server.
- For URLs, allow only safe protocols (http, https); sanitize or validate all dynamically generated links ([React Security Best Practices 2025](https://corgea.com/Learn/react-security-best-practices-2025)).

### 6. Secure Authentication

- Use strong authentication protocols (OAuth2, OpenID).
- Encourage strong passwords, multi-factor authentication, and secure password storage ([LinkedIn Security Guide](https://www.linkedin.com/pulse/react-js-security-best-practices-kristiyan-velkov), [Application Security Best Practices](https://www.coders.dev/blog/reactjs-application-security-best-practices.html)).
- Never expose secrets, API keys, or sensitive logic in the client code.

## Writing Reliable, Maintainable Code — Linting and Formatting

### Why Linting?

- **Linters** (like [ESLint](https://eslint.org/docs/latest/user-guide/getting-started)) scan your code for potential errors, anti-patterns, and style issues ([ReactJS Best Practices](https://www.tatvasoft.com/blog/reactjs-best-practices/), [Writing Clean Code](https://dev.to/sathishskdev/part-4-writing-clean-and-efficient-react-code-best-practices-and-optimization-techniques-423d), [Setup ESLint & Prettier](https://dev.to/knowankit/setup-eslint-and-prettier-in-react-app-357b), [How to Configure ESLint & Prettier](https://www.imaginarycloud.com/blog/how-to-configure-eslint-prettier-in-react)).
- Enforcing consistent code style helps teams collaborate and review faster.
- Linting reduces the risk of introducing subtle bugs and security issues.

### ESLint: The Industry Standard

**Install:**

```bash
npm install eslint --save-dev
npx eslint --init
```

**React Integration:**
When prompted, extend from `plugin:react/recommended` for React-specific rules.

**Prettier Integration:**
Optionally, add Prettier for auto-formatting:

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

In `.eslintrc`:

```json
{
      "extends": [
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:prettier/recommended"
      ]
}
```

### Best Practices

- **Run lint and format in CI:** Prevent poor quality or unsafe code from being merged.
- Use **named exports** instead of `export default` to improve maintainability and enable better tree-shaking ([Writing Clean Code](https://dev.to/sathishskdev/part-4-writing-clean-and-efficient-react-code-best-practices-and-optimization-techniques-423d)).
- Keep code DRY; prefer small reusable functions/components.

## Code Quality in CI/CD Pipelines

- Set up automated tasks in CI (like [GitHub Actions](https://docs.github.com/en/actions)) to run `npm test`, `npm run lint`, and `npm run format` on every pull request.
- Block merges if linting or tests fail ([ReactJS Best Practices](https://www.tatvasoft.com/blog/reactjs-best-practices/), [React CI/CD Guide](https://pattemdigital.com/insight/react-web-app-empowering-with-ci-and-cd/)).
- Optionally, use static code analysis tools for deeper security and code coverage checks.

## Checklist: Keeping React Apps Secure and Clean

- [ ] All dynamic content in JSX uses curly braces (escapes by default).
- [ ] No untrusted HTML with `dangerouslySetInnerHTML` unless sanitized.
- [ ] Components and utilities are validated by ESLint and Prettier.
- [ ] Package dependencies are reviewed and updated regularly.
- [ ] No secrets or sensitive data are present in the client bundle.
- [ ] User authentication follows modern best practices.
- [ ] All input is sanitized and validated.

## Practice Exercises

1. **XSS Challenge:** Write a component that accepts user input and try to inject a `<script>` tag. See how React escapes it. Now try to break it (and fix with DOMPurify).
2. **ESLint & Prettier Setup:** Add both tools to your project. Run with `npm run lint` and `npm run format`. Fix all reported issues.
3. **Secure Form Handling:** Add validation for a contact form; sanitize all user input.
4. **CI Quality Gate:** Configure your GitHub Actions pipeline to block PRs if lint, format, or tests fail.

## Project Idea

**Professional Upgrade:**
Take your main application and:

- Implement a full ESLint + Prettier setup.
- Add security checks (code reviews, dependency audit, and automated CI).
- Make sure all forms validate inputs and never expose sensitive info in localStorage or client-side code.

## Further Reading & Resources

- [React Security Best Practices 2025](https://corgea.com/Learn/react-security-best-practices-2025)
- [React.js Security Guide](https://relevant.software/blog/react-js-security-guide/)
- [OWASP Top 10 Security Risks](https://owasp.org/www-project-top-ten/)
- [ESLint Docs](https://eslint.org/docs/latest/user-guide/getting-started)
- [Prettier Docs](https://prettier.io/docs/en/index.html)
- [React Security Practices](https://www.glorywebs.com/blog/react-security-practices)
- [Setup ESLint & Prettier](https://dev.to/knowankit/setup-eslint-and-prettier-in-react-app-357b)

## Final Thoughts: Professionalism from First Line to Last

**“Move fast and break things” is good—until broken code or security leaks cost real money or trust.**
Adopt the right security and code quality practices _before_ crunch time. They’ll help you ship confidently, collaborate smoothly, and deliver apps ready for the demands of India’s tech landscape in 2025 and beyond.

**Next:**
Cap the series off by mastering industry-standard React tools—like Router and styled-components—and learn which anti-patterns could hold your projects back!
