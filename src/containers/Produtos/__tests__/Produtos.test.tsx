import { screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: 'https://link-da-imagem.com/eldenring.jpg',
    preco: 12.9,
    plataformas: ['Xbox One', 'PC'],
    precoAntigo: 33.9,
    titulo: 'Ação Game'
  },
  {
    id: 4,
    categoria: 'Terror',
    imagem: 'https://link-da-imagem.com/eldenring.jpg',
    preco: 13.9,
    plataformas: ['Windows'],
    precoAntigo: 44.9,
    titulo: 'Terror Game'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    renderizaComProvider(<Produtos />)
    waitFor(() => {
      expect(screen.getByText('Terror Game')).toBeInTheDocument()
    })
  })
})
