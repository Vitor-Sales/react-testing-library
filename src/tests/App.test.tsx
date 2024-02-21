import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testando o componente App.tsx', () => {
  renderWithRouter(<App />);
  // acessar
  const allLinks = screen.getAllByRole('link');
  // agir
  // aferir

  // expect(allLinks).toHaveLength(3);
  expect(allLinks[0]).toBe('Home');
  expect(allLinks[1]).toBe('About');
  expect(allLinks[2]).toBe('Favorite Pokémon');
});

test('Testando navegação da página', async () => {
  const { user } = renderWithRouter(<App />);
  expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();

  const linkAbout = screen.getByRole('link', { name: 'About' });

  await user.click(linkAbout);

  expect(screen.getByText('About Pokédex')).toBeInTheDocument();

  const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });

  await user.click(linkFavorite);

  expect(screen.getByText(/Favorite Pokémon/i)).toBeInTheDocument();

  const linkHome = screen.getByRole('link', { name: 'Home' });

  await user.click(linkHome);

  expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
});

test('Testa rota notFound', () => {
  renderWithRouter(<App />, { route: '/whatever' });

  expect(screen.getByText(/Page request not found/i)).toBeInTheDocument();
});
