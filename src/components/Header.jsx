"use client";
export default function Header() {
    return (
        <nav className="bg-purple-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href=".." className="text-white text-2xl font-semibold">Biblioteca Online</a>
                <ul className="flex space-x-6">
                    <li><a href="./" className="text-white hover:underline">Início</a></li>
                    <li><a href="#" className="text-white hover:underline">Catálogo</a></li>
                    <li><a href="/perfil" className="text-white hover:underline">Perfil</a></li>
                </ul>
            </div>
        </nav>
    )
}