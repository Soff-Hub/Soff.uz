import { Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import {
  AppstoreOutlined,
  FileTextOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  GlobalOutlined,
  CodeOutlined,
  LayoutOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

export default function SearchResultsProductsFilter({ total, parentData, childData }) {
  const router = useRouter();
  const { Option } = Select;

  const orders = [
    { label: 'Narx (arzon)', value: 'price' },
    { label: 'Narx (qimmat)', value: '-price' },
    { label: "Ko'p ko‘rilganlar bo‘yicha", value: 'views' },
    { label: 'Ko‘p xarid qilingan', value: 'purchased_count' },
  ];

  const allTypes = [
    { title: 'Barchasi', value: 'all', icon: <AppstoreOutlined /> },
    { title: 'Fayllar', value: 'file', icon: <FileTextOutlined /> },
    { title: '3D modellar', value: '3d', icon: <PictureOutlined /> },
    { title: 'Dizayn shablonlar', value: 'design', icon: <LayoutOutlined /> },
    { title: 'Turli shablonlar', value: 'template', icon: <CodeOutlined /> },
    { title: 'Veb saytlar', value: 'website', icon: <GlobalOutlined /> },
    { title: 'Videolar', value: 'video', icon: <VideoCameraOutlined /> },
  ];

  const handleChange = (newQuery) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        ...newQuery,
        page: 1,
      },
    }, undefined, { scroll: false });
  };

  const handleClearAll = () => {
    router.push({
      pathname: router.pathname,
      query: {
        page: 1,
        search: router.query.search || '',
        type: 'all',
      },
    }, undefined, { scroll: false });
  };

  return (
    <div className='Search_Results_Products_form_box container'>
      <div className="row align-items-center mb-3">
        <div className="col-12 col-md-3">
          <p className='countProduct text-nowrap m-0'>
            {total ? `${total} ta mahsulot` : ''}
          </p>
        </div>
      </div>

      <form className="Search_Results_Products_form">
        <div className="row g-3">

          {/* Dynamic col class hisoblash */}
          {(() => {
            const hasType = router.query.type && router.query.type !== 'all';
            const hasParent = !!router.query.parentCategory;
            const hasChild = !!router.query.category;

            // Nechta Select borligini aniqlaymiz
            const totalCount = 1 + (hasType ? 1 : 0) + (hasParent ? 1 : 0) + 1; // type + parent + child + order_by
            let colLg = '4'; // default

            if (totalCount <= 2) colLg = '6';
            else if (totalCount === 3) colLg = '4';
            else colLg = '3';

            const commonCol = `col-6 col-lg-${colLg}`;

            return (
              <>
                {/* type */}
                <div className={commonCol}>
                  <Select
                    // className="w-100"
                    style={{ width: '150px' }}
                    value={router.query.type || 'all'}
                    allowClear
                    onClear={handleClearAll}
                    onChange={(value) =>
                      handleChange({ type: value, parentCategory: '', category: '' })
                    }
                  >
                    {allTypes.map((item) => (
                      <Option key={item.value} value={item.value}>
                        <span className="d-flex align-items-center gap-2">
                          {item.icon} {item.title}
                        </span>
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Katta kategoriya */}
                {hasType && (
                  <div className={commonCol}>
                    <Select
                      style={{ width: '150px' }}
                      placeholder="Katta kategoriya"
                      value={router.query.parentCategory || undefined}
                      allowClear
                      onClear={() => handleChange({ parentCategory: '', category: '' })}
                      onChange={(value) => {
                        const selected = childData?.results?.find(cat => cat.slug === value);
                        handleChange({
                          parentCategory: selected?.slug || '',
                          category: selected?.id,
                        });
                      }}
                      options={childData?.results?.map(cat => ({
                        value: cat.slug,
                        label: cat.name,
                      }))}
                    />
                  </div>
                )}

                {/* Child kategoriya */}
                {hasParent && (
                  <div className={commonCol}>
                    <Select
                      style={{ width: '150px' }}
                      placeholder="Kategoriya"
                      allowClear
                      onClear={() => handleChange({ category: '' })}
                      onChange={(value) => handleChange({ category: value })}
                      options={parentData?.results?.map(cat => ({
                        value: String(cat.id),
                        label: cat.name,
                      }))}
                    />
                  </div>
                )}

                {/* Saralash + Tozalash */}
                <div className={commonCol}>
                  <div className="d-flex align-items-center gap-2">
                    <Select
                      style={{ width: '150px' }}
                      placeholder="Saralash"
                      value={router.query.order_by || undefined}
                      allowClear
                      onClear={() => handleChange({ order_by: '' })}
                      onChange={(value) => handleChange({ order_by: value })}
                      options={orders}
                    />
                    {(hasType || hasParent || hasChild || router.query.order_by) && (
                      <CloseCircleOutlined
                        style={{ fontSize: 20, cursor: 'pointer', color: 'gray' }}
                        title="Barchasini tozalash"
                        onClick={handleClearAll}
                      />
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </form>
    </div>
  );


}






{/* <div className='Search_Results_Products_form_inputBox'>
    <input type='text' placeholder='Izlash' />
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='13'
        viewBox='0 0 12 13'
        fill='none'>
        <path
            d='M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z'
            fill='#7B7B7B'
        />
    </svg>{' '}
</div> */}

{/* <select name='' id=''>
    <option value=''>Budjet</option>
</select>
<select name='' id=''>
    <option value=''>Reytingi yuqori</option>
</select> */}