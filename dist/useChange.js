"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChange = void 0;
const react_1 = require("react");
function useChange(control, name, handle) {
    var _a;
    const valueRef = react_1.useRef((typeof name === 'string' ? (_a = control.defaultValues[name]) !== null && _a !== void 0 ? _a : '' : undefined));
    const mounted = react_1.useRef(false);
    react_1.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    const eventHandler = (state) => {
        if (!mounted.current)
            return;
        if (typeof name === 'function') {
            name(state);
            return;
        }
        if (typeof valueRef.current !== 'string')
            return;
        if (typeof handle !== 'function')
            return;
        const value = state[name];
        if (valueRef.current != value) {
            handle(value);
        }
        valueRef.current = value;
    };
    control.registerEvent('onChange', eventHandler);
    return () => {
        control.unregisterEvent('onChange', eventHandler);
    };
}
exports.useChange = useChange;
