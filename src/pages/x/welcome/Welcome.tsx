import * as React from 'react';
import { Layout } from 'antd';
import './Welcome.less';
import { Location, History } from 'history';

interface IWelcomeProps {
    location: Location;
	history: History;
}

class Welcome extends React.Component<IWelcomeProps> {
  public render() {
    return (
      <Layout className="Welcome-page">
        欢迎您
      </Layout>
    );
  }
}

export default Welcome