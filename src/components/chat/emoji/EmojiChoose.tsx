import React, { useState } from "react"
import IconButton from '@mui/material/IconButton'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import emojiData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { styled } from "@mui/material/styles";

const EmojiChooseWrapper = styled('div')({
  position: 'relative',
})

const EmojiPickerWrapper = styled('div')({
  position: 'absolute',
  bottom: '40px',
  right: 0
})

export const EmojiChoose = ({setSendMessageInputValue}: {setSendMessageInputValue: (value: string) => void}) => {
    const [isEmojisOpen, setIsEmojisOpen] = useState<boolean>(false)

    const onClickOutside = () => {
        setIsEmojisOpen(false)
    }

    const emojiRef = useOnClickOutside(onClickOutside)

    const onEmojiSelect = (data: any) => {
        setSendMessageInputValue(data.native)
    }

    const onEmojiIconClick = (d: any) => {
        setIsEmojisOpen(true)
    }

    return <EmojiChooseWrapper>
        <IconButton onClick={onEmojiIconClick}>
            <EmojiEmotionsIcon />
        </IconButton>
        {
           isEmojisOpen && 
            <EmojiPickerWrapper ref={emojiRef}>
                <Picker
                    data={emojiData} 
                    onEmojiSelect={onEmojiSelect}
                    previewPosition='none'
                />
            </EmojiPickerWrapper>
        }
    </EmojiChooseWrapper>
}