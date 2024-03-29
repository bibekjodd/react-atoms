'use client';
import { useSyncExternalStore } from 'react';

type AtomSetter<AtomType> = (
  newValue: AtomType | ((newValue: AtomType) => AtomType)
) => void;

interface Atom<AtomType> {
  get: () => AtomType;
  set: AtomSetter<AtomType>;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
}

export function atom<AtomType>(
  initialValue: AtomType | (() => AtomType)
): Atom<AtomType> {
  let value = null as AtomType;
  if (initialValue instanceof Function) {
    value = initialValue();
  } else {
    value = initialValue;
  }
  const subscribers = new Set<(newValue: AtomType) => void>();

  return {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue instanceof Function) {
        value = newValue(value);
      } else {
        value = newValue;
      }
      subscribers.forEach((callback) => callback(value));
    },
    subscribe(callback) {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    }
  };
}

export function useAtom<AtomType>(
  atom: Atom<AtomType>
): [AtomType, AtomSetter<AtomType>] {
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set];
}

export function useAtomValue<AtomType>(atom: Atom<AtomType>): AtomType {
  return useSyncExternalStore(atom.subscribe, atom.get);
}

export function useSetAtom<AtomType>(
  atom: Atom<AtomType>
): AtomSetter<AtomType> {
  return atom.set;
}
