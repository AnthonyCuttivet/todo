declare module 'toastify-js' {
    interface ToastifyOptions {
      text?: string;
      duration?: number;
      gravity?: 'top' | 'bottom';
      position?: 'left' | 'center' | 'right';
      backgroundColor?: string;
      close?: boolean;
      stopOnFocus?: boolean;
      onClick?: () => void;
    }

    export default function Toastify(options: ToastifyOptions): {
      showToast: () => void;
    };
  }
