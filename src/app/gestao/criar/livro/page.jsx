"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from '@/components/Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function livro({ params }) {

    const router = useRouter();

    const [livro, setlivro] = useState({
        titulo: "",
        edicao: 1,
        resumo: "",
        ano_publicacao: 2024,
        editora: {
            nome: ""
        },
        area: {
            descricao: ""
        },
        autores: [

        ],
        codigo: "",
        quantidade: 0,
        quantidadeDisponivel: 0,
        img: ""
    })
    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState({})

    const queryParams = useParams();
    const queryEmail = decodeURIComponent(queryParams.email)
    console.log(queryEmail)

    useEffect(() => {
        console.log(JSON.stringify(livro))
    }, [livro])

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
    //     const fetchlivro = async () => {
    //         try {
    //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros/email/${queryEmail}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Erro ao buscar livros');
    //             }

    //             const data = await response.json();
    //             setlivro(data);
    //             setLoaded(true)
    //         } catch (error) {
    //             console.error('Erro:', error);
    //         }
    //     };
    //     fetchlivro()
    // }, [token])

    useEffect(() => {
        console.log(livro)
        console.log('livro')
    }, [livro])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setlivro((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleQuantChange = (e) => {
        const { name, value } = e.target;

        setlivro((prevState) => ({
            ...prevState,
            quantidadeDisponivel: value,
            quantidade: value
        }));
    };

    const handleInputChangeEditora = (e) => {
        const { name, value } = e.target;

        setlivro((prevState) => ({
            ...prevState,
            editora: {
                ...prevState.editora,
                nome: value
            }
        }));
    };

    const handleInputChangeArea = (e) => {
        const { name, value } = e.target;

        setlivro((prevState) => ({
            ...prevState,
            area: {
                ...prevState.area,
                descricao: value
            }
        }));
    };

    const handleInputChangeAutor = (e, indice) => {
        const { value } = e.target;

        setlivro((prevObjeto) => ({
            ...prevObjeto,
            autores: prevObjeto.autores.map((autor, i) =>
                i === indice ? { ...autor, nome: value } : autor
            ),
        }));
    };

    const removerAutor = (indice) => {
        setlivro((prevObjeto) => ({
            ...prevObjeto,
            autores: prevObjeto.autores.filter((_, i) => i !== indice),
        }));
    };

    const adicionarAutor = (nome) => {
        setlivro((prevObjeto) => ({
            ...prevObjeto,
            autores: [...prevObjeto.autores, { nome }],
        }));
    };


    const fetchAlteralivro = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(livro)
            });

            if (!response.ok) {
                toast.error(`Erro ao criar livro`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                throw new Error('Erro ao criar livro');
            }

            const data = await response.json();
            console.log(data)
            console.log('data')
            toast.success(`livro alterada com sucesso`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
            router.push('/gestao/livros');
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
                        <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Criando {livro.nome}</h2>
                        <div className='flex flex-col mb-4'>

                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    titulo da livro
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.titulo}
                                    name='titulo'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Edição
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.edicao}
                                    name='edicao'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Resumo
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.resumo}
                                    name='resumo'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Ano da publicação
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.ano_publicacao}
                                    name='ano_publicacao'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Nome da Editora
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.editora.nome}
                                    name='editora'
                                    onChange={handleInputChangeEditora}
                                ></input>
                            </label>
                            <div className='flex flex-col'>
                                <p className='ml-2'>
                                    Autores
                                </p>
                                {livro.autores.map((autor, i) => {
                                    return (
                                        <div className='flex flex-row items-center mb-2'>
                                            <input
                                                className='ml-4 px-2 py-1 border shadow-inner rounded-full'
                                                value={autor.nome}
                                                name='autor'
                                                onChange={(e) => handleInputChangeAutor(e, i)}
                                            ></input>
                                            <div onClick={() => removerAutor(i)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cc2222" className="size-6 cursor-pointer">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div onClick={() => adicionarAutor('')} className='ml-4 mb-2 flex px-3 py-1 w-fit rounded-full bg-[#669966] text-white cursor-pointer'>
                                    Novo autor
                                </div>
                            </div>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Nome da Area (Gênero literário)
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.area.descricao}
                                    name='area'
                                    onChange={handleInputChangeArea}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Código do livro
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.codigo}
                                    name='codigo'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Quantidade
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.quantidade}
                                    name='quantidade'
                                    onChange={handleQuantChange}
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Quantidade de cópias disponíveis
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.quantidade}
                                    name='quantidadeDisponivel'
                                    // onChange={handleInputChange}
                                    disabled
                                ></input>
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Imagem (URL)
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={livro.img}
                                    name='img'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                        </div>
                        <div className='flex justify-around items-center'>
                            <a href='./'>
                                <div className='px-4 py-2 rounded bg-[#cc2222] text-white cursor-pointer'>Cancelar</div>
                            </a>
                            <div onClick={() => fetchAlteralivro()} className='px-4 py-2 rounded bg-[#669966] text-white cursor-pointer'>Salvar</div>
                        </div>
                        <ToastContainer />
                    </div>
                }
            </section>
        </main>
    )
}