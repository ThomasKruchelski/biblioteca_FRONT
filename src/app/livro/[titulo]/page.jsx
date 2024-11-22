"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from '@/components/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function perfil() {

    const router = useRouter();

    const [livro, setlivro] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState({})

    const queryParams = useParams();
    const querytitulo = decodeURIComponent(queryParams.titulo)
    console.log(querytitulo)

    useEffect(() => {
        if (isTokenValid()) {
            // console.log(isTokenValid(false))
            // console.log('isTokenValid()')
            setToken(isTokenValid(false))
        } else {
            clearExpiredToken()
            router.push('/login');
        }
    }, [])

    useEffect(() => {
        const fetchlivro = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros/titulo/${querytitulo}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }

                const data = await response.json();
                setlivro(data);
                setLoaded(true)
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchlivro()
    }, [token])

    useEffect(() => {
        console.log(livro)
        console.log('livro')
    }, [livro])


    return (
        <main class="bg-gray-100 min-h-[100vh]">
            <Header />
            {loaded &&
                <div class="max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg shadow-md">

                    <div class="flex items-center mb-6">
                        {/* <img src="https://via.placeholder.com/100" alt="User Avatar" class="rounded-full w-24 h-24 mr-4" /> */}
                        <div>
                            <h2 class="text-2xl font-semibold text-black">{livro.titulo}</h2>
                            <div className='flex gap-2'>
                                <h2 class="text-lg font-semibold text-black">Editora:</h2>
                                <h2 class="text-lg font-semibold text-gray-500">{livro.editora.nome}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 class="text-lg font-semibold text-black">Área:</h2>
                                <h2 class="text-lg font-semibold text-gray-500">{livro.area.descricao}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 className="text-lg font-semibold text-black">Autores:</h2>
                                <div className='flex flex-col gap-2'>
                                    {livro.autores.map(autor => {
                                        return (
                                            <h2 class="text-lg font-semibold text-gray-500">{autor.nome}</h2>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='flex flex-col pt-4'>
                                <h2 class="text-lg font-semibold text-black">Resumo:</h2>
                                <p class="text-base font-semibold text-gray-500">{livro.resumo}</p>
                            </div>

                            <p class="text-gray-600"></p>
                            <p class="text-gray-600"></p>
                        </div>
                    </div>
                </div>
            }
        </main>
    )


}