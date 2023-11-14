    import React from 'react';
    import 'bootstrap/dist/css/bootstrap.min.css';

    export default function Header() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark bg-primary">
                        <div>
                            <a href="/users" className="navbar-brand">
                                User Management App
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }