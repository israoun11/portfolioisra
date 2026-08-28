import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia — used by useTheme for the "system" option.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// jsdom doesn't implement scrollTo on elements — used for auto-scrolling chat/terminal.
Element.prototype.scrollTo = () => {};