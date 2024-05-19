import React, { useState, useEffect,useRef } from 'react';
import { IoMdSend } from "react-icons/io";
import CustomerSupprt from '../assets/customer-servic.png';
import ChatBotImage from '../assets/chatbot-image.png';
import UserImage from '../assets/user.png';
import { AiOutlineMessage } from "react-icons/ai";
import axios from 'axios';

export default function Chatbot({ isChatModelOpen, toggleChatModel }) {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8080/chats/sent-messages',
                { message: userMessage },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            const newMessages = [...messages, { text: userMessage, fromUser: true }];
            setMessages([...newMessages, { text: response.data, fromUser: false }]);
            setUserMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (isChatModelOpen) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
    }, [isChatModelOpen]);


    const scrollToBottom = () => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      };
    
      useEffect(() => {
        scrollToBottom();
      }, []);
    
      useEffect(() => {
        scrollToBottom();
      });

    return (
        <>
            {isChatModelOpen && (
                <div className='flex justify-end fixed top-20 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 '>
                    <div className="flex flex-col bg-zinc-100 max-w-md min-h-[250px] ">
                        <div className="bg-[#35728a] text-white p-4 flex justify-between items-center">
                            <h1 className="text-lg">DeliveryPoint Support</h1>
                            <button
                                onClick={toggleChatModel}
                                className="text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                            >
                                <svg
                                    className="w-3 h-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex-grow overflow-auto p-4 space-y-4 bg-slate-300">
                            <p className='flex justify-start bg-white space-x-2 rounded-lg p-3 shadow max-w-40'>Happy to help you</p>
                            {messages.map((message, index) => (
                                <div key={index} className={`flex space-x-1 ${message.fromUser ? 'justify-end' : 'justify-start'} `}>
                                    <div className='flex items-end '>
                                        {!message.fromUser && (
                                           <img src={ChatBotImage} alt="ChatBot" className='bg-white rounded-full h-8 w-8' />
                                        )}
                                    </div>
                                    <div className={` text-sm bg-${message.fromUser ? 'blue-500' : 'white'} text-${message.fromUser ? 'white' : 'black'} rounded-lg p-3 shadow max-w-xs `} ref={messagesEndRef}>
                                        <p>{message.text}</p>
                                    </div>
                                    {!message.fromUser && <AiOutlineMessage />}
                                    <div className='flex items-end'>
                                         { message.fromUser && (
                                            <img src={UserImage} alt="User" className='h-8 w-8' />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-[#404756] flex items-center">
                            <button>
                                <img src={CustomerSupprt} alt="CustomerSupprt" className='h-8 w-8' />
                            </button>
                            <input type="text" placeholder="Type your message here" className="flex-grow mx-2 p-2 border rounded "
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="p-3 bg-orange-500 rounded-sm text-white hover:bg-orange-700" onClick={sendMessage}>
                                <IoMdSend />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
