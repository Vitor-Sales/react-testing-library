import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('7 - Testando Pokemon Detailss', () => {
  const rapidashURL = '/pokemon/78';

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, { route: rapidashURL });

    // acessar
    const rapidashDetails = screen.getByText(/rapidash details/i);
    // const moreDetails = screen.getByText(/more details/i);
    const summary = screen.getByRole('heading', { name: 'Summary' });
    const paragraph = screen.getByText(/at full gallop, its four hooves barely touch the ground because it moves so incredibly fast\./i);

    // aferir
    expect(rapidashDetails).toBeInTheDocument();
    // expect(screen.getByText(/more details/i)).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: rapidashURL });

    // acessar
    const gameLocations = screen.getByText(/Game Locations of Rapidash/i);
    // const gameLocations = screen.getByRole('heading', {
    //   name: /Game Locations of Rapidash/i,
    // });

    const locations = [/kanto Route 28/i, /johto mount silver/i];
    const locationImg = screen.getAllByAltText(/rapidash location/i);

    // aferir
    expect(gameLocations).toBeInTheDocument();
    expect(screen.getByText(locations[0])).toBeInTheDocument();
    expect(screen.getByText(locations[1])).toBeInTheDocument();
    expect(locationImg[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/5/5b/Kanto_Route_28_Map.png');
    expect(locationImg[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/9/95/Johto_Mt_Silver_Map.png');
  });

  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes:', async () => {
    const { user } = renderWithRouter(<App />, { route: rapidashURL });

    // acessar
    const checkbox = screen.getByLabelText(/pokémon favoritado?/i);

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
