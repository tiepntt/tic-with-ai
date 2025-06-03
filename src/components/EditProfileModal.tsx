import { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        full_name: user.user_metadata.full_name || '',
        username: user.user_metadata.username || '',
        website: user.user_metadata.website || '',
        avatar_url: user.user_metadata.avatar_url || '',
      });
    }
  }, [open, user, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: values.full_name,
          username: values.username,
          website: values.website,
          avatar_url: values.avatar_url,
        }
      });

      if (error) throw error;

      message.success('Profile updated successfully!');
      onClose();
    } catch (error: any) {
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Profile"
      open={open}
      onCancel={onClose}
      footer={null}
      className="max-w-lg"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="full_name"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="John Doe"
          />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter a username' }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="johndoe"
          />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
        >
          <Input
            placeholder="https://example.com"
          />
        </Form.Item>

        <Form.Item
          name="avatar_url"
          label="Avatar URL"
        >
          <Input
            placeholder="https://example.com/avatar.jpg"
          />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;