import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { SortOrder } from 'antd/es/table/interface';

interface DataType {
  key: string;
  userName: string;
  ammount: number;
  email: string;
  phone: number;
  status: string;
}

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const sharedOnCell = (_: DataType, index?: number) => {
  if (index === 1) {
    return { colSpan: 0 };
  }

  return {};
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'S.No',
    dataIndex: 'key',
    rowScope: 'row',
  },
  {
    title: 'User Name',
    dataIndex: 'userName',
    render: (text) => <a>{text}</a>,
    onCell: (_, index) => ({
      colSpan: index === 1 ? 5 : 1,
    }),
  },
  {
    title: 'Ammount',
    dataIndex: 'ammount',
    onCell: sharedOnCell,
  },
  {
    title: 'email',
    dataIndex: "email",
    colSpan: 1,
    onCell: sharedOnCell,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    onCell: sharedOnCell,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    onCell: sharedOnCell,
  },
  {
    sortIcon: ({ }: { sortOrder: SortOrder }) => <EditFilled />,
  }
];

const data: DataType[] = [
  {
    key: '1',
    userName: 'John Brown',
    ammount: 32,
    email: 'example@gmail.com',
    phone: 18889898989,
    status: 'pending',
  }
];

const App: React.FC = () => <Table<DataType> columns={columns} dataSource={data} bordered />;

export default App;