import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testando a página About: Info, Titulo, parágrafos e imagem', () => {
  renderWithRouter(<App />, { route: '/about' });
  const headingAbout = screen.getByText(/About Pokédex/i);
  const allParagraphs = screen.getAllByText(/pokémon/i, { selector: 'p' });
  const imgPokedex = screen.getByRole('img', {
    name: /pokédex/i,
  });

  expect(headingAbout).toBeInTheDocument();
  expect(allParagraphs).toHaveLength(2);
  expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
