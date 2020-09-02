import { provide, inject } from 'vue';
const ToastSymbol = Symbol();
const _toast = () => {};

export function provideToast(config) {
  provide(ToastSymbol, _toast);
}

export function useToast() {
  const toast = inject(ToastSymbol);
  if(!toast) {
    throw new Error('error');
  }
  return toast;
}