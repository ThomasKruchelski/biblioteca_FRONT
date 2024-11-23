"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from '@/components/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function perfil({ params }) {

    const router = useRouter();

    const [emprestimo, setemprestimo] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState({})

    const queryParams = useParams();
    const queryid = decodeURIComponent(queryParams.id)
    console.log(queryid)

    const formatDate = (isoDate) => {
        // Converte a string em um objeto Date
        const date = new Date(isoDate);

        // Extrai os componentes
        const day = date.getDate().toString().padStart(2, '0'); // Dia com dois dígitos
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês com dois dígitos (0 = janeiro)
        const year = date.getFullYear(); // Ano
        const hours = date.getHours().toString().padStart(2, '0'); // Hora com dois dígitos
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutos com dois dígitos

        // Formata a string no formato desejado
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

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
        const fetchemprestimo = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/emprestimos/id/${queryid}`, {
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
                setemprestimo(data);
                setLoaded(true)
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchemprestimo()
    }, [token])

    useEffect(() => {
        console.log(emprestimo)
        console.log('emprestimo')
    }, [emprestimo])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setemprestimo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChangeTipoemprestimo = (e) => {
        const { name, value } = e.target;

        setemprestimo((prevState) => ({
            ...prevState,
            tipoemprestimo: {
                ...prevState.tipoemprestimo,
                [name]: value
            }
        }));
    };

    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
        const day = String(now.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário

        return `${year}-${month}-${day}`;
    }

    const fetchAlteraemprestimo = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/emprestimos/id/${queryid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(emprestimo)
            });

            if (!response.ok) {
                toast.error(`Erro ao alterar usuário`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                throw new Error('Erro ao alterar usuário');
            }

            const data = await response.json();
            toast.success(`Usuário alterado com sucesso`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const fetchDevolucao = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/emprestimos/devolucao/${queryid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    data_entrega: getCurrentDate()
                })
            });

            if (!response.ok) {
                toast.error(`Erro ao alterar usuário`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                throw new Error('Erro ao alterar usuário');
            }

            const data = await response.json();
            toast.success(`Usuário alterado com sucesso`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const fetchPagamento = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/emprestimos/pagamento/${queryid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    data_pagamento: getCurrentDate()
                })
            });

            if (!response.ok) {
                toast.error(`Erro ao alterar usuário`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                throw new Error('Erro ao alterar usuário');
            }

            const data = await response.json();
            toast.success(`Usuário alterado com sucesso`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <main className=" bg-gray-100 text-gray-900 flex flex-col min-h-[100vh]">
            <Header router={router} />
            <section className="container bg-purple-50 mx-auto mt-8 px-4 flex flex-col flex-1 h-[100vh]">
                {loaded &&
                    <div className='flex flex-col'>
                        <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Emprestimo Id {emprestimo.id}</h2>
                        <div className='flex flex-col mb-4'>
                            <div className='flex gap-2'>
                                <h2 class="text-lg font-semibold text-black">Titulo do Livro:</h2>
                                <h2 class="text-lg font-semibold text-gray-500">{emprestimo.livro.titulo}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 class="text-lg font-semibold text-black">Data emprestimo</h2>
                                <h2 class="text-lg font-semibold text-gray-500">{formatDate(emprestimo.data_emprestimo)}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 class="text-lg font-semibold text-black">Data previsão</h2>
                                <h2 class="text-lg font-semibold text-gray-500">{formatDate(emprestimo.data_previsao)}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 class="text-lg font-semibold text-black">Data Entrega</h2>
                                <h2 class="text-lg font-semibold text-gray-500">
                                    {emprestimo.data_entrega ?
                                        formatDate(emprestimo.data_entrega)
                                        :
                                        'Não entregue'
                                    }</h2>
                            </div>
                            {emprestimo.data_entrega &&
                                <div className='flex flex-col pt-4'>
                                    <div className='flex gap-2'>
                                        <h2 class="text-lg font-semibold text-black">Multa de atraso:</h2>
                                        <h2 class="text-lg font-semibold text-gray-500">R$ {emprestimo.multa}</h2>
                                    </div>
                                    {emprestimo.pagamento === 'PAGO' &&
                                        <div className='flex gap-2'>
                                            <h2 class="text-lg font-semibold text-black">Data de pagamento:</h2>
                                            <h2 class="text-lg font-semibold text-gray-500">{formatDate(emprestimo.data_pagamento)}</h2>
                                        </div>
                                    }
                                    <div className=' flex gap-2'>
                                        <h2 class="text-lg font-semibold text-black">Status pagamento:</h2>
                                        {emprestimo.pagamento == 'N_PAGO' ?
                                            <h2 class="text-lg font-semibold text-red-500">Não pago</h2>
                                            :
                                            <h2 class="text-lg font-semibold text-green-500">Pago</h2>
                                        }


                                    </div>
                                </div>
                            }
                            {emprestimo.pagamento === 'PAGO' &&
                                    <div className='flex gap-2 pt-4'>
                                        <h2 class="text-lg font-semibold text-green-500">Emprestimo Concluído</h2>
                                        
                                    </div>
                            }
                        </div>
                        <div className='flex justify-around items-center'>
                            <a href='./'>
                                <div className='px-4 py-2 rounded bg-[#cc2222] text-white cursor-pointer'>Voltar</div>
                            </a>
                            {/* <div onClick={() => fetchAlteraemprestimo()} className='px-4 py-2 rounded bg-[#669966] text-white cursor-pointer'>Salvar</div> */}
                            {!emprestimo.data_entrega &&
                                <div onClick={() => fetchDevolucao()} className='px-4 py-2 rounded bg-[#0000ee] text-white cursor-pointer'>Marcar como Entregue</div>
                            }
                            {emprestimo.data_entrega &&
                                <div>
                                    {emprestimo.pagamento === 'N_PAGO' &&
                                        <div onClick={() => fetchPagamento()} className='px-4 py-2 rounded bg-[#669966] text-white cursor-pointer'>Marcar como Pago</div>
                                    }
                                </div>
                            }
                        </div>
                        <ToastContainer />
                    </div>
                }

            </section>
        </main >
    )


}