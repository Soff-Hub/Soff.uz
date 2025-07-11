import React, { useState } from 'react';

const initialData = {
    basePrice: 1500,
    quantity: 1,
    additionalServices: [
        {
            id: 'installBitrix',
            title: 'Bitrix o‘rnatish',
            options: [{ label: '1', price: 1000 }],
            selected: false,
            selectedOption: '1',
        },
        {
            id: 'installVirtualMachine',
            title: 'Bitrix virtual mashinasini o‘rnatish',
            options: [{ label: '1', price: 3500 }],
            selected: false,
            selectedOption: '1',
        },
        {
            id: 'installSSL',
            title: 'SSL-sertifikat o‘rnatish',
            options: [{ label: '1', price: 1000 }],
            selected: false,
            selectedOption: '1',
        },
        {
            id: 'backup',
            title: 'Zaxira nusxa (backup) yaratish',
            options: [{ label: '1', price: 100 }],
            selected: false,
            selectedOption: '1',
        },
    ],
};

export default function ServiceDetailOrder () {
    const [data, setData] = useState(initialData);

    const calculateTotal = () => {
        let total = data.basePrice * data.quantity;

        data.additionalServices.forEach(service => {
            if (service.selected) {
                const selectedOption = service.options.find(
                    o => o.label === service.selectedOption
                );
                if (selectedOption) {
                    total += selectedOption.price;
                }
            }
        });

        return total;
    };

    const handleQuantityChange = e => {
        setData(prev => ({
            ...prev,
            quantity: parseInt(e.target.value),
        }));
    };

    const handleCheckboxChange = id => {
        setData(prev => ({
            ...prev,
            additionalServices: prev.additionalServices.map(service =>
                service.id === id
                    ? { ...service, selected: !service.selected }
                    : service
            ),
        }));
    };

    const handleOptionChange = (id, value) => {
        setData(prev => ({
            ...prev,
            additionalServices: prev.additionalServices.map(service =>
                service.id === id
                    ? { ...service, selectedOption: value }
                    : service
            ),
        }));
    };

    return (
        <div style={{ maxWidth: 400, padding: 20 }}>
            <h2 className='SwipperTitle'>Buyurtma tafsilotlari</h2>
            <p>
                <strong>Narx:</strong> {data.basePrice} so'm
            </p>

            <div>
                <label>Miqdor: </label>
                <select
                    className='p-1 ms-2 rounded-2 '
                    value={data.quantity}
                    onChange={handleQuantityChange}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>

            <h3 className='SwipperTitle' style={{ marginTop: 20 }}>
                Buyurtmaga qo‘shish
            </h3>
            {data.additionalServices.map(service => (
                <div key={service.id} style={{ marginBottom: 10 }}>
                    <label>
                        <input
                            type='checkbox'
                            checked={service.selected}
                            onChange={() => handleCheckboxChange(service.id)}
                        />{' '}
                        {service.title}
                    </label>
                    {service.selected && (
                        <select
                            className='p-1 rounded-2 '
                            value={service.selectedOption}
                            onChange={e =>
                                handleOptionChange(service.id, e.target.value)
                            }
                            style={{ marginLeft: 10 }}>
                            {service.options.map(option => (
                                <option key={option.label} value={option.label}>
                                    {option.label} ({option.price} so'm)
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}

            <h3 className='SwipperTitle'>
                Umumiy narx: <span>{calculateTotal()} so'm</span>
            </h3>

            <button className='px-4 py-3 btn btn-success fs-3 rounded-2'>
                {calculateTotal()} so'm buyurtma berish
            </button>
        </div>
    );
}
