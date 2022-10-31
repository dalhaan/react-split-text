import { ReactNode } from 'react';

export const splitLines = (element: HTMLElement) => {
  const lineHeightString =
    getComputedStyle(element).getPropertyValue('line-height');
  const lineHeight = Math.round(Number(lineHeightString.split('px')[0]));

  const wordElements = element.querySelectorAll('.word');

  const wrapperY = element.getBoundingClientRect().y;

  const lines: string[] = [];
  const wrappedLines: ReactNode[] = [];

  // Group text that are on each line
  for (const wordElement of wordElements) {
    const y = wordElement.getBoundingClientRect().y;
    const relativeY = y - wrapperY;

    const lineNo = Math.round(relativeY / lineHeight);

    lines[lineNo] = `${lines[lineNo] ? lines[lineNo] + ' ' : ''}${
      wordElement.textContent
    }`;
  }

  // Wrap lines
  for (const line of lines) {
    wrappedLines.push(
      <div
        className="line"
        style={{
          position: 'relative',
          display: 'inline-block',
          whiteSpace: 'break-spaces',
        }}
      >
        {line}
      </div>
    );
  }

  return wrappedLines;
};
