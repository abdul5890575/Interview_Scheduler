import React from "react";
import Button from "components/Button"

export default function Confirm(props) {
    const handleCancle =(event) => {
        props.onCancel()
    }

    const handleConfrim =(event) => {
        props.onConfirm()
    }

    return (
        <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">{props.message}</h1>
        <section className="appointment__actions">
            <Button danger onClick = {handleCancle}>Cancel</Button>
            <Button danger onClick = {handleConfrim}>Confirm</Button>
        </section>
        </main>
    );
  }
