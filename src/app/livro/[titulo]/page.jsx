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

                    <div class="flex mb-6">
                    <img src={livro.img ? livro.img : "https://via.placeholder.com/1000x1500"} alt="Lorem ipsum" className="w-[40%] h-fit min-w-[40%] mr-6" />
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

                            <div className='flex mt-6'>
                                <div className='px-4 py-2 rounded bg-[#4444cc] text-white'>Vá até uma sede para retirar seu exemplar</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    )


}