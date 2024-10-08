"use client";
import Image from "next/image";
import { useState } from "react";
import bgLogin from '../../../public/tela-login.jpg'

export default function login() {
    return (
        <main class="h-screen font-sans login bg-cover">

            <div class="container mx-auto h-full flex flex-col justify-center items-center z-10 relative">
                <div className="absolute w-full h-[100vh] z-0">
                    <Image src={bgLogin} alt="teste" className="z-0" />
                </div>
                <div class="w-full max-w-md z-0">
                    <div class="leading-loose">
                        <form class="max-w-sm m-4 p-8 bg-black bg-opacity-75 rounded-lg shadow-xl">
                            <p class="text-white font-bold text-center text-2xl mb-4">LOGIN</p>
                            <div class="mb-4">
                                <label class="block text-sm text-white" for="email">E-mail</label>
                                <input class="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="email" id="email" placeholder="Digite o e-mail" aria-label="email" required />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm text-white" for="password">Senha</label>
                                <input class="w-full px-4 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="password" id="password" placeholder="Digite a sua senha" aria-label="password" required />
                            </div>
                            <div class="flex items-center justify-between mb-4">
                                <a class="px-4 py-2 text-white font-medium tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                    type="submit" href="/noticias">Entrar</a>
                                <a class="text-sm text-white hover:text-red-400" href="#">Esqueceu a senha?</a>
                            </div>
                            <div class="text-center">
                                <a class="text-sm text-white hover:text-red-400" href="">Criar uma conta</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    )
}