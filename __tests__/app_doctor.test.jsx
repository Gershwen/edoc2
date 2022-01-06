//snapshot test of /pages/app_doctor.js

import { render } from '@testing-library/react';
import App from '../pages/app_doctor';

it('renders app_doctorpage unchanged', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })