import React, { useState } from 'react';
import { Button, Form, Input, Typography, Divider, message, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignUp: React.FC = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (values: { email: string; password: string; confirmPassword: string }) => {
    try {
      setLoading(true);
      const { data, error } = await signUp(values.email, values.password);
      
      if (error) {
        message.error('Failed to sign up: ' + error.message);
        return;
      }
      
      if (data?.user) {
        message.success('Account created successfully! Please check your email to confirm your account.');
        navigate('/signin');
      } else {
        message.info('Something went wrong. Please try again.');
      }
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
            Create an account
          </Title>
          <Text className="mt-2 text-center text-sm text-gray-600">
            Join us today! Create your account to get started.
          </Text>
        </div>
        
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={handleSignUp}
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
              prefix={<MailOutlined className="text-gray-400" />} 
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
              autoComplete="new-password"
              className="rounded-md"
            />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />} 
              placeholder="Confirm Password"
              autoComplete="new-password"
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
              Sign up
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
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;