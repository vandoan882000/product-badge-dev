import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Test', () => {
  test('Hello world button', () => {
    render(<button>Hello world</button>);
    expect(screen.getByText(/Hello world/i)).toBeDefined();
  });
});
