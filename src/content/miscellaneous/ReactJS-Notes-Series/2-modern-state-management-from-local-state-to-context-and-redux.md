---
title: "Modern State Management — From Local State to Context and Redux"
description: "Master state management in React—learn when to use local state, Context, or Redux, avoid prop drilling headaches, and apply patterns used by top tech teams."
---
# Article 2: Modern State Management — From Local State to Context and Redux

### Learning Objectives

By the end of this article, you will:

- Confidently choose **when to use local state, Context, or advanced tools like Redux** in your React apps.
- Understand **React’s “state” system** and why it’s the engine behind dynamic UIs.
- Recognize “state lifting” and “prop drilling”—and know how to avoid complex headaches as you scale.
- Practice essential state management patterns used by India’s top tech teams.


## Why State Management? Making React Apps Truly Dynamic

You’ve built neat components, but what makes your app come alive? **State**. It’s how your app _remembers_ things—what’s in the cart, which user is logged in, what page you’re on.
Small apps thrive on simple local state, but as your app grows—think Flipkart’s checkout or Paytm’s wallet—**state starts overflowing component boundaries**.

**Choosing the right state management strategy is what separates elegant, maintainable code from a tangled mess.**

## Local State with useState \& useReducer

**Local state** is the simplest way to store data _inside_ a component. Start every app this way, and reach for global solutions only when really needed.

### useState: Your Everyday State Hook

**Pattern:**

```jsx
import { useState } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ Likes: {likes}
    </button>
  );
}
```

- **When to use:**
    - UI controls
    - Form values
    - Simple toggles (dark mode, modals)


### useReducer: Tackling More Complex Logic

A powerful alternative for state that’s complex or has multiple related values.

**Pattern:**

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <button onClick={() => dispatch({ type: "increment" })}>
      {state.count}
    </button>
  );
}
```

- **When to use:**
    - Multiple related state variables
    - Complex update logic
    - Next step before using Redux for large scale


## Lifting State Up \& Prop Drilling

### Lifting State Up

When two sibling components need to share data, **move state up to their common parent**. This way, both can access and update the data.

**Example:**

```
App
 ├── SearchInput (sets searchTerm)
 └── ResultsList (uses searchTerm)
```

Move `searchTerm` state to `App`, pass it down as props.

### Prop Drilling: The Common Problem

**What is it?**

Passing state through several layers of components only for it to finally reach the one that actually needs it.

**Why is this a problem?**

- It clutters intermediate components with props they don’t use.
- Makes code harder to maintain.

**When does it appear?**

- As your app grows past 2-3 levels of components.


## The Context API: State Sharing Made Easy

**Context** lets you share data across your app—**avoiding prop drilling**.

### How it Works

- Create a context (like a big “mailbox”).
- “Provider” makes data available to all its children.
- Any “consumer” can grab the data, wherever they are.

**Pattern:**

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}
```

- **Use Case:**
    - App-wide themes, user settings, authentication status.
- **Tip:**
    - **Don’t use Context for everything!** React re-renders every consumer when the context changes. For huge apps, other tools scale better.


## Redux: Power-Up for Enterprise State Management

When your app becomes _really_ complex—and you find yourself wrestling with shared data, updates from all over the place—it’s time to look at **Redux**.

### What is Redux?

- A centralized “store” holds your app state.
- Actions describe _what happened_; reducers describe _how_ state changes.
- Works outside React, great for debugging and collaboration.

**Pattern:**

```js
// actions.js
export const increment = () => ({ type: "INCREMENT" });

// reducer.js
export default function counter(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    default: return state;
  }
}
```

- Connect Redux to React using libraries like **Redux Toolkit**.
- **Redux is overkill for small projects**. Use it if multiple deeply nested parts of your UI need to coordinate, or your state logic becomes unmanageable.


## Real-World Decision Guide

| App Scale | Recommended State mgmt | Why? |
| :-- | :-- | :-- |
| Small, Single-Page | useState | Simple, direct, no overengineering |
| Moderate, Sibling Sharing | useState + Lifting | Structured, minimal complexity |
| Deeply Nested/Global | Context API | Avoids prop drilling, still simple |
| Huge, Complex, Collab Team | Redux (or similar) | Centralized, predictable, scalable |

## Best Practices (and Pitfalls to Avoid)

- **Keep state as close as possible to where it’s needed.** Only lift when multiple components really need it.
- **Don’t overuse Context or Redux.** More code = more bugs. Start small.
- Use **Redux Toolkit** to avoid redux boilerplate—industry standard in 2025.
- In large teams, agree on a state management pattern _early_.


## Practice Exercises

1. **Counter in Three Styles:**
    - Build a counter using useState, useReducer, and useContext.
2. **Shared State:**
    - Create a `ThemeSwitcher` where changing theme in the header also updates the rest of the page, using Context.
3. **Redux Jump:**
    - Set up Redux in a simple app (use Redux Toolkit). Create a store for product listings and allow adding/removing entries.

## Project Idea

**Professional Feature:** Build a “Shopping Cart” Module

- Each product card has a “Add to Cart” button.
- Use Context or Redux to manage cart state across the app.
- Bonus: Persist cart in `localStorage` for reloads.


## Further Reading \& Resources

- [Redux Essentials Tutorial (Official)](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [React Context Deep Dive](https://react.dev/learn/passing-data-deeply-with-context)
- [State Management in React — FreeCodeCamp](https://www.freecodecamp.org/news/react-state-management/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)


## Final Thoughts: Your Developer Journey

State management is the “glue” of interactive apps, and choosing the right solution means less technical debt and more time creating features users love. Don’t rush to add complexity—master `useState`, then Context, and only then opt for Redux if your app truly demands it.

**Next:**
In Article 3, you'll dive into building _beautifully reusable and composable components_. Get ready to harness the full power of React’s “component Lego kit”—and make your UIs future-proof!

