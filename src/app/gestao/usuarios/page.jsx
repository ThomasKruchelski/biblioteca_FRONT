"use client";

import { useState, useEffect } from "react";
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from "@/components/Header";

export default function gestaoUsuarios() {

    const [usuarios, setUsuarios] = useState({})
    const [token, setToken] = useState({})

    useEffect(() => {
        if (isTokenValid()) {
            // console.log(isTokenValid(false))
            // console.log('isTokenValid()')
            setToken(isTokenValid(false))
        } else {
            clearExpiredToken()
        }
    }, [])

    useEffect(()=> {
        console.log(token)
        console.log('token')
    }, [token])

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const testeFu = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAdGVzdGUuY29tIiwibmFtZSI6IkFkbWluMiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzI5NDU0MTQ3LCJleHAiOjE3Mjk0NTc3NDd9.3Tcsy-GfyiGtl6iRwKkVPSY9AKtzCajJNGG876sIPviJNvlk-1LReTauMPRFs7bVLc5J22E_AJO-uz3og7EC9w`
                console.log(testeFu)
                console.log('testeFu')

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios`, {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type':'aplication/json',
                        Authorization: testeFu
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar usuários');
                }

                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchUsuarios();
    }, [token]);

    return (
        <main className=" bg-gray-100 text-gray-900 flex flex-col min-h-[100vh]">

            <Header/>

            {/* <!-- Seção de Notícias --> */}
            <section className="container bg-purple-50 mx-auto mt-8 px-4 flex flex-col flex-1 h-[100vh]">
                <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Usuários</h2>


                <div className="bg-white px-4 py-2 rounded-lg flex shadow-md mb-4 rounded-full items-center justify-between">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <p className="text-xl font-semibold text-purple-600">Usuário 1</p>
                        <p className="pl-2 text-md font-semibold text-gray-400">email@email.com</p>
                    </div>
                    <div className="flex">
                        <p className="pr-4 text-md font-semibold text-gray-400">Admin</p>
                        <div className="mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cc2222" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>


            </section>



        </main>
    )
}