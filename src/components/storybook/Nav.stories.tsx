// src/components/Nav.stories.tsx

import { Meta, StoryFn } from '@storybook/react';
import { Nav } from '../Nav';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Components/Nav',
  component: Nav,
  decorators: [(Story) => <Router><Story /></Router>],
} as Meta;

const Template: StoryFn = (args) => <Nav {...args} />;


export const Default = Template.bind({});
Default.args = {
};
