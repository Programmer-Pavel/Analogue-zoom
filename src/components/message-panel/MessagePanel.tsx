import { Box, Button, TextField } from '@mui/material'
import type { ChangeEvent, FormEvent } from 'react'
import React, { useState } from 'react'

export function MessagePanel({ onMessage, user }: any) {
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    onMessage(value)
    setValue('')
  }

  const displaySender = (message: any, index: number) => {
    return (
      index === 0
      || user?.messages[index - 1]?.fromSelf !== user?.messages[index]?.fromSelf
    )
  }

  return (
    <div>
      {
        user?.messages?.length
          ? (
            <Box component="ul" display="flex" flexDirection="column" gap="4px">
              {user?.messages?.map((message: any, index: number) => (
                <li key={index}>
                  {displaySender(message, index) && (
                    <div>{message?.fromSelf ? '(yourself)' : user?.username}</div>
                  )}
                  <Box bgcolor="gray" p="4px">
                    {message?.content}
                  </Box>
                </li>
              ))}
            </Box>
            )
          : null
      }

      <Box
        component="form"
        display="flex"
        alignItems="center"
        gap="20px"
        width="600px"
        mt="10px"
        onSubmit={onSubmit}
      >
        <TextField
          value={value}
          fullWidth
          placeholder="textarea"
          multiline
          rows={2}
          onChange={onChange}
        />

        <Button type="submit" variant="contained" style={{ width: '20%' }}>
          Send
        </Button>
      </Box>
    </div>
  )
}
