import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import mockedAxios from 'axios';
import createApp from '../src/createApp.jsx';
import buildApp from '../server/index.js';

beforeEach(() => {
  const app = buildApp({ port: 5000 });
  mockedAxios.setApp(app);
  render(createApp());
});

it('tests message sending to general and not to random', async () => {
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

  expect(document.activeElement).toBe(input);

  userEvent.click(random);
  expect(screen.queryByText(/hello, man/i)).toBeNull();
});

const tryCreateChannel = (name) => {
  const newChannel = screen.getByRole('button', { name: /\+/i });
  userEvent.click(newChannel);
  const input = screen.getByRole('textbox', { name: /channelName/i });
  const submit = screen.getByRole('button', { name: /submit/i });
  userEvent.type(input, name);
  userEvent.click(submit);
};

it('tests adding a channel', async () => {
  const newChannel = screen.getByRole('button', { name: /\+/i });
  expect(newChannel).toBeInTheDocument();
  userEvent.click(newChannel);

  const input = screen.getByRole('textbox', { name: /channelName/i });
  const submit = screen.getByRole('button', { name: /submit/i });
  const cancel = screen.getByRole('button', { name: /cancel/i });
  expect(input).toBeInTheDocument();
  expect(submit).toBeInTheDocument();

  expect(document.activeElement).toBe(input);
  userEvent.type(input, 'a');
  cancel.focus();
  expect(
    await screen.findByText('Must be 3 to 20 characters'),
  ).toBeInTheDocument();
  expect(submit).toBeDisabled();
  userEvent.type(input, 'aa');
  cancel.focus();
  await waitForElementToBeRemoved(() =>
    screen.getByText('Must be 3 to 20 characters'),
  );
  userEvent.clear(input);
  cancel.focus();
  expect(await screen.findByText('Required')).toBeInTheDocument();
  userEvent.type(input, 'random');
  cancel.focus();
  expect(await screen.findByText('Must be unique')).toBeInTheDocument();
  userEvent.clear(input);
  userEvent.type(input, 'my channel');
  cancel.focus();
  await waitForElementToBeRemoved(() => screen.getByText('Must be unique'));
  expect(submit).toBeEnabled();

  userEvent.click(submit);
  const myChannel = await screen.findByRole('button', { name: 'my channel' });
  expect(myChannel).toBeInTheDocument();
});

it('tests renaming a channel', async () => {
  tryCreateChannel('my channel');
  expect(
    await screen.findByRole('button', { name: /my channel/i }),
  ).toBeInTheDocument();
  const dropdown = screen.getByRole('button', { name: /dropdown/i });
  userEvent.click(dropdown);
  const rename = screen.getByRole('button', { name: /rename/i });
  userEvent.click(rename);
  const input = screen.getByRole('textbox', { name: /channelName/i });
  const submit = screen.getByRole('button', { name: /submit/i });
  const cancel = screen.getByRole('button', { name: /cancel/i });
  expect(input).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
  expect(document.activeElement).toBe(input);
  userEvent.type(input, 'a');
  cancel.focus();
  expect(
    await screen.findByText('Must be 3 to 20 characters'),
  ).toBeInTheDocument();
  expect(submit).toBeDisabled();
  userEvent.type(input, 'aa');
  cancel.focus();
  await waitForElementToBeRemoved(() =>
    screen.getByText('Must be 3 to 20 characters'),
  );
  userEvent.clear(input);
  cancel.focus();
  expect(await screen.findByText('Required')).toBeInTheDocument();
  userEvent.type(input, 'my channel');
  cancel.focus();
  expect(await screen.findByText('Must be unique')).toBeInTheDocument();
  userEvent.clear(input);
  userEvent.type(input, 'not my channel');
  cancel.focus();
  await waitForElementToBeRemoved(() => screen.getByText('Must be unique'));
  expect(submit).toBeEnabled();
  userEvent.click(submit);
  expect(
    await screen.findByRole('button', { name: 'not my channel' }),
  ).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'my channel' })).toBeNull();
});
it('tests removing a channel', async () => {
  tryCreateChannel('my channel');
  expect(
    await screen.findByRole('button', { name: /my channel/i }),
  ).toBeInTheDocument();
  const dropdown = screen.getByRole('button', { name: /dropdown/i });
  userEvent.click(dropdown);
  const remove = screen.getByRole('button', { name: /remove/i });
  userEvent.click(remove);
  const confirm = screen.getByRole('button', { name: /confirm/i });
  expect(confirm).toBeInTheDocument();
  userEvent.click(confirm);
  expect(
    await screen.findByRole('button', { name: 'general' }),
  ).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'my channel' })).toBeNull();
});
