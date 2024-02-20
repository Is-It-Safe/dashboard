import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../assets/Icons/icon-dublearrow-lefticons.svg', () => ({
  ReactComponent: () => <div data-testid="double-arrow-icon" />,
}));

jest.mock('../../assets/Icons/Home.svg', () => ({
  ReactComponent: () => <div data-testid="home-icon" />,
}));

jest.mock('../../assets/Icons/Places.svg', () => ({
  ReactComponent: () => <div data-testid="places-icon" />,
}));

jest.mock('../../assets/Icons/Reviews.svg', () => ({
  ReactComponent: () => <div data-testid="reviews-icon" />,
}));

jest.mock('../../assets/Icons/Users.svg', () => ({
  ReactComponent: () => <div data-testid="users-icon" />,
}));

jest.mock('../../assets/Icons/Project.svg', () => ({
  ReactComponent: () => <div data-testid="project-icon" />,
}));

jest.mock('../../assets/Icons/Volunteers.svg', () => ({
  ReactComponent: () => <div data-testid="volunteers-icon" />,
}));

jest.mock('../../assets/logo.png', () => ({
  ReactComponent: () => <div data-testid="logo-icon" />,
}));

describe('Sidebar', () => {
  test('renders Sidebar component', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
  });

  test('renders correct icons and links', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(getByTestId('double-arrow-icon')).toBeInTheDocument();
    expect(getByTestId('home-icon')).toBeInTheDocument();
    expect(getByTestId('places-icon')).toBeInTheDocument();
    expect(getByTestId('reviews-icon')).toBeInTheDocument();
    expect(getByTestId('users-icon')).toBeInTheDocument();
    expect(getByTestId('project-icon')).toBeInTheDocument();
    expect(getByTestId('volunteers-icon')).toBeInTheDocument();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Lugares')).toBeInTheDocument();
    expect(getByText('Reviews')).toBeInTheDocument();
    expect(getByText('Usuarios')).toBeInTheDocument();
    expect(getByText('Projeto')).toBeInTheDocument();
    expect(getByText('Voluntários')).toBeInTheDocument();
  });
});
