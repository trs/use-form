import React from 'react';

import { useForm } from './useForm';
import { useSubmit } from './useSubmit';
import { useChange } from './useChange';

interface FormState {
  one: string;
  two: string;
  box: boolean;
}

export const Primary = () => {

  const {control, Form} = useForm<FormState>();

  useChange(control, (state) => console.log('change', state));
  useSubmit(control, (state) => console.log('submit', state));

  return (
    <Form style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 10
    }}>
      <input type="text" name="text" />
      <input type="text" name="text-ignore" data-form-ignore />

      <input type="button" name="button" />

      <input type="checkbox" name="box" />

      <input type="color" name="color" />

      <input type="date" name="date" />

      <input type="datetime-local" name="datetime-local" />

      <input type="email" name="email" />

      <input type="file" name="file" />

      <input type="hidden" name="hidden" />

      <input type="image" name="image" />

      <input type="month" name="month" />

      <input type="number" name="number" />

      <input type="password" name="password" />

      <input type="radio" name="radio" />

      <input type="range" name="range" />

      <input type="search" name="search" />

      <input type="submit" name="submit" />

      <input type="tel" name="tel" />

      <input type="text" name="text" />

      <input type="time" name="time" />

      <input type="url" name="url" />

      <input type="week" name="week" />
    </Form>
  );
}


export default {
  title: 'Components/Form',
  component: Primary,
}
