import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Nuevo libro agregado: ", newBook);
    setOpen(false);
  };

  return { open, setOpen, newBook, handleChange, handleSubmit };
};
