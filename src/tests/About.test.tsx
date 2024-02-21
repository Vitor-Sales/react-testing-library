import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testando a página About: Info, Titulo, parágrafos e imagem', () => {
  renderWithRouter(<App />, { route: '/about' });
  const headingAbout = screen.getByText(/About Pokédex/i);
  const allParagraphs = screen.getAllByRole('paragraph');
  const imgPokedex = screen.getByRole('img', {
    name: /pokédex/i,
  });

  expect(headingAbout).toBeInTheDocument();
  expect(allParagraphs).toHaveLength(2);
  expect(imgPokedex).toBeInTheDocument();
});
