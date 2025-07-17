import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useGet } from '~/repositories/https';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const { TextArea } = Input;

const PortfolioForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [coverImageList, setCoverImageList] = useState([]);
  const [mediaFilesList, setMediaFilesList] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState();
  const { data: categories, isLoading } = useGet(
    'category',
    'http://176.96.241.219:8005/api/v1/categories/?parent_only=false'
  );
  const router = useRouter();
  const queryClient = useQueryClient()
  const sellerId = router.query.pid;

  useEffect(() => {
    const parent = categories?.find((cat) => cat.id === parentCategory);
    setChildCategories(parent?.children || []);
  }, [parentCategory, categories]);


  const { mutate: createPortfolio, isPending } = useMutation({
    mutationFn: async (payload) => await Axios.post('http://176.96.241.219:8005/api/v1/categories/portfolio-create', payload),
    onSuccess: () => {
      message.success("Portfolio muvaffaqiyatli qo'shildi!")
      form.resetFields()
      setCoverImageList([])
      setMediaFilesList([])
      setParentCategory(undefined)
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
      onClose()
    },
    onError: () => {
      message.error("Portfolio qo'shilmadi")
      onClose()
    }
  })


  const handleUploadChange = (info, setter) => {
    const newList = info.fileList.map((file) => {
      if (file.response?.url && !file.url) {
        file.url = file.response.url;
      }
      return file;
    });
    setter(newList);
  };

  const onFinish = async (values) => {
    const payload = {
      soff_seller_id: sellerId,
      service_id: values.service_id,
      sub_category_id: values.sub_category_id,
      category_id: values.category_id,
      title: values.title,
      description: values.description,
      cover_image: coverImageList.map((file) => file.response?.url || file.url),
      media_files: mediaFilesList.map((file) => file.response?.url || file.url),
    };

    createPortfolio(payload)
  };


  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="p-3"
    >
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            name="title"
            label="Sarlavha"
            rules={[{ required: true, message: 'Sarlavha shart' }]}
          >
            <Input placeholder="Portfolio nomi" />
          </Form.Item>

          <Form.Item
            name="cover_image"
            label="Muqova rasmlari"
            rules={[{ required: true, message: 'Kamida 1ta rasm yuklang' }]}

          >
            <Upload
              action="http://176.96.241.219:8005/api/v1/upload/"
              listType="picture-card"
              accept=".png,.jpg,.jpeg,.webp"
              fileList={coverImageList}
              style={{ minHeight: '100px' }}
              valuePropName="fileList"
              onChange={(info) => {
                const newList = info.fileList.map((file) => {
                  if (file.response?.url && !file.url) {
                    file.url = file.response.url;
                  }
                  return file;
                });
                setCoverImageList(newList);
              }}
              name="file"
              multiple
              className='mb-5'
            >
              {coverImageList.length >= 3 ? null : (
                <div style={{ marginTop: '40px' }}>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Yuklash</div>
                </div>
              )}
            </Upload>
          </Form.Item>


          <Form.Item name="media_files" label="Qo‘shimcha fayllar">
            <Upload
              action="http://176.96.241.219:8005/api/v1/upload/file"
              fileList={mediaFilesList}
              onChange={(info) => handleUploadChange(info, setMediaFilesList)}
              maxCount={1}
              name="file"
              listType="text"
              accept='.zip'
            >
              <Button icon={<UploadOutlined />}>
                Qo‘shimcha fayllarni yuklash
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="service_id" label="Xizmat ID">
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name="description" label="Tavsif" rules={[{ required: true, message: 'Tavsif majburiy' }]}>
            <TextArea rows={4} placeholder="Portfolio haqida qisqacha" />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Kategoriya"
            rules={[{ required: true, message: 'Kategoriya shart' }]}
          >
            <Select
              placeholder="Kategoriya tanlang"
              loading={isLoading}
              onChange={(val) => setParentCategory(val)}
            >
              {categories?.filter(c => !c.parent_id).map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {childCategories.length > 0 && (
            <Form.Item
              name="sub_category_id"
              label="Subkategoriya"
              rules={[{ required: true, message: 'Subkategoriya shart' }]}
            >
              <Select placeholder="Subkategoriya tanlang">
                {childCategories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Button loading={isPending} type="primary" htmlType="submit" block>
              Yuborish
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PortfolioForm;
