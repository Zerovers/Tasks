import React, { useState } from 'react';

function Example({ value }) {
  const [count, setCount] = useState(value);

  return (
    <div>
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
}

export default Example;
