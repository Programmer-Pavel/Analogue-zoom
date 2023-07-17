import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
    isShow: boolean;
    setIsShow: (value: boolean) => void;
}

export const Modal = ({ isShow, setIsShow }: ModalProps) => {
    return (
        <>
            <div className={`${styles.modal} ${isShow && styles.modal_show}`}>
                <div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ipsum adipisci similique fugiat dolor. Itaque tenetur
                    debitis rem amet numquam ducimus repellat voluptate dolorem
                    nam, neque quasi eos! Saepe, doloremque quam.
                </div>

                <button onClick={() => setIsShow(false)}>close</button>
            </div>
            <div
                className={`${styles.overlay} ${isShow && styles.overlay_show}`}
            />
        </>
    );
};
