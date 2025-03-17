// src/components/Modal.stories.tsx

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Modal from '../Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    handleSubmit: { action: 'submitted' }, // Permite registrar la el formulario del libro
    setOpen: { action: 'setOpen' }, // Permite abrir el modal
  },
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: StoryFn<any> = (args) => {
  const [open, setOpen] = useState(false);

  // valores del formulario
  const handleSubmit = (values: { title: string; author: string; genre: string; publicationDate: string }) => {
    console.log('Form values:', values);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Abrir Modal
      </button>
      <Modal {...args} open={open} setOpen={setOpen} handleSubmit={handleSubmit} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: false,
  setOpen: () => {},
  handleSubmit: () => {},
};

export const WithPreFilledData = Template.bind({});
WithPreFilledData.args = {
  open: true,
  setOpen: () => {},
  handleSubmit: () => {},
};
