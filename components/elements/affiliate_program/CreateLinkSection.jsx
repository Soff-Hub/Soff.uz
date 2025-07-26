import React, { useState } from 'react'
import { Input, Button, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

const CreateLinkSection = () => {
    const [link, setLink] = useState()

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
        message.success('Havola nusxalandi!')
    }

    return (
        <div className='container py-5'>
            <div className='create_link_section'>
                <h2>Hamkorlik havolangizni yarating</h2>
                <div className='link_box'>
                    <Input onChange={(e) => setLink(e.target.value)} value={link} placeholder='https://soff.uz/' size="large" />
                    <Button
                        type="primary"
                        icon={<CopyOutlined />}
                        onClick={copyToClipboard}
                        size="large"
                    >
                        Nusxalash
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateLinkSection
