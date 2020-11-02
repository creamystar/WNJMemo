import React from 'react';
import { Link } from "react-router-dom";

import './Header.css'

function Header() {
        return (
            <div id="howtouse">
                <Link to = "/Howtouse">
                    How to Use
                </Link>
            </div>
        );
    }


export default Header;