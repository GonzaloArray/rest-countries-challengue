import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { DarkModeProvider } from '../context/DarkModeProvider';
import { BorderCountries } from './BorderCountries';
import { BrowserRouter } from 'react-router-dom';

describe('Border Countries Data', () => { 
  test('Should be a return border data', () => {
    render(
      <BrowserRouter>
        <DarkModeProvider>
          <BorderCountries border='IRN'/>
        </DarkModeProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Iran (Islamic Republic of)')).toBeDefined()
  })
})