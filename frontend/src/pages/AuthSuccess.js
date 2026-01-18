import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { Loader2 } from 'lucide-react';

const AuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { logout } = useAuth(); // In case we need to clear state first, but mostly we want to set it.

    // Actually, we can't easily access setUser from here without exposing it in context. 
    // But we can manually set token and then rely on a reload or proper flow.
    // Best approach: Store token, then navigate.

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            // Store token
            authService.setToken(token);

            // We force a full reload to dashboard to ensure AuthContext re-initializes 
            // and fetches the user data properly with the new token.
            // This avoids needing to expose internal set methods or complex state handling.
            window.location.href = '/dashboard';
        } else {
            // No token found, redirect to login
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a2a]">
            <div className="text-center">
                <Loader2 className="h-12 w-12 text-cyan-500 animate-spin mx-auto mb-4" />
                <h2 className="text-xl text-white font-medium">Completing login...</h2>
            </div>
        </div>
    );
};

export default AuthSuccess;
