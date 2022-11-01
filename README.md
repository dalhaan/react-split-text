# react-split-text

React version of GSAPs SplitText plugin.

Splits text by word or character, wraps them in divs, animates them in, then reverts the text to its original state so screen readers don't have a hard time.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/vitejs-vite-8cj5yk)

## Usage

```jsx
<Example>
  <SplitText as="h1" by="WORD" animate>React + GSAP split by word</SplitText>
  <SplitText as="h1" by="CHAR" animate>React + GSAP split by character</SplitText>
  <SplitText as="h1" by="CHAR" animate>
    <SplitText as="i">React + GSAP</SplitText> split by character
  </SplitText>
</Example>
```
