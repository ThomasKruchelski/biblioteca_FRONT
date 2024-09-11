"use client";

// import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function perfil({params}) {

    // const router = useRouter();

    // useEffect(()=>{
    //     console.log(router)
    // },[])

    const {email} = params

    return (
        <main class="bg-gray-100">

           {/* <!-- Container Principal -->*/}
            <div class="max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg shadow-md">
                {/* <!-- Informações do Perfil --> */}
                <div class="flex items-center mb-6">
                    <img src="https://via.placeholder.com/100" alt="User Avatar" class="rounded-full w-24 h-24 mr-4"/>
                    <div>
                        <h2 class="text-2xl font-semibold text-black">{email}</h2>
                        <p class="text-gray-600">{email}</p>
                        <p class="text-gray-600">Membro desde: Janeiro 2023</p>
                        <p class="text-gray-600">{email}</p>
                    </div>
                </div>

                {/* <!-- Seção de Preferências --> */}
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-2">Preferências</h3>
                    <p class="text-gray-700">Gêneros Favoritos: Ficção Científica, Romance, Fantasia</p>
                    <p class="text-gray-700">Autores Favoritos: Isaac Asimov, Jane Austen, J.K. Rowling</p>
                </div>

                {/* <!-- Histórico de Empréstimos --> */}
                <div class="mb-6 text-black">
                    <h3 class="text-xl font-semibold mb-2">Histórico de Empréstimos</h3>
                    <table class="table-auto w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th class="border-b-2 p-2">Título do Livro</th>
                                <th class="border-b-2 p-2">Data de Empréstimo</th>
                                <th class="border-b-2 p-2">Data de Devolução</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border-b p-2">1984</td>
                                <td class="border-b p-2">15/08/2024</td>
                                <td class="border-b p-2">01/09/2024</td>
                            </tr>
                            <tr>
                                <td class="border-b p-2">Orgulho e Preconceito</td>
                                <td class="border-b p-2">10/07/2024</td>
                                <td class="border-b p-2">24/07/2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <!-- Livros Reservados --> */}
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-2">Livros Reservados</h3>
                    <ul class="list-disc list-inside text-gray-700">
                        <li>Fundação - Isaac Asimov (Previsto para: 15/09/2024)</li>
                        <li>O Senhor dos Anéis - J.R.R. Tolkien (Previsto para: 20/09/2024)</li>
                    </ul>
                </div>

                {/* <!-- Atualizar Dados --> */}
                <div class="text-right">
                    <a href="/edit-profile" class="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                        Atualizar Dados Cadastrais
                    </a>
                </div>

                {/* <!-- Botão Voltar para Home --> */}
                <div class="mt-8 text-center">
                    <a href="index.html" class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600">Tela inicial</a>
                </div>
            </div>

        </main>
    )
}