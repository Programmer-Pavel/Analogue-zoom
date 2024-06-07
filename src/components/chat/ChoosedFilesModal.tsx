import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useSocketIo } from '../../hooks/useSocketIo'
import { VisuallyHiddenInput } from './Messages'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

interface ChoosedFilesModalShowProps {
  handleCloseChoosedFilesModal: () => void
  choosedFilesModalShow: boolean
  file?: any
  choosedUserId: number | null
}

export function ChoosedFilesModalShow({
  handleCloseChoosedFilesModal,
  choosedFilesModalShow,
  file,
  choosedUserId,
}: ChoosedFilesModalShowProps) {
  const [sendMessageInputValue, setSendMessageInputValue] = useState<string>('')
  const [files, setFiles] = useState<any[]>([file])

  const fileUploadRef = useRef<HTMLInputElement | null>(null)

  const { socketConnection } = useSocketIo()

  const onSendMessageInputChange = (e: any) => {
    setSendMessageInputValue(e.target.value)
  }

  const onSendMessageInput = () => {
    const changedFiles = files.map((file) => {
      return {
        fileName: file.name,
        file: file.file,
      }
    })

    socketConnection?.emit('userMessageSend', {
      message: sendMessageInputValue,
      toUserId: files?.[0].toUserId,
      files: changedFiles,
    })
    setSendMessageInputValue('')
    handleCloseChoosedFilesModal()
  }

  const onDeleteFile = (fileName: string) => {
    const filesWithoutCurrent = files?.filter((el => el.name !== fileName))
    setFiles(filesWithoutCurrent)
  }

  const uploadFile = (e: any) => {
    if (e.target.files.length) {
      const uploadedfile = e.target.files[0]
      const imageUrl = URL.createObjectURL(uploadedfile)
      const file = {
        src: imageUrl,
        name: uploadedfile.name,
        type: uploadedfile.type,
        file: uploadedfile,
        toUserId: choosedUserId,
      }
      const findedFile = files.find(el => el.name === file.name)
      if (!findedFile)
        setFiles([...files, file])
    }
  }

  return (
    <BootstrapDialog
      onClose={handleCloseChoosedFilesModal}
      aria-labelledby="customized-dialog-title"
      open={choosedFilesModalShow}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Send file

        <IconButton
          size="large"
          component="label"
          role={undefined}
          tabIndex={-1}
          sx={{ ml: '15px' }}
        >
          <AddRoundedIcon />
          <VisuallyHiddenInput
            ref={fileUploadRef}
            type="file"
            onChange={uploadFile}
          />
        </IconButton>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseChoosedFilesModal}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {
              files?.map(el => (
                <ListItem key={el.src}>
                  <ListItemAvatar>
                    <Avatar variant="rounded" src={el.src} />
                  </ListItemAvatar>
                  <ListItemText primary={el.name} secondary={el.type} />
                  <IconButton color="error" sx={{ ml: '15px' }} onClick={() => onDeleteFile(el.name)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            }
        </List>
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" gap="5px">
          <TextField
            size="small"
            autoComplete=""
            fullWidth
            variant="outlined"
            placeholder="write a message..."
            value={sendMessageInputValue}
            onChange={onSendMessageInputChange}
          />

          <Button
            size="small"
            variant="contained"
            disabled={!sendMessageInputValue && !files.length}
            endIcon={<SendIcon />}
            onClick={onSendMessageInput}
          />
        </Box>
      </DialogActions>
    </BootstrapDialog>
  )
}
