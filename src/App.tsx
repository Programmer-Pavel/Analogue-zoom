import { useState } from "react";
import React from "react";
import { Modal } from "./components/Modal";
import { Clock } from "./components/clock/Clock";
import { GradientRoundedBorder } from "./components/gradient-rounded-border/GradientRoundedBorder";

export const App = () => {
    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setIsShow(true)}>show modal</button>
            <Modal isShow={isShow} setIsShow={setIsShow} />

            <div style={{ background: "blue" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                minima maiores ipsa quod fugit autem quis laudantium molestias
                cum iste. Fugit, odit voluptatum tempora non qui pariatur unde
                harum! Pariatur?
            </div>

            <Clock />

            <GradientRoundedBorder />
        </>
    );
};
