---
title: "Foundations of React—Understanding Components"
description: "Learn the foundations of React by mastering components—understand functional vs. class components, props, state, and how to build clean, reusable UI with hands-on examples."
---

# Article 1: Foundations of React—Understanding Components

### Learning Objectives

By the end of this article, you will:

- Confidently explain what React components are, and why they’re the core of React.
- Distinguish between functional and class components—and know which is “the React way” today.
- Understand props and state, and how they shape your UI.
- Write your own simple, but professional, React components.
- Get hands-on with practice exercises and project ideas that build your skills.

## Why Start with Components? The Heartbeat of React

Imagine you’re building a house. Think of React components as the bricks, the windows, the doors—each a self-contained piece that snaps together to create the big picture. This “Lego” style of development is what gives React its power, making it easy to build, update, and scale interfaces as your project grows.

**In India’s bustling tech market, React’s component-driven approach is why startups and giants (like Swiggy, Flipkart, or Paytm) reach for React when they need to deliver fast and scale big.**

## What is a Component in React?

A **component** in React is a reusable, standalone chunk of the UI. Each component:

- Accepts input (props)
- Can manage its own data (state)
- Returns JSX to render the UI

> **Think of components as functions that return a piece of the user interface.**

### The “Why” — Why Componentization?

- **Reusability:** Write once, use everywhere.
- **Separation of concerns:** Keep logic, markup, and styling organized.
- **Collaboration:** Team members can work on different components in parallel, making teamwork efficient.

## Functional vs. Class Components

React started with **class components** but now **functional components**—with hooks—are the modern standard. Here’s why:

### Functional Components

- Defined as plain JavaScript functions.
- Easier to read, test, and reuse.
- Use **hooks** (like `useState`, `useEffect`) for state and lifecycle.

**Example:**

```jsx
function Welcome(props) {
  return <h1>Namaste, {props.name}!</h1>;
}
```

### Class Components

- Use the `class` syntax.
- Manage state and lifecycle with built-in methods (older approach).
- More verbose, and less favored in new code.

**Example:**

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Namaste, {this.props.name}!</h1>;
  }
}

```

**Industry Standard (2025):**  
If you’re starting a new project today, **always prefer functional components with hooks**. As a senior beginner, learning hooks is more valuable than diving into older class component patterns.

## A Taste of JSX: Writing Your First Component

React uses **JSX (JavaScript XML)**—it lets you write HTML-like code inside JavaScript.

**Example:**

```jsx
function CafeGreeting() {
  return (
    <div>
      <h2>Welcome to Noida’s Finest Chai Shop!</h2>
      <p>React is serving the chai—fresh and hot.</p>
    </div>
  );
}

```

**What’s happening here?**

- We’re defining a `CafeGreeting` component as a function.
- It returns a “tree” of elements (just like HTML).
- When used, React turns this JSX into browser-understandable DOM elements.

## Props: How Components Talk to Each Other

Props are like “parameters” for your components—tools to pass data from one component (parent) to another (child).

**Why are props powerful?**

- **Flexibility:** Use the same component in many ways.
- **Readability:** Clear, explicit contracts for what data is needed.

**Example:**

```jsx
function FavoriteFood({ dish }) {
  return Today's special is {dish}!;
}

// Usage:
<FavoriteFood dish="Pav Bhaji" />
<FavoriteFood dish="Masala Dosa" />
```

- `FavoriteFood` can display _any_ dish, thanks to props.

## State: Making Components Dynamic

A component’s **state** gives it memory. Use state when your component’s data can change over time (user input, server updates, etc.).

**Functional Component with State (using Hooks):**

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        You clicked {count} times
      </button>
    </div>
  );
}
```

- `useState(0)` initializes the `count` variable to `0`.
- When the button is clicked, `setCount` updates the state and rerenders the component.

**Rule of Thumb:**

- **Props**: immutable, for passing data _in_ from parent.
- **State**: mutable, for data that can change _within_ the component.

## Best Practices & Tips (from a Fellow Developer)

1. **Prefer functional components and hooks** for new code.
2. **Keep components focused**—each should do one thing well. Break big UIs into small, easy-to-test pieces.
3. **Follow naming conventions**:
      - Components: `PascalCase` (e.g., `UserCard`)
      - Props: `camelCase` (e.g., `userName`)
4. **Use “pure” components**—given the same props, always render the same output.

**Common anti-pattern:**

- Don’t mutate state or props directly. Always use state setters (like `setCount`) and treat props as read-only.

## Recap Diagram: The React Component Flow

```
ParentComponent
   |
   | props
   v
ChildComponent <--- uses local state
   |
   | returns
   v
 JSX UI
```

- **Data flows down** via props.
- **User interaction** or internal logic can change state.

## Practice Exercises

1. **Convert a To-Do List:**
      - Take a simple class-based To-Do List and convert it to use functional components with hooks.
2. **Create a ProfileCard Component:**
      - Props: name, photo URL, bio.
      - Render a card for a user with this info.
3. **Experiment with Props:**
      - Make a `WelcomeBanner` component that prints a custom message, such as “Good evening, [Name]!”

## Project Idea

**Mini Project:** Create a “My Favorite Foods” React App

- Create a `FoodList` component that takes an array of food items as props and renders each one using a `FoodCard` child component.
- Add a `Like` button to each card with its own local count state.

## Further Reading & Resources

- [React Official Documentation](https://react.dev)
- [React for Beginners by Kent C. Dodds](https://epicreact.dev)
- [JSX Deep Dive](https://react.dev/learn/writing-markup-with-jsx)
- [FreeCodeCamp - React Course](https://www.freecodecamp.org/learn/front-end-development-libraries/react/)

## Final Thoughts: Your Developer Journey

Every professional React career starts with a solid grasp of components. Build your confidence here, practice these basics, and you’ll find the rest of React much less intimidating.

**Next:** In Article 2, we tackle the world of React state management. Get ready to see how apps keep track of everything from single clicks to whole shopping carts. Until then, explore, play, and break things—because every bug teaches you something new!
