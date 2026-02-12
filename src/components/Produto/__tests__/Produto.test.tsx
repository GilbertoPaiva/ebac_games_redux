import { fireEvent, screen } from '@testing-library/react'

import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: 'https://link-da-imagem.com/eldenring.jpg',
  preco: 299.9,
  plataformas: ['Windows'],
  precoAntigo: 399.9,
  titulo: 'Elden Ring'
}

describe('Testes para o componente Produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Elden Ring')).toBeInTheDocument()
  })
})

test('Deve adicionar um item ao carrinho', () => {
  const { store } = renderizaComProvider(<Produto game={jogo} />)
  const botao = screen.getByTestId('btn-adicionar-produto')
  fireEvent.click(botao)

  expect(store.getState().carrinho.itens).toHaveLength(1)
})
