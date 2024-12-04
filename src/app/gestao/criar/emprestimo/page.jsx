"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isTokenValid, clearExpiredToken } from '@/utils/verificaToken'
import Header from '@/components/Header';
import Select from 'react-select'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function emprestimo({ params }) {

    const router = useRouter();

    const [emprestimo, setemprestimo] = useState({
        livro: {
            titulo: ""
        },
        usuario: {
            id: 0,
            tipo_usuario: {
                descricao: ""
            }
        }
    })

    const [usuarios, setUsuarios] = useState([])

    const [options, setOptions] = useState([])

    const [selectedOption, setSelectedOption] = useState(null)

    const [loaded, setLoaded] = useState(false)
    const [token, setToken] = useState({})

    // const queryParams = useParams();
    // const queryEmail = decodeURIComponent(queryParams.email)
    // console.log(queryEmail)

    useEffect(() => {
        if(selectedOption != null){
            setemprestimo((prevState) => ({
                ...prevState,
                usuario: selectedOption.value
            }));
        }
       
    }, [selectedOption])

    useEffect(() => {
        console.log(JSON.stringify(emprestimo))
    }, [emprestimo])

    useEffect(() => {
        console.log(JSON.stringify(options))
    }, [options])

    useEffect(() => {
        if (isTokenValid()) {
            // console.log(isTokenValid(false))
            // console.log('isTokenValid()')
            setToken(isTokenValid(false))
            // setLoaded(true)
        } else {
            clearExpiredToken()
            router.push('/login');
        }
    }, [])

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios`, {
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
                setUsuarios(data);
                setLoaded(true)
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchUsuario()
    }, [token])

    useEffect(() => {
        try {
            const opcoes = usuarios.map((usuario) => (
                {
                    label: usuario.nome,
                    value: {
                        id: usuario.id,
                        tipo_usuario: {
                            descricao: usuario.tipoUsuario.descricao
                        }
                    }
                }
            ))
            setOptions(opcoes)
        } catch (error) {
            console.error('erro nos usuários ' + error)
        }
    }, [usuarios])

    useEffect(() => {
        console.log(emprestimo)
        console.log('emprestimo')
    }, [emprestimo])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setemprestimo((prevState) => ({
            ...prevState,
            livro: { titulo: value }
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


    const fetchAlteraemprestimo = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/emprestimos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(emprestimo)
            });

            if (!response.ok) {
                toast.error(`Erro ao criar emprestimo`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                throw new Error('Erro ao criar emprestimo');
            }

            const data = await response.json();
            console.log(data)
            console.log('data')
            toast.success(`emprestimo alterada com sucesso`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
            router.push('/gestao/emprestimos');
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
                        <h2 className="text-3xl font-semibold mb-6 mt-6 text-purple-700 text-center">Criando {emprestimo.nome}</h2>
                        <div className='flex flex-col mb-4'>

                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Nome da emprestimo
                                </p>
                                <Select
                                    options={options}
                                    onChange={setSelectedOption}
                                    value={selectedOption}
                                />
                            </label>
                            <label className='flex flex-col'>
                                <p className='ml-2'>
                                    Endereço da emprestimo
                                </p>
                                <input
                                    className='mb-2 px-2 py-1 border shadow-inner rounded-full'
                                    value={emprestimo.livro.titulo}
                                    name='livro'
                                    onChange={handleInputChange}
                                ></input>
                            </label>
                        </div>
                        <div className='flex justify-around items-center'>
                            <a href='./'>
                                <div className='px-4 py-2 rounded bg-[#cc2222] text-white cursor-pointer'>Cancelar</div>
                            </a>
                            <div onClick={() => fetchAlteraemprestimo()} className='px-4 py-2 rounded bg-[#669966] text-white cursor-pointer'>Salvar</div>
                        </div>
                        <ToastContainer />
                    </div>
                }
            </section>
        </main>
    )
}