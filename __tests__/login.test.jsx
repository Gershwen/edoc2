//snapshot test of /pages/login.js

import { render } from '@testing-library/react';
import Login from '../pages/login';

it('renders loginpage unchanged', () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })