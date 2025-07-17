import React, { useEffect, useState } from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const { TextArea } = Input;

const PortfolioEditForm = ({ data, portId, onClose }) => {
  const [form] = Form.useForm();
  const [coverImageList, setCoverImageList] = useState([]);
  const [mediaFilesList, setMediaFilesList] = useState([]);

  const portfolio = data?.find(item => item.id === portId);
  const queryClient = useQueryClient()

  useEffect(() => {
    if (portfolio) {
      form.setFieldsValue({
        title: portfolio.title,
        description: portfolio.description,
      });

      const covers = portfolio.cover_image?.map((url, index) => ({
        uid: `cover-${index}`,
        name: `cover-${index}`,
        status: 'done',
        url,
      })) || [];

      const media = portfolio.media_files?.map((url, index) => ({
        uid: `media-${index}`,
        name: `media-${index}`,
        status: 'done',
        url,
      })) || [];

      setCoverImageList(covers);
      setMediaFilesList(media);
    }
  }, [portfolio]);

  const handleChange = (info, setter) => {
    const updatedList = info.fileList.map(file => {
      if (file.response?.url && !file.url) {
        file.url = file.response.url;
      }
      return file;
    });
    setter(updatedList);
  };


  const editPortfolioMutation = useMutation({
    mutationFn: async ({ id, upDatedDate }) => Axios.patch(`http://176.96.241.219:8005/api/v1/categories/portfolio-update/${id}`, upDatedDate),
    onSuccess: () => {
      message.success('Portfolio muvaffaqiyatli yangilandi!');
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
      onClose(false)
    },
    onError: () => {
      message.error("Portfolio yangilanmadi")
      onClose(false)
    }
  })

  const { mutate, isLoding } = editPortfolioMutation

  const handleSubmit = async (values) => {
    const upDatedDate = {
      title: values.title,
      description: values.description,
      cover_image: coverImageList.map(f => f.url),
      // media_files: mediaFilesList.map(f => f.url),
    };
    mutate({id :portId, upDatedDate})
  };


  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="title" label="Sarlavha" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Tavsif" rules={[{ required: true }]}>
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item style={{ marginBottom: '50px' }} label="Muqova rasmlari">
        <Upload
          action="http://176.96.241.219:8005/api/v1/upload/"
          listType="picture-card"
          accept=".jpg,.png,.webp"
          name="file"
          multiple
          fileList={coverImageList}
          onChange={(info) => handleChange(info, setCoverImageList)}
          style={{ minHeight: '100px' }}
        >
          {coverImageList.length >= 3 ? null : (
            <div style={{ marginTop: '40px' }}>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Yuklash</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      {/* <Form.Item label="Qo‘shimcha fayllar">
        <Upload
          action="http://176.96.241.219:8005/api/v1/upload/file"
          name="file"
          accept=".zip"
          multiple
          listType="text"
          fileList={mediaFilesList}
          onChange={(info) => handleChange(info, setMediaFilesList)}
        >
          <Button icon={<UploadOutlined />}>Qo‘shimcha fayllarni yuklash</Button>
        </Upload>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PortfolioEditForm;
