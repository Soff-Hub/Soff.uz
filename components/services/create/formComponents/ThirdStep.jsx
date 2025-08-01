import { Input, Table, InputNumber, Switch, Form } from 'antd';
import React, { useState } from 'react';

const packageTypes = ['standard', 'gold', 'premium'];
const rows = [
  { key: 'title', label: 'Paket xulosasi', inputType: 'text' },
  { key: 'price', label: 'Narxi (soʻm)', inputType: 'number' },
  { key: 'delivery', label: 'Yetkazish (kun)', inputType: 'number' },
  { key: 'revisions', label: 'Tahrirlar soni', inputType: 'number' },
];

const ThirdStep = () => {
  const [isThreePackage, setIsThreePackage] = useState(true);

  const columns = [
    {
      title: '',
      dataIndex: 'label',
      key: 'label',
      render: (text) => <strong>{text}</strong>,
    },
    ...packageTypes.map((type) => ({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      dataIndex: type,
      key: type,
      render: (_, record) => {
        const name = ['packages', type, record.key];

        const disabled = !isThreePackage && type !== 'standard';

        if (record.inputType === 'number') {
          return (
            <Form.Item name={name} noStyle>
              <Input type='number' min={0} style={{ width: '100%' }}  disabled={disabled} />
            </Form.Item>
          );
        }

        return (
          <Form.Item name={name} noStyle>
            <Input placeholder="..." disabled={disabled} />
          </Form.Item>
        );
      },
    })),
  ];

  const data = rows.map((row) => ({
    key: row.key,
    label: row.label,
    inputType: row.inputType,
  }));

  return (
    <div className="service_card row">
      <div className="col-12 col-md-8">
        <div className="service_title mb-3">
          <h2>3</h2>
          <h3>Narxlar va xizmatlar</h3>
        </div>

        <div className="d-flex justify-content-end mb-3">
          <div className="d-flex align-items-center gap-3">
            <p style={{ fontWeight: '500', marginBottom: 0, color: !isThreePackage && 'black' }}>
              Bitta paket
            </p>
            <Switch checked={isThreePackage} onChange={() => setIsThreePackage((prev) => !prev)} />
            <p style={{ fontWeight: '500', marginBottom: 0, color: isThreePackage && 'black' }}>
              Uchta paket
            </p>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          rowKey="key"
        />
      </div>
    </div>
  );
};

export default ThirdStep;
