'use client'
import { useAuth } from "@/context/AuthContext";
import { errorToast } from "@/utils/toast";
import { Avatar, Button, CircularProgress, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";

const getInitials = (name: string) => {
  const initials = name.match(/\b\w/g) || []
  return ((initials.shift() || 'N') + (initials.pop() || 'U')).toUpperCase()
}

const Login = () => {
  const { user, googleSignIn, logOut: signOut, loading } = useAuth()
  const [isPopperOpen, setIsPopperOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement | null>(null)

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      errorToast("An error occurred during sign in", {
        position: "bottom-right"
      })
    }
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setIsPopperOpen(false);
  };

  const handleSignOut = async (event: Event | React.SyntheticEvent) => {
    try {
      await signOut()
      handleClose(event)
    } catch (error) {
      errorToast("An error occurred during sign out", {
        position: "bottom-right"
      })
    }
  }

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsPopperOpen(false);
    } else if (event.key === 'Escape') {
      setIsPopperOpen(false);
    }
  }

  const prevOpen = useRef(isPopperOpen);
    
  useEffect(() => {
    if (prevOpen.current === true && isPopperOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isPopperOpen;        
  }, [isPopperOpen]);

  const handleAvatarClick = () => setIsPopperOpen(!isPopperOpen)

  return (
    <div>
      { user ? 
      (<IconButton ref={anchorRef} onClick={handleAvatarClick}>
        <Avatar sx={{ bgcolor: grey[500] }}>{getInitials(user.displayName ?? 'AB')}</Avatar>
        <Popper
          open={isPopperOpen}
          anchorEl={anchorRef.current}
          sx={{ zIndex: 1 }}
          placement='bottom-start'
          transition
          disablePortal>
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
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{ py: 1 }}
                  >
                    <MenuItem sx={{ py: 0, px: 2 }} onClick={handleSignOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
            )}
          </Popper>
      </IconButton>) :
      <Button variant='contained' onClick={handleSignIn}>
        { loading ? <CircularProgress size={18}/> : 'Login' }
      </Button>
      }
    </div>
  )
}

export default Login