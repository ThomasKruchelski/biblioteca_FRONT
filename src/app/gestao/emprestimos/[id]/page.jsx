"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from '@/components/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function perfil({ params }) {

    const router = useRouter();

    const [editora, seteditora] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState({})

    const queryParams = useParams();
    const querynome = decodeURIComponent(queryParams.nome)
    console.log(querynome)

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
        const fetcheditora = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/editoras/nome/${querynome}`, {
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
                seteditora(data);
                setLoaded(true)
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetcheditora()
    }, [token])

    useEffect(() => {
        console.log(editora)
        console.log('editora')
    }, [editora])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        seteditora((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChangeTipoeditora = (e) => {
        const { name, value } = e.target;

        seteditora((prevState) => ({
            ...prevState,
            tipoeditora: {
                ...prevState.tipoeditora,
                [name]: value
            }
        }));
    };


    const fetchAlteraeditora = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/editoras/nome/${querynome}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editora)
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
                        <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Editando {editora.nome}</h2>
                        <div className='flex flex-col mb-4'>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    nome da editora
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={editora.nome}
                                    name='nome'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    endereço da editora
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={editora.endereco}
                                    name='endereco'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                        </div>
                        <div className='flex justify-around items-center'>
                            <a href='./'>
                                <div className='px-4 py-2 rounded bg-[#cc2222] text-white cursor-pointer'>Cancelar</div>
                            </a>
                            <div onClick={() => fetchAlteraeditora()} className='px-4 py-2 rounded bg-[#669966] text-white cursor-pointer'>Salvar</div>
                        </div>
                        <ToastContainer />
                    </div>
                }

            </section>
        </main>
    )

    
}