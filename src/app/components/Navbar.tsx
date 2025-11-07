import React, { useState } from 'react';
import {
    Menu, X, ChevronDown, // Trash2 removido pois não é mais usado
    BarChart, Bell, ClipboardList, Clock
} from 'lucide-react';

// Links de navegação principais
const mainNavigation = [
    { name: "Historic", href: "#historic" },
    { name: "Dashboard", href: "#dashboard" },
];

// Itens do dropdown de Features (adaptados ao Trash Manager)
const features = [
    { name: "Analytics", description: "Visualize as tendências de lixo.", href: "#analytics", icon: BarChart },
    { name: "Pendences", description: "Gerencie a fila de coleta atual.", href: "#pendences", icon: ClipboardList },
    { name: "Room Mates", description: "Gerencie membros e escalas de limpeza.", href: "#room-mates", icon: Clock },
    { name: "Notifications", description: "Ative alertas para a sua vez.", href: "#notifications", icon: Bell },
];

// Ações no rodapé do dropdown
const callsToAction = [
    { name: "Watch Demo", href: "#demo" },
    { name: "Contact Support", href: "#support" },
];

const Navbar: React.FC = () => {
    // Estados para controlar a visibilidade dos menus
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
    const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

    // Componente de Logo (Agora com Imagem do Cliente)
    const Logo = () => (
        <a href="/" className="-m-2 p-2 flex items-center gap-2">
            {/* Imagem do Logo (assumindo que está na pasta public/images/) */}
            <img 
                src="/images/logo.jpg" 
                alt="Logo Trash Manager" 
                className="h-16 w-auto" // Tamanho ajustado para visibilidade
            />

        </a>
    );

    return (
        <header className="bg-white sticky top-0 z-50 shadow-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Logo />
                </div>

                {/* Botão do Menu Móvel */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Abrir menu principal</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Menu Desktop */}
                <div className="hidden lg:flex lg:gap-x-12">
                    
                    {/* Dropdown de Features */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                            onBlur={() => setTimeout(() => setIsProductMenuOpen(false), 100)} // Fecha com pequeno delay ao perder foco
                            className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-green-700 transition"
                            aria-expanded={isProductMenuOpen ? 'true' : 'false'}
                        >
                            Features
                            <ChevronDown className={`h-5 w-5 flex-none text-gray-400 transform transition-transform ${isProductMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>

                        {/* Painel do Dropdown Desktop */}
                        {isProductMenuOpen && (
                            <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-900/5 transition ease-out duration-200 origin-top-left" onMouseDown={(e) => e.preventDefault()}>
                                <div className="p-4">
                                    {features.map((item) => (
                                        <div key={item.name} className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-green-50 transition">
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-green-100">
                                                {/* Ícones do dropdown agora verdes no hover */}
                                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="flex-auto">
                                                <a href={item.href} onClick={() => setIsProductMenuOpen(false)} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0"></span>
                                                </a>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-100 bg-gray-50">
                                    {callsToAction.map((item) => (
                                        <a key={item.name} href={item.href} onClick={() => setIsProductMenuOpen(false)} className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 transition">
                                            {/* Ícone genérico */}
                                            <Bell className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" /> 
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Links Simples (Hover Verde) */}
                    {mainNavigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900 hover:text-green-700 transition">
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Botão de Login (Desktop - Hover Verde) */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#login" className="text-sm/6 font-semibold text-gray-900 hover:text-green-700 transition">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>

            {/* Menu Móvel (Overlay) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden">
                    <div className="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Logo />
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Fechar menu</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {/* Dropdown de Features Móvel */}
                                    <div className="-mx-3">
                                        <button 
                                            type="button" 
                                            onClick={() => setIsMobileProductMenuOpen(!isMobileProductMenuOpen)}
                                            className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            aria-expanded={isMobileProductMenuOpen ? 'true' : 'false'}
                                        >
                                            Features
                                            <ChevronDown className={`h-5 w-5 flex-none transform transition-transform ${isMobileProductMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                                        </button>
                                        
                                        {/* Conteúdo do Dropdown Móvel */}
                                        {isMobileProductMenuOpen && (
                                            <div className="mt-2 block space-y-2">
                                                {[...features, ...callsToAction].map((item) => (
                                                    <a 
                                                        key={item.name} 
                                                        href={item.href} 
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-green-50"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Links Móveis Simples */}
                                    {mainNavigation.map((item) => (
                                        <a 
                                            key={item.name} 
                                            href={item.href} 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-green-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a 
                                        href="#login" 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-green-50"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;