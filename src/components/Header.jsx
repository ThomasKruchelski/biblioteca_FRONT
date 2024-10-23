"use client";

import { isTokenValid } from "@/utils/verificaToken";
import { useEffect, useState } from "react";

export default function Header() {

    const [userInfo, setUserInfo] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (isTokenValid()) {
            // console.log(isTokenValid(true))
            // console.log('isTokenValid()')
            setUserInfo(isTokenValid(true))
            setLoaded(true)
        } else {
            setUserInfo({
                name: Convidado
            })
            clearExpiredToken()
        }
    }, [])

    return (
        loaded ?
            <nav className="bg-purple-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href=".." className="text-white text-2xl font-semibold">BEM VINDO </a>
                    <ul className="flex space-x-6 justify-center items-center">
                        <li><a href=".." className="text-white hover:underline">Início</a></li>
                        <li><a href="#" className="text-white hover:underline">Catálogo</a></li>
                        {userInfo.authorities.some((authority) =>  authority == "ROLE_ADMIN" ) &&
                            <li>
                                <a href="/gestao" className="text-white hover:underline text-800">Menu Gestão</a>
                            </li>
                        }
                        <li className="flex items-center">
                            <a href={'../perfil/' + userInfo.sub} className="text-white hover:underline pr-2">{userInfo.name}</a>
                            <img src="https://via.placeholder.com/40" alt="User avatar" className="rounded-full" />
                        </li>

                    </ul>
                </div>
            </nav>
            :
            <nav className="bg-purple-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href=".." className="text-white text-2xl font-semibold">Biblioteca Online</a>
                    <ul className="flex space-x-6">
                        <li><a href=".." className="text-white hover:underline">Início</a></li>
                        <li><a href="#" className="text-white hover:underline">Catálogo</a></li>
                        <li><a href="/perfil" className="text-white hover:underline">Perfil</a></li>
                    </ul>
                </div>
            </nav>
    )
}