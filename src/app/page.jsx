"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from "@/components/Header";

export default function Home() {

  const [loaded, setLoaded] = useState(false)
  const [token, setToken] = useState('')
  const [livros, setLivros] = useState(
    //   
  )
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (isTokenValid()) {
      console.log(isTokenValid(true))
      console.log('isTokenValid()')
      // setUserInfo(isTokenValid())
    } else {
      clearExpiredToken()
    }
  }, [])

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros`, {
          method: 'GET',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'aplication/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar Livros');
        }

        const data = await response.json();
        console.log(data)
        console.log('data')
        setLivros(data);
        setLoaded(true)

      } catch (error) {
        console.error(error);
      }

    }
    fetchLivros()
  }, [])

  return (

    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <body class="bg-gray-100 font-sans">
      <Header />

      <div class="flex min-h-screen">
        <aside class="bg-white w-64 p-6">
          <h2 class="text-xl font-semibold mb-8">Livros</h2>
          <nav>
            <ul>
              <li class="mb-4">
                <a href="#" class="text-purple-600 font-medium flex items-center">
                  <span class="material-icons mr-2 hidden">library_books</span>
                  Meus Livros
                </a>
              </li>
              <li class="mb-4">
                <a href="#" class="text-gray-600 flex items-center">
                  <span class="material-icons mr-2 hidden">favorite</span>
                  Favoritos
                </a>
              </li>
              <li class="mb-4">
                <a href="#" class="text-gray-600 flex items-center">
                  <span class="material-icons mr-2 hidden">category</span>
                  Minhas Categorias
                </a>
              </li>
              <li class="mb-4">
                <a href="#" class="text-gray-600 flex items-center">
                  <span class="material-icons mr-2 hidden">message</span>
                  Minhas Mensagens
                </a>
              </li>
            </ul>
          </nav>

          <div class="mt-12">
            <h3 class="text-lg font-semibold mb-4">Tipos de Livro</h3>
            <ul>
              <li class="mb-2">
                <a href="#" class="text-gray-600">Biografia</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-gray-600">Crianças</a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-gray-600">Esportes</a>
              </li>
            </ul>
          </div>
        </aside>

        <main class="flex-1 p-8">
          <header class="flex justify-between items-center mb-8">
            <h1 class="text-2xl font-semibold">Meus Livros</h1>
            <div class="flex items-center">
              <select class="bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-600 mr-4">
                <option>Todas as Categorias</option>
              </select>
              <div class="flex items-center">
                <a href="/perfil" class="mr-2 text-blue-500 hover:underline">Usuário</a>
                <img src="https://via.placeholder.com/40" alt="User avatar" class="rounded-full" />
              </div>
            </div>
          </header>
          {loaded ?
            <section class="grid grid-cols-2 gap-6">

              {livros.map((livro) => (
                <div class="bg-white p-6 rounded-lg shadow-md">
                  <img src="https://via.placeholder.com/100x150" alt="Lorem ipsum" class="mb-4" />
                  <h2 class="text-lg font-semibold mb-2 text-[#000]">{livro.titulo}</h2>
                  <p class="text-gray-600 mb-4">{livro.resumo}</p>
                  <button class="bg-purple-600 text-white px-4 py-2 rounded-lg">Leia mais</button>
                </div>
              ))}
            </section>
            :
            <section class="flex justify-center grid-cols-2 gap-6">
              Carregando...
            </section>
          }

        </main>
      </div>
    </body>
  );
}
