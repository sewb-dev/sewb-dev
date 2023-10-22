'use client'

import {
  Avatar,
  Button,
  CircularProgress,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from 'react';

const getInitials = (name: string) => {
  const initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || 'N') + (initials.pop() || 'U')).toUpperCase();
};

const Login = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    signIn('google')
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setIsPopperOpen(false);
  };

  const handleSignOut = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    signOut()
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsPopperOpen(false);
    } else if (event.key === 'Escape') {
      setIsPopperOpen(false);
    }
  };

  const prevOpen = useRef(isPopperOpen);

  useEffect(() => {
    if (prevOpen.current === true && isPopperOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isPopperOpen;
  }, [isPopperOpen]);

  const handleAvatarClick = () => setIsPopperOpen(!isPopperOpen);

  return (
    <div>
      {session ? (
        <IconButton ref={anchorRef} onClick={handleAvatarClick}>
          <Avatar sx={{ bgcolor: grey[500] }}>
            {getInitials(session.user?.name ?? 'AB')}
          </Avatar>
          <Popper
            open={isPopperOpen}
            anchorEl={anchorRef.current}
            sx={{ zIndex: 1 }}
            placement='bottom-start'
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={isPopperOpen}
                      id='composition-menu'
                      aria-labelledby='composition-button'
                      onKeyDown={handleListKeyDown}
                      sx={{ py: 1 }}
                    >
                      <MenuItem sx={{ py: 0, px: 2 }} onClick={handleSignOut}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </IconButton>
      ) : (
        <Button variant='contained' onClick={status === 'unauthenticated' ? handleSignIn : () => {}}>
          {loading ? (
            <CircularProgress size={18} sx={{ color: grey[500] }} />
          ) : (
            'Login'
          )}
        </Button>
      )}
    </div>
  );
};

export default Login;
