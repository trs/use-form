import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import { getInputValueKey, shouldIgnoreInputType, isValidFormElement } from './utils';
import type {ValueFormElement} from './utils';

export type Event = 'onChange' | 'onSubmit';

export type EventCallback<T> = (state: T) => void;

export type RegisterEventMethod<T> = (event: Event, cb: EventCallback<T>) => void;

export interface FormControl<T> {
  registerEvent: RegisterEventMethod<T>;
  unregisterEvent: RegisterEventMethod<T>;
  defaultValues: Partial<T>
}

export interface FormProps {
  style?: CSSProperties;
}

export function useForm<T extends Record<string, any>>(defaultValues: Partial<T> = {}) {
  const eventsRef = useRef<Record<Event, Set<EventCallback<T>>>>({
    onChange: new Set(),
    onSubmit: new Set()
  });

  const registerEvent: RegisterEventMethod<T> = (event, cb) => {
    if (!eventsRef.current) return;
    if (!eventsRef.current[event]) eventsRef.current[event] = new Set();

    eventsRef.current[event]?.add(cb);
  };

  const unregisterEvent: RegisterEventMethod<T> = (event, cb) => {
    if (!eventsRef.current) return;
    if (!eventsRef.current[event]) return;

    eventsRef.current[event]?.delete(cb);
  };

  const callEvent = useMemo(() => (event: Event, state: T) => {
    const events = eventsRef.current;

    if (!events) return;
    if (!events[event]) return;

    for (const handle of events[event]?.values()) {
      handle(state);
    }
  }, [eventsRef.current]);

  const FormComponent: React.FC<FormProps> = ({children, ...props}) => {
    const [state, setState] = useState<T>(defaultValues as T);

    useEffect(() => {
      callEvent('onChange', state);
    }, [state]);

    const valueChanged: React.ChangeEventHandler<ValueFormElement> = (e: any) => {
      const name = e.target.name;
      const value = e.target[getInputValueKey(e.target.tagName, e.target.type)];

      setState((currentState) => ({...currentState, [name]: value}));
    };

    const addChangeEvent = (child: React.ReactNode): React.ReactNode => {
      if (Array.isArray(child)) return React.Children.map(child, addChangeEvent);

      if (!isValidFormElement(child)) return child;
      if (shouldIgnoreInputType(child)) return child;

      const valueKey = getInputValueKey(child.type as string, child.props.type);

      return React.cloneElement(child, {
        [valueKey]: state[child.props.name] ?? '',
        onChange: valueChanged
      });
    };

    return (
      <form {...props} action="#" onSubmit={(e) => {
        e.preventDefault();
        callEvent('onSubmit', state);
      }}>
        {React.Children.map(children, addChangeEvent)}
      </form>
    )
  };

  return {
    control: useMemo<FormControl<T>>(() => ({
      registerEvent,
      unregisterEvent,
      defaultValues
    }), []),
    Form: FormComponent
  };
}
