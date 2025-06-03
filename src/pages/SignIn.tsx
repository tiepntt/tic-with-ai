import React, { useState } from 'react';
import { Button, Form, Input, Typography, Divider, message, Card } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const SignIn: React.FC = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        message.error('Failed to sign in: ' + error.message);
        return;
      }
      
      message.success('Signed in successfully!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      message.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const { error } = await signInWithGoogle();
      
      if (error) {
        message.error('Failed to sign in with Google: ' + error.message);
      }
    } catch (err) {
      console.error(err);
      message.error('An unexpected error occurred');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Title level={2} className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </Title>
          <Text className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please sign in to access your account.
          </Text>
        </div>
        
        <Form
          name="signin"
          initialValues={{ remember: true }}
          onFinish={handleSignIn}
          layout="vertical"
          size="large"
          className="mt-8 space-y-6"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="Email"
              autoComplete="email"
              className="rounded-md"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />} 
              placeholder="Password"
              autoComplete="current-password"
              className="rounded-md"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
        
        <Divider plain>Or continue with</Divider>
        
        <Button 
          icon={<GoogleOutlined />} 
          onClick={handleGoogleSignIn} 
          loading={googleLoading}
          className="w-full h-12 flex items-center justify-center"
        >
          Google
        </Button>
        
        <div className="text-center mt-4">
          <Text className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;