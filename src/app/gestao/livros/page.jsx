"use client";

import { useState, useEffect } from "react";
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";

export default function gestaolivros() {

    const router = useRouter();

    const [livros, setlivros] = useState({})
    const [token, setToken] = useState({})
    const [loaded, setLoaded] = useState(false)

    const livroInativo = {
        "status": "INATIVO"
    }

    useEffect(() => {
        if (isTokenValid()) {
            // console.log(isTokenValid(false))
            // console.log('isTokenValid()')
            setToken(isTokenValid(false))
        } else {
            clearExpiredToken()
            router.push(`/login`);
        }
    }, [])

    useEffect(() => {
        console.log(token)
        console.log('token')
    }, [token])

    useEffect(() => {
        console.log(livros)
        console.log('livros')
    }, [livros])

    useEffect(() => {
        const fetchlivros = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar livros');
                }

                const data = await response.json();
                setlivros(data);
                setLoaded(true)
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchlivros();
    }, [token]);

    function handleExluirlivro(titulo) {
        const confirmacao = confirm("Deseja excluir este livro?");
        if (confirmacao) {
            removerlivroBanco(titulo)
            removerlivroFront(titulo)
            alert("livro excluído com sucesso.");
            // Aqui você pode adicionar a lógica para exclusão do livro
        } else {
            alert("Ação cancelada.");
            // Lógica caso o livro cancele a exclusão
        }
    }

    function removerlivroFront(titulo) {
        setlivros((prevlivros) => prevlivros.filter(livro => livro.titulo !== titulo));

    }

    async function removerlivroBanco(titulo) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros/status/${titulo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(livroInativo),
        });

        if (!response.ok) {
            throw new Error(`Erro :${response.statusText}`);
        }

        const data = await response.json();
    }

    return (
        <main className=" bg-gray-100 text-gray-900 flex flex-col min-h-[100vh]">

            <Header />

            {/* <!-- Seção de Notícias --> */}
            <section className="container bg-purple-50 mx-auto mt-8 px-4 flex flex-col flex-1 h-[100vh]">
                <div className="flex gap-4 justify-center">

                    <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">livros</h2>
                    <div className="flex justify-center items-center">
                        <a href="/gestao/criar/livro" className="flex p-1 border-2 border-solid border-[#669966] rounded-full justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#669966" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </a>
                    </div>
                </div>


                {loaded ?
                    <div className="flex flex-col">
                        {livros.map((livro) => {
                            if (livro.status == 'INATIVO') {

                            } else {
                                return (
                                    <div className="bg-white px-4 py-2 rounded-lg flex shadow-md mb-4 rounded-full items-center justify-between">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                            </svg>

                                            <p className="text-xl font-semibold text-purple-600">{livro.titulo}</p>
                                            {/* <p className="pl-2 text-md font-semibold text-gray-400">{livro.email}</p> */}
                                        </div>
                                        <div className="flex">
                                            <div className="mr-1">
                                                <a className='cursor-pointer' href={'livros/' + livro.titulo}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="cursor-pointer" onClick={() => handleExluirlivro(livro.titulo)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cc2222" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }

                        )}

                    </div>
                    :
                    <div className="flex justify-center">Carregando...</div>

                }



            </section>



        </main>
    )
}