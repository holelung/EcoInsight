import axios from "axios";
import {useState, useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

const Login = () => {
    const [formData, setFormData] = useState({
        memberId : "",
        memberPw : ""
    })
    const [msg, setMsg] = useState("");
    const { login } = useContext(AuthContext);
    const navi = useNavigate();

    const handleCahnge = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { memberId, memberPw } = formData;
        
    }
    return (
        <div>

        </div>
    );
}

export default Login;