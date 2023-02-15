import React from 'react';
import { Link } from 'react-router-dom';
import Description from '../components/Description';
import Header from '../components/Header';
import Momoa from '../components/Momoa';
import Toggle from '../components/Toggle';

export default function Main() {
  return (
    <>
      <Header />
      <Momoa />
      <div className="my-[130px]">
        <Description />
      </div>
    </>
  );
}
