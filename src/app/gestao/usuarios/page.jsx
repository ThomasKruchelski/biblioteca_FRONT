"use client";

export default function gestaoUsuarios() {
    return (
        <main class="bg-purple-50 text-gray-900 flex flex-col min-h-[100vh]">

            <nav class="bg-purple-700 p-4">
                <div class="container mx-auto flex justify-between items-center">
                    <a href="#" class="text-white text-2xl font-semibold">Biblioteca Online</a>
                    <ul class="flex space-x-6">
                        <li><a href="./" class="text-white hover:underline">Início</a></li>
                        <li><a href="#" class="text-white hover:underline">Catálogo</a></li>
                        <li><a href="/perfil" class="text-white hover:underline">Perfil</a></li>
                    </ul>
                </div>
            </nav>

            {/* <!-- Seção de Notícias --> */}
            <section class="container bg-white mx-auto mt-8 px-4 flex flex-col flex-1 h-[100vh]">
                <h2 class="text-3xl font-semibold mb-6 mt-6 text-purple-700">Notícias</h2>
                <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 class="text-2xl font-semibold text-purple-600">Lançamento do Novo Catálogo de Livros - Outubro 2024</h3>
                    <p class="text-gray-700 mt-2">Confira as novas adições ao nosso catálogo, com títulos que vão desde os clássicos até os mais recentes lançamentos.</p>
                </div>

            </section>

            

        </main>
    )
}