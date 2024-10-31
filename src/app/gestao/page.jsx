"use client";

import { useState, useEffect } from "react";
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import Header from "@/components/Header";

export default function gestaoUsuarios() {

    const router = useRouter();

    const [usuarios, setUsuarios] = useState({})
    const [token, setToken] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (isTokenValid()) {
            // console.log(isTokenValid(false))
            // console.log('isTokenValid()')
            setToken(isTokenValid(false))
            setLoaded(true)
        } else {
            clearExpiredToken()
            router.push('/login');
        }
    }, [])

    useEffect(() => {
        console.log(token)
        console.log('token')
    }, [token])


    return (
        <main className=" bg-gray-100 text-gray-900 flex flex-col min-h-[100vh]">

            <Header />

            {/* <!-- Seção de Notícias --> */}
            <section className="container bg-purple-50 mx-auto mt-8 px-4 flex flex-col flex-1 h-[100vh]">
                <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Menu Gestão</h2>


                {loaded ?
                    <div className="flex flex-col">

                        <div className="bg-white px-6 py-4 rounded-lg flex shadow-md mb-6 rounded-full items-center justify-between">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <p className="text-2xl font-semibold text-purple-600 ml-2">Gerenciar Usuários</p>
                            </div>
                            <div className="flex">
                                <a href="/gestao/usuarios">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>

                            </div>
                        </div>

                    </div>
                    :
                    <div className="flex justify-center">Carregando...</div>

                }



            </section>



        </main>
    )
}