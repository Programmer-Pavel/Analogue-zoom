import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useAuth } from '../../../entities/session'
import { EmojiChoose } from '../../../features/emoji-choose'
import { SendChoosedFiles } from '../../../features/send-choosed-files'
import { useSocketIo } from '../../../shared/hooks/useSocketIo'
import { useGetMessages } from '../../../entities/messages'
import { SendMessage } from '../../../features/send-message'

export function Messages({
  choosedUserId,
}: {
  choosedUserId: number | null
}) {
  const [choosedFilesModalShow, setChoosedFilesModalShow] = useState<boolean>(false)
  const [file, setFile] = useState<any>()

  const { allMessages } = useGetMessages(choosedUserId)
  const { infoFromToken } = useAuth()

  const handleCloseChoosedFilesModal = () => {
    setChoosedFilesModalShow(false)
  }

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" gap="5px" overflow="auto" pr="10px">
        {allMessages.map((el: any) => {
          const isMe = infoFromToken.userId === el.userId
          return (
            <Box
              key={el.id}
              display="flex"
              justifyContent={isMe ? 'flex-end' : 'flex-start'}
            >
              <Box
                border="1px solid black"
                borderRadius={isMe ? '4% 4% 0% 4%' : '4% 4% 4% 0%'}
                p="10px"
                bgcolor={isMe ? '#ACE1AF' : '#B2FFFF'}
              >
                {isMe ? 'I' : `user ${el.userId}`}
                :
                <Box display="flex" gap="8px" mb="4px">
                  {
                    el.fileUrls?.map((el: any) => (
                      <Avatar key={el} sx={{ width: 200, height: 200 }} variant="rounded" src={el} />
                    ))
                  }
                </Box>
                <Typography variant="body1" gutterBottom ml="5px">
                  {el.message}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>

      <SendMessage
        choosedUserId={choosedUserId}
        setChoosedFilesModalShow={setChoosedFilesModalShow}
        setFile={setFile}
      />

      {choosedFilesModalShow && (
        <SendChoosedFiles
          handleCloseChoosedFilesModal={handleCloseChoosedFilesModal}
          choosedFilesModalShow={choosedFilesModalShow}
          file={file}
          choosedUserId={choosedUserId}
        />
      )}
    </Box>
  )
}
