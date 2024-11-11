"use client";

import { useState, useEffect } from "react";
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";

export default function gestaoareas() {

    const router = useRouter();

    const [areas, setareas] = useState({})
    const [token, setToken] = useState({})
    const [loaded, setLoaded] = useState(false)

    const areaInativo = {
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
        console.log(areas)
        console.log('areas')
    }, [areas])

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
                    throw new Error('Erro ao buscar usuários');
                }

                const data = await response.json();
                setareas(data);
                setLoaded(true)
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchareas();
    }, [token]);

    function handleExluirarea(descricao) {
        const confirmacao = confirm("Deseja excluir este usuário?");
        if (confirmacao) {
            removerareaBanco(descricao)
            removerareaFront(descricao)
            alert("Usuário excluído com sucesso.");
            // Aqui você pode adicionar a lógica para exclusão do usuário
        } else {
            alert("Ação cancelada.");
            // Lógica caso o usuário cancele a exclusão
        }
    }

    function removerareaFront(descricao) {
        setareas((prevareas) => prevareas.filter(area => area.descricao !== descricao));

    }

    async function removerareaBanco(descricao) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/areas/status/${descricao}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(areaInativo),
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

                    <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">areas</h2>
                    <div className="flex justify-center items-center">
                        <a href="/gestao/criar/area" className="flex p-1 border-2 border-solid border-[#669966] rounded-full justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#669966" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </a>
                    </div>
                </div>


                {loaded ?
                    <div className="flex flex-col">
                        {areas.map((area) => {
                            if (area.status == 'INATIVO') {

                            } else {
                                return (
                                    <div className="bg-white px-4 py-2 rounded-lg flex shadow-md mb-4 rounded-full items-center justify-between">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>

                                            <p className="text-xl font-semibold text-purple-600">{area.descricao}</p>
                                            {/* <p className="pl-2 text-md font-semibold text-gray-400">{area.email}</p> */}
                                        </div>
                                        <div className="flex">
                                            {/* <div className="mr-1">
                                                <a className='cursor-pointer' href={'areas/' + area.descricao}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </a>
                                            </div> */}
                                            <div className="cursor-pointer" onClick={() => handleExluirarea(area.descricao)}>
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