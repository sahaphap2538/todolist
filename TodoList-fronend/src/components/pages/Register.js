import React from 'react';
import { Form, Input, Button, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};

export default function Register() {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        await axios.post('/user/register', {
                username: values.email,
                password: values.password,
                name: values.nickname
        })
        .then(res => {
            notification.success({
                message: `คุณ${values.nickname}ลงทะเบียนสำเร็จ`
            })
            navigate('/login')
        })
        .catch(err => {
            notification.error({
                message : 'คุณลงทะเบียนใหม่สำเร็จ กรุณาลองอีกครั้ง'
            })
        })
    };

    return (
        <Row justify="center" >
            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                <div
                    className="Form"
                >
                    <Row justify="center">
                        <Title level={2} className="Title">
                            Register
                        </Title>
                    </Row>
                    <Divider className="Divider" />
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            dependencies={['password']}
                            name="confirm"
                            label="Confirm Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'))
                                    }
                                })
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            label={<span>Nickname&nbsp;</span>}
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Button className="Button" type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}
