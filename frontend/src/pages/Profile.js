import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12" data-testid="profile-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              Profile Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your account information
            </p>
          </div>

          <Card className="p-8" data-testid="profile-card">
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-stone-200">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">{user?.full_name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={user?.full_name || ''}
                  readOnly
                  className="mt-2 bg-stone-50"
                  data-testid="name-input"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  readOnly
                  className="mt-2 bg-stone-50"
                  data-testid="email-input"
                />
              </div>
              <div>
                <Label>Member Since</Label>
                <div className="mt-2 flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {user?.created_at ? format(new Date(user.created_at), 'MMMM dd, yyyy') : 'N/A'}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-200">
              <h3 className="font-heading font-semibold text-foreground mb-4">Account Actions</h3>
              <div className="flex space-x-3">
                <Button variant="outline" data-testid="change-password-button">Change Password</Button>
                <Button variant="outline" data-testid="delete-account-button" className="text-destructive hover:text-destructive">Delete Account</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}