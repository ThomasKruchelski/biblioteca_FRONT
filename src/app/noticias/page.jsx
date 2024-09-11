"use client";

export default function noticias() {
    return (
        <main class="bg-purple-50 text-gray-900">

            
            <nav class="bg-purple-700 p-4">
                <div class="container mx-auto flex justify-between items-center">
                    <a href="#" class="text-white text-2xl font-semibold">Biblioteca Online</a>
                    <ul class="flex space-x-6">
                        <li><a href="./index.html" class="text-white hover:underline">Início</a></li>
                        <li><a href="#" class="text-white hover:underline">Catálogo</a></li>
                        <li><a href="./user-profile.html" class="text-white hover:underline">Perfil</a></li>
                    </ul>
                </div>
            </nav>

            {/* <!-- Seção de Notícias --> */}
            <section class="container mx-auto mt-8 px-4">
                <h2 class="text-3xl font-semibold mb-6 text-purple-700">Notícias</h2>
                <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 class="text-2xl font-semibold text-purple-600">Lançamento do Novo Catálogo de Livros - Outubro 2024</h3>
                    <p class="text-gray-700 mt-2">Confira as novas adições ao nosso catálogo, com títulos que vão desde os clássicos até os mais recentes lançamentos.</p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 class="text-2xl font-semibold text-purple-600">Novo Horário de Funcionamento</h3>
                    <p class="text-gray-700 mt-2">Agora estamos abertos de segunda a sexta, das 8h às 18h, e aos sábados, das 9h às 14h.</p>
                </div>
            </section>

            {/* <!-- Horário de Funcionamento e Contato --> */}
            <section class="container mx-auto px-4 mb-12">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold mb-4 text-purple-700">Informações de Contato</h2>
                    <p><strong>Horário de Funcionamento:</strong> Segunda a Sexta, das 8h às 18h | Sábado, das 9h às 14h</p>
                    <p><strong>Número de Telefone:</strong> (11) 1234-5678</p>
                    <p><strong>Email para Contato:</strong> admin@biblioteca.com.br</p>
                </div>
            </section>

            {/* <!-- Seção de Promoções --> */}
            <section class="container mx-auto px-4 mb-12">
                <h2 class="text-3xl font-semibold mb-6 text-purple-700">Promoções</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-4 rounded-lg shadow-md border border-purple-200">
                        <h3 class="text-xl font-semibold mb-2 text-purple-600">50% de Desconto no Empréstimo de Clássicos</h3>
                        <p class="text-gray-600">Aproveite o desconto em clássicos da literatura durante o mês de outubro.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md border border-purple-200">
                        <h3 class="text-xl font-semibold mb-2 text-purple-600">Empréstimo Grátis para Novos Membros</h3>
                        <p class="text-gray-600">Os novos membros podem pegar seu primeiro livro de graça!</p>
                    </div>
                </div>
            </section>

            {/* <!-- Livros em Alta Demanda --> */}
            <section class="container mx-auto px-4 mb-12">
                <h2 class="text-3xl font-semibold mb-6 text-purple-700">Livros em Alta Demanda</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <a href="detalhes_livro.html" class="bg-white p-4 rounded-lg shadow-md border border-purple-200 hover:bg-purple-50 transition duration-200">
                        <h3 class="text-xl font-semibold text-purple-600">Duna</h3>
                        <p class="text-gray-600">Frank Herbert</p>
                    </a>
                    <a href="detalhes_livro.html" class="bg-white p-4 rounded-lg shadow-md border border-purple-200 hover:bg-purple-50 transition duration-200">
                        <h3 class="text-xl font-semibold text-purple-600">A Revolução dos Bichos</h3>
                        <p class="text-gray-600">George Orwell</p>
                    </a>
                    <a href="detalhes_livro.html" class="bg-white p-4 rounded-lg shadow-md border border-purple-200 hover:bg-purple-50 transition duration-200">
                        <h3 class="text-xl font-semibold text-purple-600">O Sol é Para Todos</h3>
                        <p class="text-gray-600">Harper Lee</p>
                    </a>
                </div>
            </section>

            {/* <!-- Autores em Alta Demanda --> */}
            <section class="container mx-auto px-4 mb-12">
                <h2 class="text-3xl font-semibold mb-6 text-purple-700">Autores em Alta Demanda</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <a href="detalhes_autor.html" class="bg-white p-4 rounded-lg shadow-md border border-purple-200 hover:bg-purple-50 transition duration-200">
                        <h3 class="text-xl font-semibold text-purple-600">George Orwell</h3>
                    </a>
                    <a href="detalhes_autor.html" class="bg-white p-4 rounded-lg shadow-md border border-purple-200 hover:bg-purple-50 transition duration-200">
                        <h3 class="text-xl font-semibold text-purple-600">Jane Austen</h3>
                    </a>
                    <a href="detalhes_autor.html" class="bg-white p-4 rounded-lg shadow-md border border-purple-200 hover:bg-purple-50 transition duration-200">
                        <h3 class="text-xl font-semibold text-purple-600">Isaac Asimov</h3>
                    </a>
                </div>
            </section>

        </main>
    )
}