import { useState } from 'react';
import { useSyncProviders } from './hooks/useSyncProviders';

function App() {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [userAccount, setUserAccount] = useState('');
  const providers = useSyncProviders();

  const [errorMessage, setErrorMessage] = useState('');
  const clearError = () => setErrorMessage('');
  const setError = (error: string) => setErrorMessage(error);
  const isError = !!errorMessage;

  const formatAddress = (addr: string) => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
    return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`;
  };

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = (await providerWithInfo.provider.request({
        method: 'eth_requestAccounts',
      })) as string[];

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
    } catch (error) {
      console.error(error);
      const mmError: MMError = error as MMError;
      setError(`Code: ${mmError.code} \nError Message: ${mmError.message}`);
    }
  };

  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      {userAccount ? (
        <div>
          <div>{selectedWallet?.info.name}</div>
          <div>({formatAddress(userAccount)})</div>
        </div>
      ) : (
        <div className="providers">
          {providers.length > 0 ? (
            providers?.map((provider: EIP6963ProviderDetail) => (
              <div>
                <h1 className="font-bold text-center text-blue-400 text-[24px]">
                  Twitter DAPP
                </h1>
                <button
                  className="rounded-xl bg-blue-400 px-4 py-2 text-white font-semibold hover:bg-blue-300"
                  onClick={() => handleConnect(provider)}
                >
                  Connect Wallet
                </button>
              </div>
            ))
          ) : (
            <div>No Announced Wallet Providers</div>
          )}
        </div>
      )}
      <div
        className="mmError"
        style={isError ? { backgroundColor: 'brown' } : {}}
      >
        {isError && (
          <div onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
