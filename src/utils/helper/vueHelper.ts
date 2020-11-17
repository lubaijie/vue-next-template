import {
  watch,
  computed,
  WatchSource,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  nextTick,
  reactive,
} from 'vue';

export function explicitComputed<T, S>(source: WatchSource<S>, fn: () => T) {
  const v = reactive<any>({ value: fn() });
  watch(source, () => (v.value = fn()));
  return computed<T>(() => v.value);
}

export function tryOnMounted(fn: () => void, sync = true) {
  if (getCurrentInstance()) {
    onMounted(fn);
  } else if (sync) {
    fn();
  } else {
    nextTick(fn);
  }
}

export function tryOnUnmounted(fn: () => Promise<void> | void) {
  if (getCurrentInstance()) {
    onUnmounted(fn);
  }
}

export function tryTsxEmit(fn: (_instance: any) => Promise<void> | void) {
  const instance = getCurrentInstance();

  if (instance) {
    fn.call(null, instance);
  }
}

export function isInSetup() {
  if (!getCurrentInstance()) {
    throw new Error('Please put useForm function in the setup function!');
  }
}

export function splitProps(target, source) {
  const remain: any = {};
  const targetKeys = Object.keys(target);
  Object.keys(source).forEach(key => {
    if (targetKeys.indexOf(key) > -1) {
      target[key] = source[key];
    } else {
      remain[key] = source[key];
    }
  });

  return {target, remain};
}
