"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import { useParams, useRouter } from 'next/navigation';
import Header from "@/components/Header";

export default function Home() {

    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState('')
    const [livros, setLivros] = useState()
    const [editoras, setEditoras] = useState()
    const [areas, setAreas] = useState()
    const [autores, setAutores] = useState()
    const [userInfo, setUserInfo] = useState({})

    const queryParams = useParams();
    const querydescricao = decodeURIComponent(queryParams.descricao)
    console.log(querydescricao)

    useEffect(() => {
        if (isTokenValid()) {
            // console.log(isTokenValid(false))
            // console.log('isTokenValid()')
            setToken(isTokenValid())
        } else {
            clearExpiredToken()
        }
    }, [])

    useEffect(() => {
        console.log(token)
        console.log('token')
    }, [token])

    useEffect(() => {
        try {

            if (livros.length >= 0 &&
                areas.length >= 1 &&
                editoras.length >= 1 &&
                autores.length >= 1
            ) {
                setLoaded(true)
            }
        } catch (error) {

        }
    }, [livros, areas, editoras, autores])

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros/area/${querydescricao}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar Livros');
                }
                const data = await response.json();
                console.log(data)
                console.log('data')
                setLivros(data);


            } catch (error) {
                console.error(error);
            }
        }
        fetchLivros()
    }, [token])

    useEffect(() => {
        const fetchareas = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/areas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar areas');
                }
                const data = await response.json();
                console.log(data)
                console.log('data')
                setAreas(data);
                // setLoaded(true)

            } catch (error) {
                console.error(error);
            }
        }
        fetchareas()
    }, [token])

    useEffect(() => {
        const fetchautores = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/autores`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar autores');
                }
                const data = await response.json();
                console.log(data)
                console.log('data')
                setAutores(data);
                // setLoaded(true)

            } catch (error) {
                console.error(error);
            }
        }
        fetchautores()
    }, [token])

    useEffect(() => {
        const fetcheditoras = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/editoras`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar editoras');
                }
                const data = await response.json();
                console.log(data)
                console.log('data')
                setEditoras(data);
                // setLoaded(true)

            } catch (error) {
                console.error(error);
            }
        }
        fetcheditoras()
    }, [token])

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
                                <a href="../../../" class="text-gray-600 font-medium flex items-center font-semibold">
                                    Todos os livros
                                </a>
                            </li>
                            <div className="flex flex-col">
                                <li class="mb-4 text-purple-600 text-gray-600 font-medium flex items-center font-semibold">
                                    {/* <a href="#" className="text-gray-600 font-medium flex items-center font-semibold"> */}
                                    Areas
                                    {/* </a> */}
                                </li>
                                {loaded &&
                                    <div className="flex flex-col">

                                        {areas.map(area => {
                                            return (
                                                <li>
                                                    <a href={'/areas/' + area.descricao} className="text-gray-600 text-base flex items-center">
                                                        {area.descricao}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </div>
                                }
                            </div>

                            <div className="flex flex-col pt-4">
                                <li class="mb-4 text-gray-600 font-medium flex items-center font-semibold">
                                    {/* <a href="#" className="text-gray-600 font-medium flex items-center font-semibold"> */}
                                    Autores
                                    {/* </a> */}
                                </li>
                                {loaded &&
                                    <div className="flex flex-col">

                                        {autores.map(autor => {
                                            return (
                                                <li>
                                                    <a href={'/autores/' + autor.nome} className="text-gray-600 text-base flex items-center">
                                                        {autor.nome}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </div>
                                }
                            </div>

                            <div className="flex flex-col pt-4">
                                <li class="mb-4 text-gray-600 font-medium flex items-center font-semibold">
                                    {/* <a href="#" className="text-gray-600 font-medium flex items-center font-semibold"> */}
                                    Editoras
                                    {/* </a> */}
                                </li>
                                {loaded &&
                                    <div className="flex flex-col">

                                        {editoras.map(editora => {
                                            return (
                                                <li>
                                                    <a href={'/editoras/' + editora.nome} className="text-gray-600 text-base flex items-center">
                                                        {editora.nome}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </div>
                                }
                            </div>

                        </ul>
                    </nav>

                </aside>

                <main class="flex-1 p-8">
                    <header class="flex justify-between items-center mb-8">
                        <h1 class="text-2xl font-semibold">Livros de {querydescricao}</h1>
                        <div class="flex items-center">
                            {/* <select class="bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-600">
                <option>Todas as Categorias</option>
              </select> */}

                        </div>
                    </header>
                    {loaded ?
                        <section class="grid grid-cols-2 gap-6">

                            {livros.map((livro) => (
                                <div class="bg-white p-6 rounded-lg shadow-md flex">

                                    <img src={livro.img ? livro.img : "https://via.placeholder.com/1000x1500"} alt="Lorem ipsum" className="w-[40%] h-fit" />

                                    <div className="pl-5 w-[60%]">
                                        <h2 class="text-xl font-semibold mb-2 text-[#000]">{livro.titulo}</h2>
                                        {/* <h2 class="text-xl font-semibold mb-2 text-[#000]">{livro.}</h2> */}
                                        <p class="text-gray-600 mb-4">{livro.resumo}</p>
                                        <a href={'/livro/' + livro.titulo} class="bg-purple-600 text-white px-4 py-2 rounded-lg">Leia mais</a>
                                    </div>
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
