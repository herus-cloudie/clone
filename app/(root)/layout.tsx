import { StreamClientProvider } from '@/providers/streamClientProvider';
import { ReactNode } from 'react';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default RootLayout;
