"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from '@/components/Header';

export default function perfil({ params }) {

    const [usuario, setUsuario] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState({})

    const queryParams = useParams();
    const queryEmail = decodeURIComponent(queryParams.email)
    console.log(queryEmail)

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
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/email/${queryEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'aplication/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }

                const data = await response.json();
                setUsuario(data);
                setLoaded(true)
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchUsuario()
    }, [token])

    useEffect(() => {
        console.log(usuario)
        console.log('usuario')
    }, [usuario])

    return (
        <main className=" bg-gray-100 text-gray-900 flex flex-col min-h-[100vh]">
            <Header />
            <section className="container bg-purple-50 mx-auto mt-8 px-4 flex flex-col flex-1 h-[100vh]">
                {loaded &&
                    <div className='flex flex-col'>
                        <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Editando {usuario.nome}</h2>
                        <div className='flex flex-col mb-4'>
                            <input
                                className='mb-2'
                                value={usuario.nome}
                            ></input>
                            <input
                                className='mb-2'
                                value={usuario.email}
                            ></input>
                            <input
                                className='mb-2'
                                value={usuario.tipoUsuario.descricao}
                            ></input>
                            <input
                                className='mb-2'
                                value={usuario.tipoUsuario.dias_emprestimo}
                            ></input>
                            <input
                                className='mb-2'
                                value={usuario.tipoUsuario.multa_diaria}
                            ></input>
                        </div>
                        <div className='flex justify-around items-center'>
                            <a href='./'>
                                <div className='px-4 py-2 rounded bg-[#cc2222] text-white'>Cancelar</div>
                            </a>
                            <div className='px-4 py-2 rounded bg-[#669966] text-white'>Salvar</div>
                        </div>
                    </div>
                }
            </section>
        </main>
    )
}