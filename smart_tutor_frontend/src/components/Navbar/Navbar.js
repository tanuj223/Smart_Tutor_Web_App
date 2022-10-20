import React from 'react'
import classes from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: '#fff' }}>
            <div className='container'>

                <a class={classes.brand + " navbar-brand"} href="#">SmartTutor</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class={classes.navLink}>
                            Login
                        </li>
                        <li class={classes.navLink + " ml-2"}>
                            Register
                        </li>
                        {/* <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li> */}
                        {/* <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                        </li> */}
                    </ul>

                </div>
            </div >
        </nav>
    )
}
