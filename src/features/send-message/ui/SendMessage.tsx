import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { EmojiChoose } from '@features/emoji-choose'
import { useSocketIo } from '@shared/hooks'

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

interface SendMessageProps {
  choosedUserId: number | null
  setChoosedFilesModalShow: (value: boolean) => void
  setFile: (value: any) => void
}

export function SendMessage({ choosedUserId, setChoosedFilesModalShow, setFile }: SendMessageProps) {
  const [sendMessageInputValue, setSendMessageInputValue] = useState<string>('')

  const fileUploadRef = useRef<HTMLInputElement | null>(null)

  const { socketConnection } = useSocketIo()

  const onSendMessageInputChange = (e: any) => {
    setSendMessageInputValue(e.target.value)
  }

  const onSendMessageInput = () => {
    if (sendMessageInputValue) {
      socketConnection?.emit('userMessageSend', {
        message: sendMessageInputValue,
        toUserId: choosedUserId,
      })
    }
    setSendMessageInputValue('')

    if (fileUploadRef.current)
      fileUploadRef.current.value = ''
  }

  const uploadFile = (e: any) => {
    if (e.target.files.length) {
      setChoosedFilesModalShow(true)
      const uploadedfile = e.target.files[0]
      const imageUrl = URL.createObjectURL(uploadedfile)
      const file = {
        src: imageUrl,
        name: uploadedfile.name,
        type: uploadedfile.type,
        file: uploadedfile,
        toUserId: choosedUserId,
      }
      setFile(file)
    }
  }

  return (
    <Box display="flex" gap="5px" mt="10px">
      <TextField
        autoComplete=""
        fullWidth
        variant="outlined"
        placeholder="write a message..."
        value={sendMessageInputValue}
        onChange={onSendMessageInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                component="label"
                role={undefined}
                tabIndex={-1}
              >
                <AttachFileIcon />
                <VisuallyHiddenInput
                  ref={fileUploadRef}
                  type="file"
                  onChange={uploadFile}
                />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <EmojiChoose setSendMessageInputValue={setSendMessageInputValue} />
            </InputAdornment>
          ),
        }}
      />

      <Button
        sx={{ width: '150px' }}
        variant="contained"
        endIcon={<SendIcon />}
        onClick={onSendMessageInput}
      >
        Send
      </Button>
    </Box>
  )
}
