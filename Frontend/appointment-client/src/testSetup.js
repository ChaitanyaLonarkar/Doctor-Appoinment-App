// Polyfill for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock window.location only if it doesn't exist
if (!window.location) {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost',
      pathname: '/',
      assign: jest.fn(),
      replace: jest.fn(),
    },
    writable: true,
  });
}