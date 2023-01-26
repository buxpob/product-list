import { useAppSelector } from '../../hooks';
import LoadingComponent from '../loading/loading';
import { Typography, Table, InputRef, Button, Input, Space } from 'antd';
import { Product, DataIndex, CurrentProduct } from '../../types/types';
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, TableRowSelection } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { store } from '../../store';
import { setTotalQuantity, setSelectedProductList } from '../../store/actions';
import ModalComponent from '../modal/modal';
import './table-info.css';

const { Title, Text } = Typography;

export default function TableInfoComponent(): JSX.Element {
  const { isDataLoaded, products, totalQuantity } = useAppSelector((state) => state);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);
  const [ searchText, setSearchText ] = useState('');
  const [ searchedColumn, setSearchedColumn ] = useState('');
  const searchInput = useRef<InputRef>(null);

  const data = products.map((item) => ({ ...item, key: `${item.document}${item.id}` }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const arrayCurrentProduct: CurrentProduct[] = [];
    let totalQuantityProduct = 0;

    if (newSelectedRowKeys.length > 0) {
      newSelectedRowKeys.forEach((product: React.Key) => {        
        const currentProduct = data.find((el) => el.key === product);
        if (currentProduct !== undefined) {
          arrayCurrentProduct.push({
            name: currentProduct.name,
            id: currentProduct.id,
            document: currentProduct.document,
          });
          totalQuantityProduct += currentProduct.quantity;
        }        
      });
    } 

    store.dispatch(setSelectedProductList(arrayCurrentProduct));
    store.dispatch(setTotalQuantity(totalQuantityProduct));
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Product> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Product> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Product> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
    },
    {
      title: 'Дата доставки',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      defaultSortOrder: 'ascend',
      sorter: (a: Product, b: Product) => Date.parse(a.deliveryDate) - Date.parse(b.deliveryDate),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Валюта',
      dataIndex: 'currency',
      key: 'currency',
      sorter: (a: Product, b: Product) => a.currency.localeCompare(b.currency),    
    },
  ];

  return (
    <section className='table-info'>
      <Title level={2} className='table-info__title'>Продукты</Title>

      {isDataLoaded ? <LoadingComponent /> : ''}

          <Table
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            bordered
            footer={() =>
              <Space direction="vertical">

                <Text
                  className='table-info__total'
                >
                  Общее количество: {totalQuantity}
                </Text>

                <ModalComponent />

              </Space>
            }
          />      
    </section>
  );
}
