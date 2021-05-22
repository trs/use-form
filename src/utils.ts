import React from "react";

export type ValueFormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLOptionElement;

const validTypes = [
  'select',
  'textarea',
  'option',
  'input'
];

const checkedInputTypes = [
  'checkbox',
  'radio'
];

const ignoreInputTypes = [
  'button',
  'submit',
  'image',
  'reset'
]

export const isValidFormElement = (child: any): child is React.ReactElement => {
  return React.isValidElement(child)
    && 'type' in child
    && validTypes.includes((child as React.ReactElement).type as string)
    && 'name' in (child as React.ReactElement).props
    && !('data-form-ignore' in (child as React.ReactElement).props)
};

export const shouldIgnoreInputType = (child: React.ReactElement) => {
  return child.type === 'input' && ignoreInputTypes.includes(child.props.type);
};

export const getInputValueKey = (tagName: string, type: string) => {
  if (tagName.toLocaleLowerCase() === 'input' && checkedInputTypes.includes(type)) return 'checked';
  return 'value';
};
