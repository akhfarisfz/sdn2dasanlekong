import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.js";
import { useState } from "react";
import useValidator from "../../libs/hooks/useValidator.js";
import useChangeListener from "../../libs/hooks/useChangeListener.js";
import { BASE_URL } from "../../libs/config/settings.js";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const PageGuruCreate =()=>{
    const navigate = useNavigate();
    const http = useHTTP();
    const jwt = useJWT();
    const message = useMessage();

    const [guru, setGuru] = useState({});
    const guruChangeListener = useChangeListener();
    const guruValidator = useValidator([]);
    const onGuruCreate = () => {
        jabatanValidator.reset();
    
        const config = {
          headers: {
            Authorization: jwt.get(),
          },
        };
    
        http.privateHTTP
          .post(`${BASE_URL}/guru/`, jabatan, config)
          .then((response) => {
            message.success(response);
            navigate("/");
          })
          .catch((error) => {
            message.error(error);
            jabatanValidator.except(error);
          });
      };



}