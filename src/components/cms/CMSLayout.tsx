import React, { ReactNode } from 'react';

interface CMSLayoutProps {
  children: ReactNode;
}

const CMSLayout: React.FC<CMSLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg leading-6 font-medium text-gray-900">CMS Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default CMSLayout;
