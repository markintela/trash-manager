import React from 'react';

const Footer = () => {
  // Traduzindo classes genéricas (nbm, nbx, etc.) para classes Tailwind claras 
  // que garantam que o rodapé fique fixo no final e seja bem estilizado.
  return (
    <footer className="w-full bg-white/70 backdrop-blur-sm border-t border-gray-100 shadow-lg mt-16">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Trash Manager, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;