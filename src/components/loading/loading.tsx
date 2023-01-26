import { LoadingOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';

const { Title } = Typography;

export default function LoadingComponent(): JSX.Element {
  return (
    <div style={{ textAlign: 'center' }}>
      <Space>
        <LoadingOutlined rotate={180} style={{ fontSize: '24px', color: 'black' }} />
        <Title level={3} style={{ padding: '12px 0 0' }}>Loading...</Title>
      </Space>
    </div>
  );
}
