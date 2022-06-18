import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { JWTType } from "../../types/jwtType";
import { UserService } from "../../services/userService";
import "./userModule.scss";
import { useLog } from "../../hooks/useLog";
import { gameService } from "../../services/gameService";
import { Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
export default function UserModule() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const { addLog } = useLog();
  const [form] = useForm();

  useEffect(() => {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      const { exp, username } = jwtDecode<JWTType>(jwt);
      gameService.curPlayerInfo().then(() => {
        setLogged(true);
        setUsername(username);
      });
    }
  }, []);

  const login = () => {
    const username = form.getFieldValue("username") as string;
    const password = form.getFieldValue("password") as string;
    UserService.login(username, password).then(({ code, data, msg }) => {
      if (code === 200200) {
        localStorage.setItem("auth", data);
        window.location.reload();
      } else {
        addLog(msg, "error");
      }
    });
  };
  const register = () => {
    const username = form.getFieldValue("username") as string;
    const password = form.getFieldValue("password") as string;
    UserService.register(username, password).then(({ code, msg }) => {
      if (code === 200200) {
        login();
      } else {
        addLog(msg, "error");
      }
    });
  };

  if (logged) {
    return <Typography.Title className="username">{username}</Typography.Title>;
  } else {
    return (
      <Form form={form} labelCol={{ span: 8 }}>
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="button" onClick={login}>
            登录
          </Button>
          <Button htmlType="button" onClick={register}>
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
