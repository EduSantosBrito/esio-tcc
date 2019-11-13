import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import useRouter from 'use-react-router';

interface Link {
    to: string;
    label: string;
}

interface FooterProps {
    links: Link[]
}

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#000000',
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        height: '80px',
    },
    titleContainer: {
        marginRight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        marginLeft: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        padding: '12px 10px',
        color: 'white',
    },
    title: {
        color: ' #62697C',
    },
});

const Footer = ({ links }: FooterProps) => {
    const classes = useStyles();
    return (
        <div className={classes.navbar}>
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
            <div className={classes.titleContainer}>
                <Typography className={classes.title}>© 2019 Game Show Brasil</Typography>
            </div>
        </div>
    );
};

export default Footer;
