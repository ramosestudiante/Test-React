import React, { ChangeEvent, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (values: { title: string; author: string; genre: string; publicationDate: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ open, setOpen, handleSubmit }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required("El título es obligatorio"),
    author: Yup.string().trim().required("El autor es obligatorio"),
    genre: Yup.string().trim().required("El género es obligatorio"),
    publicationDate: Yup.string()
      .required("La fecha de publicación es obligatoria")
      .test("is-valid-date", "La fecha no es válida", (value) =>
        value ? dayjs(value).isValid() : false
      ),
  });

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Libro</h2>

            <Formik
              initialValues={{
                title: "",
                author: "",
                genre: "",
                publicationDate: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                setOpen(false);
                resetForm();
              }}
            >
              <Form>
                <div className="mb-2">
                  <Field type="text" name="title" placeholder="Título" className="w-full p-2 border rounded" />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-2">
                  <Field type="text" name="author" placeholder="Autor" className="w-full p-2 border rounded" />
                  <ErrorMessage name="author" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-2">
                  <Field type="text" name="genre" placeholder="Género" className="w-full p-2 border rounded" />
                  <ErrorMessage name="genre" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-2">
                  <Field type="date" name="publicationDate" className="w-full p-2 border rounded" />
                  <ErrorMessage name="publicationDate" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
                </div>
              </Form>
            </Formik>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
