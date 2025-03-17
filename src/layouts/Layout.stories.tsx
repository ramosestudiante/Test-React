import { Meta, StoryFn } from '@storybook/react';
import Layout from './Layout';

export default {
  title: 'Components/Layout',
  component: Layout,
} as Meta;

const Template: StoryFn = (args) => <Layout {...args}>{args.children}</Layout>;

export const Default = Template.bind({});
Default.args = {
  children: <div>Contenido dentro del Layout</div>,
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  children: (
    <div>
      <h2>Layout</h2>
      <p>dentro del Layout.</p>
    </div>
  ),
};
