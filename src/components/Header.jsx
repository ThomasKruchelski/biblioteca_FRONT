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
            clearExpiredToken()
        }
    }, [])

    return (
        loaded ?
            <nav className="bg-purple-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href=".." className="text-white text-2xl font-semibold">BEM VINDO </a>
                    <ul className="flex space-x-6">
                        <li><a href=".." className="text-white hover:underline">Início</a></li>
                        <li><a href="#" className="text-white hover:underline">Catálogo</a></li>
                        <li><a href={'../perfil/' + userInfo.sub} className="text-white hover:underline">{userInfo.name}</a></li>
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