import { Form, Input, Button, Card } from "antd";
import Logo from "../assets/Logo.png";

export const Login = () => {
  return (
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
            <Form>
              <Form.Item>
                <Input className="h-10" placeholder="Username*" />
              </Form.Item>
              <Form.Item>
                <Input.Password className="h-10" placeholder="Password*" />
              </Form.Item>
              <div className="text-right mb-2">
                <a
                  href="#"
                  className="text-sm hover:underline"
                  style={{ color: "#1E1E1E", textDecoration: "underline" }}
                >
                  Forgot the password?
                </a>
              </div>
              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  className="w-full"
                  style={{ backgroundColor: "#9E2A2B", color: "#FFFFFF" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};
