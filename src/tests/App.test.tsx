import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1 - Teste do App.tsx', () => {
  test('Testando o componente App.tsx', () => {
    renderWithRouter(<App />);
    // acessar
    const allLinks = screen.getAllByRole('link');
    // agir
    // aferir

    // expect(allLinks).toHaveLength(3);
    // Ver o Matcher correto
    expect(allLinks[0]).toHaveTextContent('Home');
    expect(allLinks[1]).toHaveTextContent('About');
    expect(allLinks[2]).toHaveTextContent('Favorite Pokémon');
  });

  test('Testando navegação da página', async () => {
    const { user } = renderWithRouter(<App />);
    // Ser mais especifico ao pegar os titulos
    expect(screen.getByRole('heading', { name: 'Encountered Pokémon' })).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });

    await user.click(linkAbout);

    expect(screen.getByRole('heading', { name: 'About Pokédex' })).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });

    await user.click(linkFavorite);

    expect(screen.getByRole('heading', { name: /Favorite Pokémon/i })).toBeInTheDocument();

    const linkHome = screen.getByRole('link', { name: 'Home' });

    await user.click(linkHome);

    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i })).toBeInTheDocument();
  });

  test('Testa rota notFound', () => {
    renderWithRouter(<App />, { route: '/whatever' });

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
