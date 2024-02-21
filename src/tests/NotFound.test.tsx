import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente NotFound', () => {
  test('Se a página contem um heading h2 com o texto "Page requested not found', () => {
    renderWithRouter(<App />, { route: '/whatever' });

    const heading = screen.getByRole('heading', { name: /page requested not found/i });

    expect(heading).toBeInTheDocument();
  });

  test("Teste se a página mostra a imagem com o texto alternativo Clefairy pushing buttons randomly with text I have no idea what i'm doing", () => {
    renderWithRouter(<App />, { route: '/whatever' });

    const imgAlt = screen.getByAltText(/Clefairy pushing buttons randomly with text I have no idea what i'm doing/i);

    expect(imgAlt).toBeInTheDocument();
  });
});
