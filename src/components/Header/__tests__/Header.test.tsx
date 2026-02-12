import { screen } from '@testing-library/react'
import Header from '..'

import { renderizaComProvider } from '../../../utils/tests'

describe('Testes do componente Header', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens no carinho', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: 'https://link-da-imagem.com/witcher3.jpg',
              preco: 149.9,
              plataformas: ['PS4', 'Xbox One', 'PC'],
              precoAntigo: 199.9,
              titulo: 'The Witcher 3: Wild Hunt'
            },
            {
              id: 2,
              categoria: 'RPG',
              imagem: 'https://link-da-imagem.com/eldenring.jpg',
              preco: 299.9,
              plataformas: ['Windows'],
              precoAntigo: 399.9,
              titulo: 'Elden Ring'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho')).toHaveTextContent('2 itens')
  })
})
