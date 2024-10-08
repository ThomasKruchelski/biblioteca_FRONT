"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const usuario = "Domanski"

  const [livros, setLivros] = useState([
    {
      "id": "123",
      "codigoUnico": "123",
      "titulo": "Pequeno Princípe",
      "dataPublicada": "2024-08-13",
      "temas": ["literatura infantil", "fantasia"],
      "autores": ["grande principe"],
      "editoras": ["Rosa do asteróide"],
      "palavrasChaves": ["pequeno", "principe"],
      "resumo": "O classico de Pequeno Principe muito irado",
      "exemplares": [
        {
          "id": "12301",
          "ocupado": false
        },
        {
          "id": "12302",
          "ocupado": false
        },
        {
          "id": "12303",
          "ocupado": false
        }
      ]
    },
    {
      "id": "321",
      "codigoUnico": "321",
      "titulo": "Java como programar DEITEL",
      "dataPublicada": "2024-08-10",
      "temas": ["programação", "fantasia", "java"],
      "autores": ["Fabio Spak"],
      "editoras": ["Mili"],
      "palavrasChaves": ["java", "programação", "desenvolvedor", "sofrimento"],
      "resumo": "Programação em Java para ganhar milhões",
      "exemplares": [
        {
          "id": "32101",
          "ocupado": true
        },
        {
          "id": "32102",
          "ocupado": false
        },
        {
          "id": "32103",
          "ocupado": false
        },
        {
          "id": "32104",
          "ocupado": false
        }
      ]
    },
    {
      "id": "456",
      "codigoUnico": "456",
      "titulo": "Como ser padrasto",
      "dataPublicada": "2024-02-10",
      "temas": ["educação", "filhos", "java"],
      "autores": ["Jeferson Jeferson"],
      "editoras": ["Mili"],
      "palavrasChaves": ["filho", "casada", "educação", "sofrimento", "manual"],
      "resumo": "Título para aprender a ser um bom pai",
      "exemplares": [
        {
          "id": "45601",
          "ocupado": false
        }
      ]
    },
    {
      "id": "456",
      "codigoUnico": "456",
      "titulo": "Como ser padrasto",
      "dataPublicada": "2024-02-10",
      "temas": ["educação", "filhos", "java"],
      "autores": ["Jeferson Jeferson"],
      "editoras": ["Mili"],
      "palavrasChaves": ["filho", "casada", "educação", "sofrimento", "manual"],
      "resumo": "Título para aprender a ser um bom pai",
      "exemplares": [
        {
          "id": "45601",
          "ocupado": false
        }
      ]
    }
  ])

  return (

    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <body class="bg-gray-100 font-sans">

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
                        <img src="https://via.placeholder.com/40" alt="User avatar" class="rounded-full"/>
              </div>    
            </div>
          </header>

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
        </main>
      </div>
    </body>
  );
}
