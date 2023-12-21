import React from 'react'

export const ConnectionState = ({isConnected}: {isConnected: boolean}) => {
    return <p>State: { '' + isConnected }</p>
}