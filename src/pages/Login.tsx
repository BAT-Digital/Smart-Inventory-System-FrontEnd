import { Form, Input, Button, Card, message } from "antd";
import Logo from "../assets/Logo.png";
import { login } from "../services/loginApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [form] = Form.useForm();
  const navigation = useNavigate();

  const onLogin = async () => {
    try {
      const values = await form.validateFields();

      const { username, id, role } = await login(
        values.username,
        values.password
      );

      Cookies.set("username", username, { expires: 1, path: "/" });
      Cookies.set("user_id", String(id), { expires: 1, path: "/" }); // expires in 7 days
      Cookies.set("role", role, { path: "/" });

      navigation("/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      message.error("Invalid Credentials!!");
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#335C67" }}
        className="min-h-screen relative"
      >
        {/* Logo at the top center */}
        <div className="w-full flex justify-center pt-10 absolute top-10">
          <img src={Logo} alt="Logo" className="h-24 w-auto" />
        </div>

        {/* Centered form */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-80 mt-32">
            {" "}
            {/* `mt-32` creates space for the logo */}
            <Card
              style={{ backgroundColor: "#F2F2F0" }}
              className="text-center"
              title="Login"
            >
              <Form form={form}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Please enter username" }]}
                >
                  <Input className="h-10" placeholder="Username*" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password className="h-10" placeholder="Password*" />
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    className="w-full"
                    style={{ backgroundColor: "#9E2A2B", color: "#FFFFFF" }}
                    onClick={onLogin}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
