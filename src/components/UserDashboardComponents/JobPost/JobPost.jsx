import React, { useContext, useState } from "react";
import { Layout, Card, Form, Input, Select, Button, message } from "antd";
import { UserContext } from "../../../context/Admin_page/userFunction/userState";

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const JobPost = () => {
  const { userData } = useContext(UserContext);

  const [form] = Form.useForm();
  const [isPosting, setIsPosting] = useState(false);

  const onFinish = (values) => {
    setIsPosting(true);

    // Simulate a post request, replace with your actual API call
    setTimeout(() => {
      setIsPosting(false);
      form.resetFields();
      message.success("Job posted successfully!");
    }, 2000);
  };

  return (
    <Content style={{ padding: "24px 50px" }}>
      <Card title="Post a Job" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Form
          form={form}
          name="job_post_form"
          onFinish={onFinish}
          initialValues={{ serviceType: "contract review" }}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter a job title" }]}
          >
            <Input placeholder="Job Title" />
          </Form.Item>
          <Form.Item
            name="serviceType"
            rules={[{ required: true, message: "Please select a service type" }]}
          >
            <Select placeholder="Select Service Type">
              <Option value="contract review">Contract Review</Option>
              <Option value="litigation">Litigation</Option>
              <Option value="legal consultation">Legal Consultation</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="budget"
            rules={[{ required: true, message: "Please enter a budget" }]}
          >
            <Input placeholder="Budget" type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter a job description" }]}
          >
            <TextArea placeholder="Job Description" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPosting}
              style={{ width: "100%" }}
            >
              Post Job
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Content>
  );
};

export default JobPost;
