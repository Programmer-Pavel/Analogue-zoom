import { useState } from "react";
import React from "react";
import { Modal } from "./components/Modal";

export const App = () => {
    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setIsShow(true)}>show modal</button>
            <Modal isShow={isShow} setIsShow={setIsShow} />

            <div style={{ background: "red" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                minima maiores ipsa quod fugit autem quis laudantium molestias
                cum iste. Fugit, odit voluptatum tempora non qui pariatur unde
                harum! Pariatur?
            </div>
        </>
    );
};
