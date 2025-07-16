import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Row, Col } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useGet } from '~/repositories/https';

const { TextArea } = Input;

const PortfolioForm = () => {
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
  const sellerId = router.query.pid;

  useEffect(() => {
    const parent = categories?.find((cat) => cat.id === parentCategory);
    setChildCategories(parent?.children || []);
  }, [parentCategory, categories]);

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
    console.log(values)
    try {
      const payload = {
        soff_seller_id: sellerId,
        service_id: values.service_id,
        sub_category_id: values.sub_category_id,
        category_id: values.category_id,
        title: values.title,
        description: values.description,
        cover_image: values.cover_image.fileList.map((file) => file.response.url),
        media_files: values.media_files.fileList.map((file) => file.response.url),
      };

      await Axios.post(
        'http://176.96.241.219:8005/api/v1/categories/portfolio-create',
        payload
      );

      message.success('Portfolio muvaffaqiyatli qo‘shildi!');
      form.resetFields();
    } catch (err) {
      message.error('Xatolik: ' + (err.response?.data?.detail || 'Server xatosi'));
    }
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
            // rules={[{ required: true, message: 'Kamida 1ta rasm yuklang' }]}
          
          >
            <Upload
              action="http://176.96.241.219:8005/api/v1/upload/"
              listType="picture-card"
              accept=".png,.jpg,.jpeg,.webp"
              fileList={coverImageList}
              style={{minHeight: '100px'}}
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
                <div style={{marginTop: '40px'}}>
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
            <Button type="primary" htmlType="submit" block>
              Yuborish
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PortfolioForm;
