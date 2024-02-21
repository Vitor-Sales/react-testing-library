import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('3 - Testando página favorite pokémons', () => {
  test('Se mostra a mensagem "No favorite pokémons found"', () => {
    // mock
    // render
    renderWithRouter(<App />, { route: '/favorites' });

    expect(screen.getByText(/No favorite pokémon found/i)).toBeInTheDocument();
  });

  test('Se ao favoritar pokémons mostram apenas os favoritados', async () => {
    // render
    const { user } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    await user.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(linkFavorite);

    const pokemon = screen.getByText(/pikachu/i);

    expect(pokemon).toBeInTheDocument();
  });
});
