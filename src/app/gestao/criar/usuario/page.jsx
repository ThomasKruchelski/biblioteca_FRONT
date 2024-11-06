"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from '@/components/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function perfil({ params }) {

    const router = useRouter();

    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        status: "ATIVO",
        tipoUsuario: {
            descricao: "",
        }
    })
    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState({})

    const queryParams = useParams();
    const queryEmail = decodeURIComponent(queryParams.email)
    console.log(queryEmail)

    useEffect(()=>{
        console.log(JSON.stringify(usuario))
    },[usuario])

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

    // useEffect(() => {
    //     const fetchUsuario = async () => {
    //         try {
    //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/email/${queryEmail}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Erro ao buscar usuários');
    //             }

    //             const data = await response.json();
    //             setUsuario(data);
    //             setLoaded(true)
    //         } catch (error) {
    //             console.error('Erro:', error);
    //         }
    //     };
    //     fetchUsuario()
    // }, [token])

    useEffect(() => {
        console.log(usuario)
        console.log('usuario')
    }, [usuario])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUsuario((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChangeTipoUsuario = (e) => {
        const { name, value } = e.target;

        setUsuario((prevState) => ({
            ...prevState,
            tipoUsuario: {
                ...prevState.tipoUsuario,
                [name]: value
            }
        }));
    };


    const fetchAlteraUsuario = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                toast.error(`Erro ao criar usuário`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                throw new Error('Erro ao criar usuário');
            }

            const data = await response.json();
            console.log(data)
            console.log('data')
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
            router.push('/gestao/usuarios');
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
                        <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Criando {usuario.nome}</h2>
                        <div className='flex flex-col mb-4'>

                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Nome
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={usuario.nome}
                                    name='nome'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Email
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={usuario.email}
                                    name='email'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Senha
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={usuario.senha}
                                    name='senha'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Descrição
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={usuario.tipoUsuario.descricao}
                                    name='descricao'
                                    onChange={handleInputChangeTipoUsuario}
                                ></input>
                            </label>
                            
                        </div>
                        <div className='flex justify-around items-center'>
                            <a href='./'>
                                <div className='px-4 py-2 rounded bg-[#cc2222] text-white cursor-pointer'>Cancelar</div>
                            </a>
                            <div onClick={() => fetchAlteraUsuario()} className='px-4 py-2 rounded bg-[#669966] text-white cursor-pointer'>Salvar</div>
                        </div>
                        <ToastContainer />
                    </div>
                }
            </section>
        </main>
    )
}