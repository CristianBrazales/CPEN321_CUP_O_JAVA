import React from 'react';
import Login from '../components/LoginForm.js';
import Post from '../components/PostForm.js';
import Profile from '../components/profile.js';
import Signup from '../components/SignupForm.js';
import renderer from 'react-test-renderer';

test('renders correctly for the login screen', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders correctly for the Signup screen', () => {
  const tree = renderer.create(<Signup />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly for the Post screen', () => {
  const tree = renderer.create(<Post />).toJSON();
  expect(tree).toMatchSnapshot();
});
