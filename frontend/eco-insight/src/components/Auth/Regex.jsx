// src/components/Member/SignUp/Regex.js
export const idRegex     = /^[a-zA-Z0-9]{4,12}$/;
export const pwRegex     = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
export const nameRegex   = /^[가-힣a-zA-Z]{2,20}$/;
export const emailRegex  = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/;
export const phoneRegex  = /^\d{2,3}-\d{3,4}-\d{4}$/;     // ex: 010-1234-5678
export const ssnRegex    = /^\d{6}-\d{7}$/;               // ex: 123456-1234567
