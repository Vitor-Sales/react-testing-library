import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', { name: 'Encountered Pokémon' }));
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toHaveTextContent('Próximo Pokémon');

    await user.click(nextBtn);

    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    const thirdPokemon = screen.getByText(/caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    const fourthPokemon = screen.getByText(/ekans/i);
    expect(fourthPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    const fifthPokemon = screen.getByText(/alakazam/i);
    expect(fifthPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    const sixthPokemon = screen.getByText(/mew/i);
    expect(sixthPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    const seventhPokemon = screen.getByText(/rapidash/i);
    expect(seventhPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    const eighthPokemon = screen.getByText(/snorlax/i);
    expect(eighthPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    const ninethPokemon = screen.getByText(/dragonair/i);
    expect(ninethPokemon).toBeInTheDocument();

    await user.click(nextBtn);

    expect(firstPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    // Esse teste não causou mudanças

    const moreDetailsArray = screen.getAllByRole('link', { name: /more details/i });

    expect(moreDetailsArray).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const arrayTypeBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: 'All' });

    expect(allBtn).toBeInTheDocument();
    expect(arrayTypeBtn).toHaveLength(7);
    expect(arrayTypeBtn[0]).toHaveTextContent(/electric/i);
    expect(arrayTypeBtn[1]).toHaveTextContent(/fire/i);
    expect(arrayTypeBtn[2]).toHaveTextContent(/bug/i);
    expect(arrayTypeBtn[3]).toHaveTextContent(/poison/i);
    expect(arrayTypeBtn[4]).toHaveTextContent(/psychic/i);
    expect(arrayTypeBtn[5]).toHaveTextContent(/normal/i);
    expect(arrayTypeBtn[6]).toHaveTextContent(/dragon/i);

    await user.click(arrayTypeBtn[5]);

    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    const { user } = renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    const bugBtn = screen.getByRole('button', { name: /bug/i });

    expect(allBtn).toBeInTheDocument();

    await user.click(bugBtn);
    const bugPokemon = screen.getByText(/caterpie/i);

    expect(bugPokemon).toBeInTheDocument();

    await user.click(allBtn);
    const firstPokemon = screen.getByText(/pikachu/i);

    expect(firstPokemon).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    await user.click(nextBtn);

    const secondPokemon = screen.getByText(/charmander/i);

    expect(secondPokemon).toBeInTheDocument();
  });
});
