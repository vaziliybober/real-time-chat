import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import mockedAxios from 'axios';
import createApp from '../src/createApp.jsx';
import buildApp from '../server/index.js';

it('tests everything', async () => {
  const app = buildApp({ port: 5000 });
  mockedAxios.setApp(app);

  render(createApp());
  const general = screen.getByRole('button', { name: /general/i });
  expect(general).toBeInTheDocument();
  const random = screen.getByRole('button', { name: /random/i });
  expect(random).toBeInTheDocument();

  const input = screen.getByRole('textbox', { name: /message/i });
  const submit = screen.getByRole('button', { name: /submit/i });
  expect(document.activeElement).toBe(input);

  userEvent.type(input, 'hello, man');
  userEvent.click(submit);
  expect(input).toBeDisabled();
  expect(submit).toBeDisabled();
  expect(await screen.findByText(/hello, man/i)).toBeInTheDocument();

  userEvent.click(random);
  expect(screen.queryByText(/hello, man/i)).toBeNull();
});
