import React, { useState } from 'react';
import { Button, Card, Input, Space } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const FifthStep = ({faqs, setFaqs}) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({ question: '', answer: '' });
    console.log('FifthStep faqs:', faqs);
    const handleAdd = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
        setEditingIndex(faqs.length);
        setEditData({ question: '', answer: '' });
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditData(faqs[index]);
    };

    const handleSave = (index) => {
        if (!editData.question.trim() || !editData.answer.trim()) {
            return; // Agar bo‘sh bo‘lsa, saqlamaydi
        }
        const updated = [...faqs];
        updated[index] = { ...editData };
        setFaqs(updated);
        setEditingIndex(null);
    };

    const handleDelete = (index) => {
        const updated = [...faqs];
        updated.splice(index, 1);
        setFaqs(updated);
        if (editingIndex === index) setEditingIndex(null);
    };

    return (
        <div className='service_card row'>
            <div className='col-12 col-md-8'>
                <div className='service_title'>
                    <h2>5</h2>
                    <h3>Ko'p beriladigan savollar</h3>
                </div>

                <div className='service_content'>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        style={{ marginBottom: 16 }}
                    >
                        FAQ qo‘shish
                    </Button>

                    {faqs.map((faq, index) => (
                        <Card
                            key={index}
                            style={{ marginBottom: 12 }}
                            actions={
                                editingIndex === index
                                    ? [
                                        <SaveOutlined key="save" onClick={() => handleSave(index)} />,
                                        <DeleteOutlined key="delete" onClick={() => handleDelete(index)} />
                                    ]
                                    : [
                                        <EditOutlined key="edit" onClick={() => handleEdit(index)} />,
                                        <DeleteOutlined key="delete" onClick={() => handleDelete(index)} />
                                    ]
                            }
                        >
                            {editingIndex === index ? (
                                <Space direction="vertical" style={{ width: '100%', padding: '10px' }}>
                                    <label><strong>Savol</strong></label>
                                    <Input
                                        placeholder="Savolni kiriting"
                                        value={editData.question}
                                        onChange={(e) =>
                                            setEditData({ ...editData, question: e.target.value })
                                        }
                                    />
                                    <label><strong>Javob</strong></label>
                                    <TextArea
                                        rows={3}
                                        placeholder="Javobni kiriting"
                                        value={editData.answer}
                                        onChange={(e) =>
                                            setEditData({ ...editData, answer: e.target.value })
                                        }
                                    />
                                </Space>
                            ) : (
                                <div style={{ padding: '10px' }}>
                                    <p><strong>Savol:</strong> {faq.question}</p>
                                    <p><strong>Javob:</strong> {faq.answer}</p>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FifthStep;
