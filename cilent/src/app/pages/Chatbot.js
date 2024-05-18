import React, { useState, useEffect } from 'react'
import { IoMdSend } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import axios from 'axios';

export default function Chatbot() {

    const [userMessage, setUserMessage] = useState('');
    const [botMessage, setBotMessage] = useState('');

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:8080/chats/api-messages', { message: userMessage });
            setBotMessage(response.data.message);
            setUserMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <>
            <div className="flex flex-col h-screen bg-zinc-100">
                <div className="bg-zinc-800 text-white p-4 flex justify-between items-center">
                    <h1 className="text-lg">Jabra Support GeNie</h1>
                    <button className="text-white mr-2">✖</button>
                </div>
                <div className="flex-grow overflow-auto p-4 space-y-4">
                    {userMessage && (
                    <div className="flex items-end justify-end space-x-2">
                        <div className="bg-blue-500 text-white rounded-lg p-3 shadow max-w-xs mr-2">
                            <p>{userMessage}</p>
                        </div>
                        <AiOutlineMessage />
                    </div>
                    )}

                    {botMessage && (
                        <div className="flex items-start space-x-2">
                            <div className="bg-white rounded-lg p-3 shadow max-w-xs ml-2">
                                <p>{botMessage}</p>
                                <p className="text-xs text-zinc-500 text-right">6:37 pm</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-white flex items-center">
                    <button className="p-2">
                        <img src="https://placehold.co/20x20" alt="Emoji" />
                    </button>
                    <input type="text" placeholder="Type your message here" className="flex-grow mx-2 p-2 border rounded"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                    <button className="p-2" onClick={sendMessage}>
                        <IoMdSend />
                    </button>
                </div>
            </div>

        </>
    )
}
