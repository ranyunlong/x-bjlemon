import React, { Component } from 'react';
import './Login.less';
import { FormControl, InputLabel, Input , Paper, Button, withStyles, Avatar, CssBaseline, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

class Login extends Component<IProp, Readonly<IState>> {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };
    readonly state: IState = {}

    render() {
        const { classes } = this.props;
        return (
            <div className="login-page">
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            登录
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="account">账号</InputLabel>
                                <Input id="account" name="account" autoComplete="off" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">密码</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="off" />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="记住密码"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                登陆
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
        )
    }

}

const styles: any = (theme: any) => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        backgroundImage: '../images/login-bg.jpg',
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

export default withStyles(styles, { withTheme: true })(Login)



interface IProp {
    classes: any;
}

interface IState {

}