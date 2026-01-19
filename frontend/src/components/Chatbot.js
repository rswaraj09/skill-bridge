import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api'; // Correct use of named import

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm SkillBridge AI. How can I help with your career journey today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue("");

        // Add user message
        setMessages(prev => [...prev, { id: Date.now(), text: userMessage, sender: 'user' }]);
        setIsLoading(true);

        try {
            // const history = messages.map(m => ({ 
            //     role: m.sender === 'user' ? 'user' : 'assistant', 
            //     content: m.text 
            // }));

            // For now, let's just send the message. We can implement full history later if needed.
            // Or if the backend expects history, we can send it.
            // Backend expects: { message, history }

            const response = await api.post('/chat', {
                message: userMessage
                // history: history.slice(-10) // Optional: send last 10 messages for context
            });

            if (response.data.success) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: response.data.message,
                    sender: 'bot'
                }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'bot',
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
            {/* Chat Window */}
            {isOpen && (
                <div className={`mb-4 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden border transition-all duration-300 transform origin-bottom-right ${theme === 'dark'
                    ? 'bg-slate-900/95 border-slate-700 backdrop-blur-md text-white'
                    : 'bg-white/95 border-blue-100 backdrop-blur-md text-slate-800'
                    } animate-in fade-in slide-in-from-bottom-10 flex flex-col max-h-[500px]`}>

                    {/* Header */}
                    <div className={`p-4 flex justify-between items-center ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-r from-blue-100 to-purple-100'
                        }`}>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <h3 className="font-semibold text-sm">SkillBridge AI</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`p-1 rounded-full hover:bg-black/10 transition-colors pointer-events-auto`}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-rounded min-h-[300px]">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'self-end bg-blue-600 text-white rounded-br-none'
                                    : theme === 'dark'
                                        ? 'self-start bg-slate-800 rounded-bl-none text-slate-200'
                                        : 'self-start bg-white shadow-sm border border-slate-100 rounded-bl-none text-slate-700'
                                    } ${msg.isError ? 'bg-red-500/10 text-red-500 border border-red-500/20' : ''}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className={`self-start p-3 rounded-2xl rounded-bl-none text-sm flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white border border-slate-100'
                                }`}>
                                <Loader2 size={14} className="animate-spin text-blue-500" />
                                <span className="text-xs opacity-70">Thinking...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className={`p-3 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about resumes, jobs, or career tips..."
                                disabled={isLoading}
                                className={`flex-1 bg-transparent text-sm focus:outline-none px-2 py-1 ${theme === 'dark' ? 'text-white placeholder-slate-400' : 'text-slate-800 placeholder-slate-400'
                                    }`}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isLoading}
                                className={`p-2 rounded-full transition-all ${inputValue.trim() && !isLoading
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
                                    }`}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-900/50 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-blue-200 text-white'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:animate-bounce" />}
            </button>
        </div>
    );
};

export default Chatbot;
