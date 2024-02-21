import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6 - Testes de Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', async () => {
    const { user } = renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const electricBtn = screen.getByRole('button', { name: 'Electric' });

    await user.click(electricBtn);

    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonTypeInnerText = pokemonType.textContent;
    const electricBtnText = electricBtn.textContent;

    expect(pokemonTypeInnerText).toEqual(electricBtnText);

    const pokemonWeight = screen.getByText(/average weight/i);

    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido', async () => {
    renderWithRouter(<App />);

    // const detailsBtn = await screen.findByRole('link', { name: /more details/i });
    const detailsBtn = await screen.findByText(/more details/i);

    expect(detailsBtn).toBeInTheDocument();
    expect(detailsBtn).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
    const { user } = renderWithRouter(<App />);

    const detailsLink = await screen.findByRole('link', { name: /more details/i });
    await user.click(detailsLink);

    expect(detailsLink).toHaveAttribute('href', '/pokemon/25');

    const pokemonDetail = screen.getByRole('heading', { name: /pikachu details/i });

    expect(pokemonDetail).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, em que <id> é o id do Pokémon cujos detalhes se deseja ver.', () => {
    renderWithRouter(<App />);
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    await user.click(moreDetails);

    const favoriteCheckbox = screen.getByRole('checkbox');

    await user.click(favoriteCheckbox);

    const favoriteIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(favoriteIcon).toBeInTheDocument();
  });
});
