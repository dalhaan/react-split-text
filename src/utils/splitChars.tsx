export const splitChars = (text: string) => {
  return text.split('').map((char) => (
    <div
      className="char"
      style={{
        position: 'relative',
        display: 'inline-block',
        whiteSpace: 'break-spaces',
      }}
    >
      {char}
    </div>
  ));
};
