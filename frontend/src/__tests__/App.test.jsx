import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';
import ShopProvider from '../context/ShopContext';

describe('App Component', () => {
  it('should render without crashing', () => {
    render(
      <ShopProvider>
        <App />
      </ShopProvider>
    );
    // basic assertion
    expect(true).toBe(true);
  });
});
