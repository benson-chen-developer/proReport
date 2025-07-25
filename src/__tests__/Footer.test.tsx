import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer/Footer';

test('renders a name', () => {
  render(<Footer />);
  expect(screen.getByText('Built by Benson Chen')).toBeInTheDocument();
});
