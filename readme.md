## React Atoms

#### Atom based state manager for react

#### [Npm Package Link](https://www.npmjs.com/package/@jodd/react-atoms)

### Installation

```shell
npm i @jodd/react-atoms
```

### Create a primitive atom first

```tsx
import { atom } from '@jodd/react-atoms';

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
import { useAtom } from '@jodd/react-atoms';

export default function Component() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <p>Count: {count}</p>
      <div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount((value) => value - 1)}>Decrease</button>
      </div>
    </div>
  );
}
```

### Read value from other component

```tsx
import { countAtom } from './atom';
import { useAtomValue } from '@jodd/react-atoms';

export default function Component() {
  const count = useAtomValue(countAtom);
  console.log('only rerenders')
}
```

### Pass selector to avoid unnecessary rerenders

```tsx
import { userAtom } from './atom';
import { useAtomValue } from '@jodd/react-atoms';

export default function Component() {
  const name = useAtomValue(userAtom, (state)=> state.name);
  console.log("It rerenders only when user.name changes")
}
```

### Write value from other component

```tsx
import { countAtom } from './atom';
import { useSetAtom } from '@jodd/react-atoms';

export default function Component() {
  const setCount = useSetAtom(countAtom);

  return <button onClick={() => setCount(101)}>Set count 101</button>;
}
```

