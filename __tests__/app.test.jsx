//snapshot test of /pages/app.js

import { render } from '@testing-library/react';
import App from '../pages/app';

it('renders apppage unchanged', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })