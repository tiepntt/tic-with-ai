import React from 'react';
import { Button, Typography, Card, Avatar, Divider } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar 
                  size={64} 
                  icon={<UserOutlined />} 
                  src={user?.user_metadata?.avatar_url} 
                  className="bg-blue-500"
                />
                <div className="ml-4">
                  <Title level={3} className="m-0">Welcome to Your Dashboard</Title>
                  <Text className="text-gray-500">
                    {user?.email || 'User'}
                  </Text>
                </div>
              </div>
              <Button 
                type="primary" 
                danger 
                icon={<LogoutOutlined />} 
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <Title level={4} className="mb-4">Account Information</Title>
              <div className="space-y-2">
                <div>
                  <Text strong>Email:</Text> <Text>{user?.email}</Text>
                </div>
                <div>
                  <Text strong>ID:</Text> <Text>{user?.id?.substring(0, 8)}...</Text>
                </div>
                <div>
                  <Text strong>Last Sign In:</Text> <Text>{new Date(user?.last_sign_in_at || '').toLocaleString()}</Text>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <Title level={4} className="mb-4">Quick Actions</Title>
              <div className="space-y-4">
                <Button block>Edit Profile</Button>
                <Button block>Change Password</Button>
                <Button block>Notification Settings</Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-white shadow-md rounded-lg overflow-hidden mt-8 hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <Title level={4} className="mb-4">Recent Activity</Title>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <Text className="block text-gray-500 text-sm">Today</Text>
                <Text>You signed in to your account</Text>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <Text className="block text-gray-500 text-sm">Yesterday</Text>
                <Text>You updated your profile information</Text>
              </div>
              <div>
                <Text className="block text-gray-500 text-sm">Last Week</Text>
                <Text>You created your account</Text>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;