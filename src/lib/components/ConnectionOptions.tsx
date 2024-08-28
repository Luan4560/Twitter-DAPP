
import { ConnectionType, getHasMetaMaskExtensionInsalled } from '../connections'
import { Option } from './Option'
import { METAMASK_URL } from '../contants'

type ConnectOptionsParams = {
  activeConnectionType: ConnectionType | null
  isConnectionActive: boolean
  onActivate: (connectionType: ConnectionType) => void
  onDeactivate: (connectionType: null) => void
}

export const ConnectionOptions = ({
  activeConnectionType,
  isConnectionActive,
  onActivate,
  onDeactivate,
}: ConnectOptionsParams) => {
  function getOptions(isActive: boolean) {
    const hasMetaMaskExtension = getHasMetaMaskExtensionInsalled()

    const isNoOptionActive = !isActive || (isActive && activeConnectionType === null)

    const metaMaskOption = hasMetaMaskExtension ? (
      <Option
        isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.INJECTED}
        isConnected={activeConnectionType === ConnectionType.INJECTED}
        connectionType={ConnectionType.INJECTED}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
      />
    ) : (
      <a href={METAMASK_URL}>
        <button>Install Metamask</button>
      </a>
    )

    return (
      <>
        {metaMaskOption}
      </>
    )
  }

  return <div className="connectors">{getOptions(isConnectionActive)}</div>
}