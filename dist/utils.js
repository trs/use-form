"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputValueKey = exports.shouldIgnoreInputType = exports.isValidFormElement = void 0;
const react_1 = __importDefault(require("react"));
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
];
const isValidFormElement = (child) => {
    return react_1.default.isValidElement(child)
        && 'type' in child
        && validTypes.includes(child.type)
        && 'name' in child.props
        && !('data-form-ignore' in child.props);
};
exports.isValidFormElement = isValidFormElement;
const shouldIgnoreInputType = (child) => {
    return child.type === 'input' && ignoreInputTypes.includes(child.props.type);
};
exports.shouldIgnoreInputType = shouldIgnoreInputType;
const getInputValueKey = (tagName, type) => {
    if (tagName.toLocaleLowerCase() === 'input' && checkedInputTypes.includes(type))
        return 'checked';
    return 'value';
};
exports.getInputValueKey = getInputValueKey;
