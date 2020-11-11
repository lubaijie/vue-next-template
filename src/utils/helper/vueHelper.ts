import {
  watch,
  computed,
  WatchSource,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  nextTick,
  reactive,
  ref,
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

export function splitObject(target, source) {
  const targetKeys = Object.keys(target);
  targetKeys.forEach(key => {
    if (source[key]) {
      target[key] = source[key];
    }
  });

  return target;
}
