import React, { useState, useEffect,useRef } from 'react';
import { IoMdSend, IoMdClose } from "react-icons/io";
import CustomerSupprt from '../assets/customer-servic.png';
import ChatBotImage from '../assets/chatbot-image.png';
import UserImage from '../assets/user.png';
import axios from 'axios';
import { cn } from '../../utils/cn';

export default function Chatbot({ isChatModelOpen, toggleChatModel }) {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://delivery-point.onrender.com/chats/sent-messages',
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


    return (
        <>
            {isChatModelOpen && (
                <div className='flex justify-end fixed top-20 left-0 right-0 bottom-0 z-50 bg-black/50'>
                    <div className="flex flex-col bg-gray-100 w-full max-w-md min-h-[250px] shadow-2xl">
                        <div className="bg-ink-900 text-white p-4 flex justify-between items-center">
                            <h1 className="text-lg font-semibold">DeliveryPoint Support</h1>
                            <button
                                onClick={toggleChatModel}
                                className="text-white hover:bg-white/10 rounded-lg w-8 h-8 flex justify-center items-center"
                            >
                                <IoMdClose className="h-5 w-5" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex-grow overflow-auto p-4 space-y-4 bg-gray-100">
                            <p className='flex justify-start bg-white space-x-2 rounded-2xl p-3 shadow-sm max-w-[10rem] text-sm text-gray-700'>Happy to help you</p>
                            {messages.map((message, index) => (
                                <div key={index} className={`flex items-end gap-1 ${message.fromUser ? 'justify-end' : 'justify-start'}`}>
                                    {!message.fromUser && (
                                        <img src={ChatBotImage} alt="ChatBot" className='bg-white rounded-full h-8 w-8' />
                                    )}
                                    <div
                                        ref={messagesEndRef}
                                        className={cn(
                                            'text-sm rounded-2xl p-3 shadow-sm max-w-xs',
                                            message.fromUser ? 'bg-primary-600 text-white' : 'bg-white text-gray-900'
                                        )}
                                    >
                                        <p>{message.text}</p>
                                    </div>
                                    {message.fromUser && (
                                        <img src={UserImage} alt="User" className='h-8 w-8 rounded-full' />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-ink-900 flex items-center gap-2">
                            <button>
                                <img src={CustomerSupprt} alt="CustomerSupprt" className='h-8 w-8 rounded-full' />
                            </button>
                            <input type="text" placeholder="Type your message here" className="flex-grow rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-400"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="p-2.5 bg-primary-600 rounded-full text-white hover:bg-primary-700" onClick={sendMessage}>
                                <IoMdSend />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
