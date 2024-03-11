import React from 'react';
import { Tabs } from 'antd';
const onChange = (key) => {
};
const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: <div>
        <h3>Salom tab</h3>
    </div>
  },
];
const Tab = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default Tab;