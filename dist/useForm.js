"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("./utils");
function useForm(defaultValues = {}) {
    const eventsRef = react_1.useRef({
        onChange: new Set(),
        onSubmit: new Set()
    });
    const registerEvent = (event, cb) => {
        var _a;
        if (!eventsRef.current)
            return;
        if (!eventsRef.current[event])
            eventsRef.current[event] = new Set();
        (_a = eventsRef.current[event]) === null || _a === void 0 ? void 0 : _a.add(cb);
    };
    const unregisterEvent = (event, cb) => {
        var _a;
        if (!eventsRef.current)
            return;
        if (!eventsRef.current[event])
            return;
        (_a = eventsRef.current[event]) === null || _a === void 0 ? void 0 : _a.delete(cb);
    };
    const callEvent = react_1.useMemo(() => (event, state) => {
        var _a;
        const events = eventsRef.current;
        if (!events)
            return;
        if (!events[event])
            return;
        for (const handle of (_a = events[event]) === null || _a === void 0 ? void 0 : _a.values()) {
            handle(state);
        }
    }, [eventsRef.current]);
    const FormComponent = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const [state, setState] = react_1.useState(defaultValues);
        react_1.useEffect(() => {
            callEvent('onChange', state);
        }, [state]);
        const valueChanged = (e) => {
            const name = e.target.name;
            const value = e.target[utils_1.getInputValueKey(e.target.tagName, e.target.type)];
            setState((currentState) => (Object.assign(Object.assign({}, currentState), { [name]: value })));
        };
        const addChangeEvent = (child) => {
            var _a;
            if (Array.isArray(child))
                return react_1.default.Children.map(child, addChangeEvent);
            if (!utils_1.isValidFormElement(child))
                return child;
            if (utils_1.shouldIgnoreInputType(child))
                return child;
            const valueKey = utils_1.getInputValueKey(child.type, child.props.type);
            return react_1.default.cloneElement(child, {
                [valueKey]: (_a = state[child.props.name]) !== null && _a !== void 0 ? _a : '',
                onChange: valueChanged
            });
        };
        return (react_1.default.createElement("form", Object.assign({}, props, { action: "#", onSubmit: (e) => {
                e.preventDefault();
                callEvent('onSubmit', state);
            } }), react_1.default.Children.map(children, addChangeEvent)));
    };
    return {
        control: react_1.useMemo(() => ({
            registerEvent,
            unregisterEvent,
            defaultValues
        }), []),
        Form: FormComponent
    };
}
exports.useForm = useForm;
