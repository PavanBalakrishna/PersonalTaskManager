import React from 'react';
import {Navbar,Nav,} from 'react-bootstrap';

export default function Footer() {
    return (
      <Navbar sticky='bottom'>
          <Nav>
            <Nav.Link>©2021 by Pavan Balakrishna.</Nav.Link>
          </Nav>
      </Navbar>
    )
}
