import { FormControl } from "./useForm";

export function useSubmit<T>(control: FormControl<T>, handle: (state: T) => void) {
  control.registerEvent('onSubmit', handle);

  return () => {
    control.unregisterEvent('onChange', handle)
  };
}
