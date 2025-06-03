import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Typography } from 'antd';
import { supabase } from '../lib/supabase';

const { Text } = Typography;

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the URL hash (contains the access token after OAuth)
      const hash = window.location.hash;
      
      try {
        if (hash && hash.includes('access_token')) {
          // Handle the OAuth callback
          const { data, error } = await supabase.auth.getUser();
          
          if (error) {
            console.error('Error getting user:', error);
            navigate('/signin');
            return;
          }
          
          if (data?.user) {
            navigate('/');
            return;
          }
        }
        
        // If no hash or user found, redirect to sign-in
        navigate('/signin');
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Spin size="large" />
      <Text className="mt-4 text-gray-600">Processing your authentication...</Text>
    </div>
  );
};

export default AuthCallback;