"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import bgLogin from '../../../public/tela-login.jpg'

import { useRouter } from 'next/navigation';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function login() {

    const router = useRouter();

    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        status: "ATIVO",
        tipoUsuario: {
            descricao: "ALUNO",
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUsuario((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchCriarUsuario = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
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
            router.push('/login');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <main class="h-screen font-sans login bg-cover">

            <div class="container mx-auto h-full flex flex-col justify-center items-center z-10 relative">
                <div className="absolute w-full h-[100vh] z-0">
                    <Image src={bgLogin} alt="teste" className="z-0" />
                </div>
                <div class="w-full max-w-md z-0">
                    <div class="leading-loose">
                        <form class="max-w-sm m-4 p-8 bg-black bg-opacity-75 rounded-lg shadow-xl">
                            <p class="text-white font-bold text-center text-2xl mb-4">Crie sua conta</p>
                            <div class="mb-4">
                                <label class="block text-sm text-white" for="email">Nome</label>
                                <input class="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="text" name='nome' onChange={handleInputChange} id="nome" placeholder="Digite seu Nome" aria-label="Nome" required />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm text-white" for="email">E-mail</label>
                                <input class="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="email" name='email' onChange={handleInputChange} id="email" placeholder="Digite o e-mail" aria-label="email" required />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm text-white" for="password">Senha</label>
                                <input class="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="password" name='senha' onChange={handleInputChange} id="password" placeholder="Digite a sua senha" aria-label="password" required />
                            </div>
                            <div class="flex items-center justify-between mb-4">
                                <div class="px-4 py-2 text-white font-medium tracking-wider bg-gray-900 hover:bg-gray-800 rounded" onClick={() => fetchCriarUsuario()}>CriarConta</div>
                                <a class="text-sm text-white hover:text-red-400" href="#">Esqueceu a senha?</a>
                            </div>
                            <ToastContainer />
                            <div class="text-center">
                                <a href='/login' class="text-sm text-white hover:text-red-400">Voltar ao login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    )
}