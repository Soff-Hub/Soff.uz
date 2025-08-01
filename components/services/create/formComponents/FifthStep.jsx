import React, { useState } from 'react';
import { Button, Card, Input, Space } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const FifthStep = ({ faqs, setFaqs }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editData, setEditData] = useState({ question: '', answer: '' });

    const isAddingNew = editingIndex === faqs.length;

    const handleAddNew = () => {
        setEditingIndex(faqs.length); // yangi element indeksi
        setEditData({ question: '', answer: '' }); // yangi forma
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditData(faqs[index]);
    };

    const handleSave = (index) => {
        if (!editData.question.trim() || !editData.answer.trim()) return;

        const updatedFaqs = [...faqs];
        if (index === faqs.length) {
            // yangi qo‘shish
            updatedFaqs.push({ ...editData });
        } else {
            // mavjudini yangilash
            updatedFaqs[index] = { ...editData };
        }

        setFaqs(updatedFaqs);
        setEditingIndex(null);
        setEditData({ question: '', answer: '' });
    };

    const handleDelete = (index) => {
        const updatedFaqs = [...faqs];
        updatedFaqs.splice(index, 1);
        setFaqs(updatedFaqs);

        if (editingIndex === index) {
            setEditingIndex(null);
            setEditData({ question: '', answer: '' });
        }
    };

    return (
        <div className="service_card row">
            <div className="col-12 col-md-8">
                <div className="service_title">
                    <h2>5</h2>
                    <h3>Ko'p beriladigan savollar</h3>
                </div>

                <div className="service_content">
                    {faqs.map((faq, index) => (
                        <Card
                            key={index}
                            style={{ marginBottom: 12 }}
                            actions={
                                editingIndex === index
                                    ? [
                                        <SaveOutlined key="save" onClick={() => handleSave(index)} />,
                                        <DeleteOutlined key="delete" onClick={() => handleDelete(index)} />,
                                    ]
                                    : [
                                        <EditOutlined key="edit" onClick={() => handleEdit(index)} />,
                                        <DeleteOutlined key="delete" onClick={() => handleDelete(index)} />,
                                    ]
                            }
                        >
                            {editingIndex === index ? (
                                <Space direction="vertical" style={{ width: '100%' }}>
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

                    {isAddingNew && (
                        <Card
                            style={{ marginBottom: 12, padding: "10px" }}
                            actions={[
                                <SaveOutlined key="save" onClick={() => handleSave(faqs.length)} />,
                            ]}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
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
                        </Card>
                    )}

                    {!isAddingNew && (
                        <div style={{ textAlign: 'end', marginTop: 20 }}>
                            <Button
                                type="dashed"
                                icon={<PlusOutlined />}
                                onClick={handleAddNew}
                            >
                                Qo‘shish
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FifthStep;
