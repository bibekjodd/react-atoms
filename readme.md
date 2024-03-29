## Atom State

#### Atom based state manager for react

### Installation

```shell
npm i @jodd/atom-state
```

### Create a primitive atom first

```tsx
import { atom } from '@jodd/atom-state';

export const countAtom = atom(0);

export const userAtom = atom({
  id: '99',
  name: 'john',
  active: true
});
```

### Use the atom inside components or hooks

```tsx
import { countAtom } from './atom';
import { useAtom } from '@jodd/atom-state';

export default function Component() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <p>Count: {count}</p>
      <div>
        <button onClick={() => setCount(count + 1)}></button>
        <button onClick={() => setCount((value) => value - 1)}></button>
      </div>
    </div>
  );
}
```

### Read value from other component

```tsx
import { countAtom } from './atom';
import { useAtomValue } from '@jodd/atom-state';

export default function Component() {
  const count = useAtomValue(countAtom);
}
```

### Write value from other component

```tsx
import { countAtom } from './atom';
import { useSetAtom } from '@jodd/atom-state';

export default function Component() {
  const setCount = useSetAtom(countAtom);

  return <button onClick={() => setCount(101)}>Set count 101</button>;
}
```
