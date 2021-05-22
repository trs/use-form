import { useEffect, useRef } from "react";
import { FormControl } from "./useForm";

export function useChange<T, K extends keyof T>(control: FormControl<T>, handle: (state: T) => void): () => void;
export function useChange<T, K extends keyof T>(control: FormControl<T>, name: K, handle: (value: T[K]) => void): () => void;
export function useChange<T, K extends keyof T>(control: FormControl<T>, name: K | ((state: T) => void), handle?: (value: T[K]) => void): () => void {
  const valueRef = useRef<T[K]>((typeof name === 'string' ? control.defaultValues[name] ?? '' : undefined) as unknown as T[K]);

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const eventHandler = (state: T) => {
    if (!mounted.current) return;

    if (typeof name === 'function') {
      name(state);
      return;
    }

    if (typeof valueRef.current !== 'string') return;
    if (typeof handle !== 'function') return;

    const value = state[name];

    if (valueRef.current != value) {
      handle(value);
    }

    valueRef.current = value;
  };

  control.registerEvent('onChange', eventHandler);

  return () => {
    control.unregisterEvent('onChange', eventHandler)
  };
}
