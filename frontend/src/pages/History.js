import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { historyService } from '../services/api';
import { Clock, Upload, Search, Target, FileText, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await historyService.getAll();
            if (response.data.success) {
                setHistory(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'RESUME_UPLOAD': return <Upload className="w-5 h-5 text-blue-500" />;
            case 'ATS_ANALYSIS': return <Search className="w-5 h-5 text-purple-500" />;
            case 'JOB_MATCH': return <Target className="w-5 h-5 text-green-500" />;
            case 'RESUME_REWRITE': return <FileText className="w-5 h-5 text-orange-500" />;
            default: return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getActionLabel = (type) => {
        switch (type) {
            case 'RESUME_UPLOAD': return 'Uploaded Resume';
            case 'ATS_ANALYSIS': return 'Analyzed Resume';
            case 'JOB_MATCH': return 'Matched Job';
            case 'RESUME_REWRITE': return 'Rewrote Resume';
            default: return 'Action';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">History</h1>
                        <p className="text-muted-foreground">Track all your resume actions and analyses</p>
                    </div>

                    <Card className="p-6">
                        {loading ? (
                            <div className="text-center py-8 text-muted-foreground">Loading history...</div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No history found yet. Start by uploading a resume!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {history.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex gap-4 p-4 rounded-lg bg-card/50 border border-border hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="mt-1 bg-background p-2 rounded-full border shadow-sm h-fit">
                                            {getIcon(item.action_type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}
                                                    </p>
                                                </div>
                                                {item.details?.score !== undefined && (
                                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                                        Score: {item.details.score}
                                                    </div>
                                                )}
                                                {item.details?.match_percentage !== undefined && (
                                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                        Match: {item.details.match_percentage}%
                                                    </div>
                                                )}
                                                {item.details?.ats_score !== undefined && (
                                                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                                        New Score: {item.details.ats_score}
                                                    </div>
                                                )}
                                            </div>
                                            {item.details?.job_preview && (
                                                <p className="text-sm text-muted-foreground mt-2 italic border-l-2 pl-3 border-border">
                                                    "{item.details.job_preview}"
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
