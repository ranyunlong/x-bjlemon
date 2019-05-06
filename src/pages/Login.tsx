import React, { Component, FormEvent } from 'react';
import { Button, Layout, Card, Form, Input } from 'antd';
import './Login.less';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { UserState } from '../store/reducers/user';
import { AccoundLoginParams } from '../api/login';
import { LoginAction } from '../store/reducers/user/action';
import { Location, History } from 'history';

interface ILoginProps {
    form: WrappedFormUtils;
    login: (params: AccoundLoginParams) => void;
    user: UserState;
    location: Location;
    history: History;
}

interface ILoginState {
    loading: boolean;
}

class Login extends Component<ILoginProps, Readonly<ILoginState>> {
    readonly state: ILoginState = {
        loading: false
    }


    componentWillUpdate(nextProps: ILoginProps) {
        if (nextProps.user.lemon_sso_sessionid) {
            this.props.history.replace('/x/')
        }
    }

    componentWillMount() {
        if (this.props.user.lemon_sso_sessionid) {
            this.props.history.replace('/x/')
        }
    }
    public render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className="login-page">
                <Card
                    title="登录"
                    style={{
                        width: 350
                    }}
                >
                    <Form
                        onSubmit={this.handleLogin.bind(this)}
                    >
                        <Form.Item
                            label="账号"
                        >
                            {
                                getFieldDecorator('account', {
                                    rules: [
                                        { required: true, message: '账号必须' }
                                    ]
                                })(
                                    <Input
                                        placeholder="请输入账号"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="密码"
                        >
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码必须'
                                        }
                                    ]
                                })(
                                    <Input
                                        placeholder="请输入密码"
                                        type="password"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item>
                            <Button loading={!this.props.user.lemon_sso_sessionid && this.state.loading} htmlType="submit" block type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout>
        );
    }

    public handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        this.props.form.validateFields((valid, value) => {
            if (!valid) {
                this.setState({
                    loading: true
                })
                this.props.login(value)
            }
        })
    }
}

const LoginPage = Form.create({
    name: 'login-page'
})(Login)

export default connect(
    (state: { user: UserState }) => ({
        user: state.user
    }),
    (dispatch: any) => ({
        login(parmas: AccoundLoginParams) {
            dispatch(new LoginAction().getAciton(parmas))
        }
    })
)(
    LoginPage
)

