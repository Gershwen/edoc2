//snapshot test of /pages/register.js

import { render } from '@testing-library/react';
import Register from '../pages/register';

it('renders registerpage unchanged', () => {
    const { container } = render(<Register />)
    expect(container).toMatchSnapshot()
  })