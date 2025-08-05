---
title: "TypeScript with React — Bringing Confidence and Safety to Your Code"
description: "Add confidence to your React apps with TypeScript—learn to type props, state, and hooks, follow migration best practices, and catch bugs before they reach users."
---

# Article 7: TypeScript with React — Bringing Confidence and Safety to Your Code

### Learning Objectives

By the end of this article, you will:

- Understand what **TypeScript** is and why it’s a game changer for React projects.
- Learn to **type props, state, and custom hooks** for robust type safety.
- Know best practices for **gradually migrating** a JavaScript React app to TypeScript.
- Build confidence to catch bugs _before_ they reach users or teammates.
- Practice hands-on exercises and real-world TypeScript upgrades.


## Why TypeScript? Why Now?

Move fast, break things… that’s fun—_until you break production._
TypeScript is a **superset of JavaScript** that adds static types.
It helps your editor _catch mistakes as you type_, and enables code completion, safer refactors, and faster onboarding, especially in large, collaborative projects popular in India’s technology scene.

**Top teams in fintech, SaaS, and e-commerce are already using TypeScript with React, raising code quality and reliability.**

## TypeScript Basics for React Devs

Before you leap in:

- TypeScript files end in `.ts` (regular JS) or `.tsx` (when using JSX).
- Types describe the _shape_ of objects, function parameters, and component props.


### Declaring Types

```ts
let age: number = 30;
let name: string = "Asha";
let tags: string[] = ["react", "typescript"];
```


### Interfaces and Type Aliases

```ts
interface User {
  name: string;
  age: number;
}
// Or
type UserID = number | string;
```


## Typing React Components

### 1. Functional Components

```tsx
type GreetingProps = {
  name: string;
  age?: number; // Optional
}

function Greeting({ name, age }: GreetingProps) {
  return <h2>Hi {name}{age ? `, age ${age}` : ""}!</h2>;
}
```

- `GreetingProps` defines the expected props and their types.
- The `?` means the prop is optional.


### 2. Typing State and Events

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

React’s `useState` can infer types, but declaring them is best for clarity.

### 3. Typing Functions and Callbacks

```tsx
type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click</button>;
}
```


## Typing Custom Hooks

```tsx
function useToggle(initial: boolean = false): [boolean, () => void] {
  const [state, setState] = useState(initial);
  const toggle = () => setState(s => !s);
  return [state, toggle];
}
```

- The return type (`[boolean, () => void]`) makes usage clear and errors easy to spot.


## Migrating Your Project to TypeScript

1. **Rename Files:** Change one or two `.js` files to `.tsx`.
2. **Fix TypeScript Errors:** Start by typing props and state.
3. **Type as you go:** Use `any` as a quick fallback, but always replace it later with a better type.

> **Tip:** Incremental adoption is normal and safe. Don’t feel pressure to convert everything at once!

### Adding TypeScript to an Existing React Project

```
npm install --save typescript @types/react @types/react-dom
```

Most frameworks (CRA, Vite, Next.js) support TypeScript out of the box.

## Best Practices

- **Always type props and state**—it prevents passing invalid data.
- **Type function return values and arguments** explicitly, especially for public APIs or utilities.
- **Leverage type inference** but prefer explicit types for important boundaries.
- **Define types/interfaces near where they’re used** (or in a `/types` directory for large projects).
- **Use union types and enums** for predefined sets of values (`type Status = "pending" | "success" | "error";`).

**Common Mistake:**

- Never use `any` everywhere! It defeats the purpose of TypeScript by removing all type safety.


## Practice Exercises

1. **Add types:**
    - Pick a component and write a proper interface/type for its props and state.
2. **Type a custom hook:**
    - Make a `useLocalStorage` hook with fully typed arguments and return values.
3. **Refactor a context:**
    - Type a React Context for user authentication, including provider and consumer.

## Project Idea

**Professional Upgrade:**
Migrate your previous “Dashboard” or “Cart” feature to TypeScript.

- Type props for each card, list, and form.
- Ensure custom hooks and contexts are robustly typed.


## Further Reading \& Resources

- [React + TypeScript Docs](https://react.dev/learn/typescript)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Cheatsheets for React](https://react-typescript-cheatsheet.netlify.app/)
- [Refactoring to TypeScript (Blog)](https://dev.to/this-is-learning/refactoring-javascript-to-typescript-in-react-2hp)


## Final Thoughts: Sharpen Your React Armory

Learning TypeScript unlocks a new level of professionalism, making collaboration smoother and apps safer—no matter how fast your team or features grow.
Invest in typing early, and your codebase (and your future self) will thank you.

**Next:**
Elevate your apps to the next level with **accessibility (a11y) and internationalization (i18n)**—ensuring no user is left behind and your UIs speak to India’s diverse audience!

