import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import useRouter from 'use-react-router';

interface Link {
    to: string;
    label: string;
}

interface NavbarProps {
    links: Link[]
}

const useStyles = makeStyles({
    navbar: {
        backgroundColor: 'white',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        height: '80px',
    },
    titleContainer: {
        marginLeft: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        marginRight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        padding: '12px 10px',
        '&:hover': {
            backgroundColor: '#228AE6',
            color: 'white',
        },
    },
    title: {
        color: 'black',
    },
});

const Navbar = ({ links }: NavbarProps) => {
    const classes = useStyles();
    return (
        <div className={classes.navbar}>
            <div className={classes.titleContainer}>
                <Typography className={classes.title}>GAME SHOW BRASIL</Typography>
            </div>
            <div className={classes.buttonContainer}>
                {links.map((link) => (
                    <Button
                        key={link.label}
                        className={classes.button}
                        onClick={() => {
                            window.location.href = `/esio/${link.to}`;
                        }}
                    >
                        {link.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
