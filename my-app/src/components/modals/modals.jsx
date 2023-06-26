import React from "react";

import { CustomModal, Box, Title, Description } from "./modals.style";

import Button from "../buttons/button";

export default function Modal({ open, closeModal, title, description, data }) {
  return (
    <CustomModal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        {console.log(data)}
        <Title id="modal-modal-title">{title}</Title>
        <Description id="modal-modal-description">{description}</Description>
        <Button onClick={closeModal}>Fermer</Button>
      </Box>
    </CustomModal>
  );
}
