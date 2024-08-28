import { useState } from 'react';
import { ConnectionOptions } from './lib/components/ConnectionOptions';
import { ConnectionType } from './lib/connections';
import { useWeb3React } from '@web3-react/core';

const contractAddress = "0xD8b8ad0427b6e20F34994a58De5D2141585a5A8f";

function App() {
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(null)
  const {  account, isActive,  provider} = useWeb3React()

  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
        <div className="providers">
          <div>
            <h1 className="font-bold text-center text-blue-400 text-[24px]">
              Twitter DAPP
            </h1>
            <ConnectionOptions
              activeConnectionType={connectionType}
              isConnectionActive={isActive}
              onActivate={setConnectionType}
              onDeactivate={setConnectionType}
            />
          </div>

          {provider?.connection.url === 'metamask' && isActive &&(
            <>
              <h4>MetaMask: {account}</h4>
              <p>Contract address: {contractAddress}</p>
            </>
          )}
        </div>
    </main>
  );
}

export default App;
