# `use-form`

Manage form state with React hooks automagically.

## Install

`npm install @trs/use-form`

_or_

`yarn add @trs/use-form`

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import {useForm, useSubmit, useChange} from '@trs/use-form`;

const App = () => {
  const {control, Form} = useForm({username: '', password: ''});

  useChange(control, 'username', (value) => {
    console.log(`Username changed to: ${username}`);
  });

  useSubmit(control, (state) => {
    loginToAPI(state.username, state.password);
  });

  return (
    <Form style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <input type='text' name='username' />
      <input type='password' name='password' />

      <input type='submit' value='login' />
    </Form>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

```

## API

### `useForm`



### `useChange`



### `useSubmit`
