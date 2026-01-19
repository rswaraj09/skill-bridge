import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { interviewService } from '../services/api';
import { Brain, Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const InterviewPrep = () => {
    const [domain, setDomain] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!domain.trim()) {
            toast.error('Please enter a domain');
            return;
        }

        setLoading(true);
        setError('');
        setQuestions([]);

        try {
            const response = await interviewService.generateQuestions(domain);

            if (response.data.success) {
                setQuestions(response.data.data);
                toast.success('Questions generated successfully!');
            }
        } catch (err) {
            console.error('Error generating questions:', err);
            setError(err.response?.data?.message || 'Failed to generate questions. Please try again.');
            toast.error('Failed to generate questions');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-pink-100 dark:bg-transparent transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
                    >
                        Interview Preparation
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 dark:text-gray-400 text-lg"
                    >
                        Master your next interview with AI-curated questions tailored to your domain.
                    </motion.p>
                </div>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="backdrop-blur-xl bg-white/70 dark:bg-white/5 rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-xl"
                >
                    <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="Enter your domain (e.g. React Developer, Data Scientist)..."
                                className="w-full bg-white/50 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Brain className="w-5 h-5" />
                                    Generate
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <p>{error}</p>
                    </motion.div>
                )}

                {/* Questions List */}
                {questions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Questions</h2>
                            <span className="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-500/20">
                                {questions.length} Questions
                            </span>
                        </div>

                        <div className="grid gap-4">
                            {questions.map((item, index) => (
                                <QuestionCard key={index} item={item} index={index} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const QuestionCard = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [evaluation, setEvaluation] = useState(null);
    const [evaluating, setEvaluating] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.stopPropagation(); // Prevent card toggle
        if (!userAnswer.trim()) return;

        setEvaluating(true);
        try {
            const response = await interviewService.evaluateAnswer({
                question: item.question,
                userAnswer,
                idealAnswer: item.answer
            });
            if (response.data.success) {
                setEvaluation(response.data.data);
                setSubmitted(true);
                setIsOpen(true); // Auto-open to show results
            }
        } catch (error) {
            toast.error('Failed to evaluate answer');
        } finally {
            setEvaluating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:bg-white/10 transition-all text-left"
        >
            <div className="flex items-start gap-4" onClick={() => !submitted && setIsOpen(!isOpen)}>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border mt-0.5 transition-colors
                    ${evaluation
                        ? (evaluation.score >= 70 ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20' : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20')
                        : 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20'
                    }`}
                >
                    {evaluation ? `${evaluation.score}%` : index + 1}
                </span>

                <div className="flex-1 space-y-3">
                    <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <p className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed group-hover:text-black dark:group-hover:text-white transition-colors font-medium">
                            {item.question}
                        </p>
                    </div>

                    {!submitted ? (
                        <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                            <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all min-h-[100px] mb-2"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={evaluating || !userAnswer.trim()}
                                    className="bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {evaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Answer'}
                                </button>
                                <button
                                    onClick={() => { setIsOpen(!isOpen) }}
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    {isOpen ? 'Hide Answer' : 'Show Answer'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-50 dark:bg-black/20 rounded-lg p-4 space-y-3 cursor-default border border-gray-100 dark:border-transparent"
                        >
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Your Score</span>
                                <span className={`font-bold ${evaluation.score >= 70 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                    {evaluation.score}/100
                                </span>
                            </div>

                            <div>
                                <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm block mb-1">Feedback:</span>
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{evaluation.feedback}</p>
                            </div>

                            <div className="pt-2 border-t border-gray-200 dark:border-white/5 mt-2">
                                <span className="text-gray-500 font-semibold text-sm block mb-1">Ideal Answer:</span>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">{item.answer}</p>
                            </div>
                        </motion.div>
                    )}

                    {!submitted && isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="pt-2 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-white/5 mt-2 text-base leading-relaxed"
                        >
                            <span className="text-gray-500 font-semibold block mb-1">Ideal Answer:</span>
                            {item.answer}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default InterviewPrep;
