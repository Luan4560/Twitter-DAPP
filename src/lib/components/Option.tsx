   import {ConnectionType, getConnection, tryActivateConnector, tryDeactivateConnector} from "../connections"

   export const Option = ({
    isEnabled,
    isConnected,
    connectionType,
    onActivate,
    onDeactivate,
   }: {
    isEnabled: boolean
    isConnected: boolean
    connectionType: ConnectionType
    onActivate: (connectionType: ConnectionType) => void
    onDeactivate: (connectionType: null) => void
   }) => {
    const onClick = async () => {
      if(isConnected) {
        const desactivation = await tryDeactivateConnector(getConnection(connectionType).connector)

        if(desactivation === undefined) {
         return
        }
        onDeactivate(desactivation)
        return
      }

      const activation = await tryActivateConnector(getConnection(connectionType).connector)

      if(!activation) {
        return
      }
      onActivate(activation)
      return
    }
    return (
      <div className="w-full">
        <button className="w-full bg-blue-400 p-2 text-white font-bold rounded-full" onClick={onClick} disabled={!isEnabled}>
          {`${isConnected ? 'Disconnect': 'Connect'} `}
        </button>
      </div>
    )
   }