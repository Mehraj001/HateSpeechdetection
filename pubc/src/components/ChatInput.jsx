import React, { useState } from 'react';
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    if (emojiObject) {
      const updatedMessage = msg + emojiObject.emoji;
      setMsg(updatedMessage);
    }
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Container>
      {showEmojiPicker && (
        <PickerContainer>
          <Picker
            onEmojiClick={(event, emojiObject) => handleEmojiClick(event, emojiObject)}
            disableSearchBar
          />
        </PickerContainer>
      )}
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input type="text" placeholder='type your message here 1' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
  }
`;

const PickerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;
