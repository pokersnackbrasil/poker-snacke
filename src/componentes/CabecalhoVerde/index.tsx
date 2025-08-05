import React from 'react';
import { useAppDispatch } from '../../hooks';
import { useAppSelector } from '../../hooks';
import { logout } from '../../slice/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { HandleError } from '../../error';

type CardProps = {
  children?: React.ReactNode;
};

export default function CabecalhoVerde({ children }: CardProps) {
  const levelAccess = useAppSelector(state => state.user.role);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
		try {
		await dispatch(logout()).unwrap();
		} catch (error) {
			HandleError(error);
		}
	};

  return (
    <div className={style.green_header__body}>
      <span
        className={style.sair}
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        EXIT
      </span>

      {children}

      {levelAccess?.includes("0") && (
        <span
          className={style.sair}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          CREAT USER
        </span>
      )}
    </div>
  );
}
