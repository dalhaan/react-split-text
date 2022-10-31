import { ReactNode } from 'react';

import { By } from '../sharedTypes';
import { splitChars } from './splitChars';

export const splitString = (string: string, by: By = 'WORD') => {
  // Split out words (characters between whitespace)
  const words = string.split(/\s+/);

  const wrappedWords = words.map((word, index) => {
    if (word === '') return ' ';

    let wrappedChars: ReactNode[] | null = null;

    if (by === 'CHAR') {
      wrappedChars = splitChars(word);
    }

    return (
      <>
        {/* Restore spaces between words */}
        {index !== 0 ? ' ' : null}

        {/* Wrap each word in a div */}
        <div
          className="word"
          style={{
            position: 'relative',
            display: 'inline-block',
            whiteSpace: 'break-spaces',
          }}
        >
          {by === 'CHAR' ? wrappedChars : word}
        </div>
      </>
    );
  });

  return wrappedWords;
};
