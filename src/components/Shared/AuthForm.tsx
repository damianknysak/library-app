import React, { useState } from "react";
import { BiLock, BiLockOpen, BiMailSend, BiUserCheck } from "react-icons/bi";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

interface AuthModalProps {
  type: string;
}

const AuthForm: React.FC<AuthModalProps> = ({ type }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleAuth = async () => {
    try {
      if (type === "login") {
        const userData = await login({ email: email, password: pwd }).unwrap();
        dispatch(
          setCredentials({ user: userData.user, accessToken: userData.token })
        );
      } else if (type === "register") {
        const userData = await register({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: pwd,
        }).unwrap();
        dispatch(
          setCredentials({ user: userData.user, accessToken: userData.token })
        );
      }
      setPwd("");
      setEmail("");
      setErrMsg("");
      setSearchParams(new URLSearchParams());
    } catch (error: any) {
      if (!error) {
        setErrMsg("Brak odpowiedzi serwera.");
      } else if (error.status === 400) {
        setErrMsg("Wypełnij wszystkie pola ...");
      } else if (error.status === 401) {
        setErrMsg("Wprowadziłeś błędne dane");
      } else {
        setErrMsg("Logowanie nieudane");
      }
    }
  };

  return (
    <form>
      <span>{errMsg && errMsg}</span>

      {type === "register" && (
        <>
          <div className="flex items-center w-80 h-12 space-x-1 border-2 text-lg border-gray-300 rounded-lg py-2 px-5 my-1.5">
            <input
              required
              className="outline-none w-64"
              type="text"
              placeholder="Wpisz swoje imię ..."
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <div>
              <BiUserCheck size={24} />
            </div>
          </div>
          <div className="flex items-center w-80 h-12 space-x-1 border-2 text-lg border-gray-300 rounded-lg py-2 px-5 my-1.5">
            <input
              required
              className="outline-none w-64"
              type="text"
              placeholder="Wpisz swoje nazwisko ..."
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <div>
              <BiUserCheck size={24} />
            </div>
          </div>
        </>
      )}
      <div className="flex items-center w-80 h-12 space-x-1 border-2 text-lg border-gray-300 rounded-lg py-2 px-5 my-1.5">
        <input
          required
          className="outline-none w-64"
          type="text"
          placeholder="Wpisz swój email ..."
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <div>
          <BiMailSend size={24} />
        </div>
      </div>
      <div className="flex items-center w-80 h-12 space-x-1 border-2 text-lg border-gray-300 rounded-lg py-2 px-5 my-1.5">
        <input
          required
          className="outline-none w-64"
          type={isPasswordHidden ? "password" : "text"}
          placeholder="Wpisz swoje hasło ..."
          onChange={(e) => {
            setPwd(e.currentTarget.value);
          }}
        />
        <div
          onClick={() => {
            setIsPasswordHidden(!isPasswordHidden);
          }}
        >
          {isPasswordHidden ? <BiLock size={24} /> : <BiLockOpen size={24} />}
        </div>
      </div>
      <button
        form="#authForm"
        type="submit"
        className="bg-[--primary] w-80 h-12 rounded-lg mt-8"
        onClick={() => {
          handleAuth();
        }}
      >
        <span className="text-white">
          {type === "register" ? "Zarejestruj się" : "Zaloguj się"}
        </span>
      </button>
    </form>
  );
};

export default AuthForm;
